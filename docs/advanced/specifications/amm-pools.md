# AMM Liquidity Pools

# Motivation

Counterparty's DEX has historically worked exclusively by matching two resting limit orders. If nobody is offering the other side of what a taker wants, the order sits open until it expires or until a counterparty appears. As a result, pairs outside the most active few have always been thin: takers pay wide effective spreads and liquidity providers have no passive yield primitive — every quote of liquidity has to be manually maintained as a resting `order` message.

Meanwhile, every other chain's DEX landscape has converged on **Automated Market Makers (AMMs)** as the baseline primitive for passive depth. AMMs let liquidity providers (LPs) deposit paired inventory once, earn a fee on every swap pro-rata to their share of the pool, and redeem at any time.

This protocol change adds Uniswap v2-style **constant-product** liquidity pools to Counterparty as a first-class primitive, and **composes them with the existing order book** rather than replacing it. A single incoming `order` transaction routes through a deterministic best-price-first interleave of both sources, giving traders tighter fills on thin pairs without any new swap message type.

# Design

## Overview

- Two new message types are introduced: `pooldeposit` (ID `120`) and `poolwithdraw` (ID `121`).
- Swaps reuse the existing `order` message — the order book matcher picks up pool liquidity automatically. There is no new "swap" message.
- LP positions are represented as standard Counterparty **numeric assets** issued by the `UNSPENDABLE` address, so they transfer, send to UTXOs, and trade on the order book exactly like any other asset.
- BTC pairs are explicitly rejected; pools may only pair two non-BTC Counterparty assets (XCP or any user-issued asset).
- The feature is gated behind a new `amm_pools` protocol change in `protocol_changes.json`.

## Pool keying and uniqueness

- A pool is uniquely identified by the **sorted pair** `(asset_a, asset_b)` where `asset_a < asset_b` lexicographically.
- There is **exactly one pool per asset pair**. A `pooldeposit` for a pair that already has a pool adds liquidity to the existing pool; it does not create a second one.
- All pool message handlers normalize parameters to the sorted pair before reading or writing reserves.

## LP tokens

- Each pool's LP token is a distinct numeric asset (e.g. `A95428956661682345`) issued at first-deposit time with `issuer = UNSPENDABLE`.
- `UNSPENDABLE` has no private key, so LP tokens **cannot** be reissued, locked, or have dividends paid on them.
- LP tokens are otherwise standard assets: they transfer with `send`, can be attached to UTXOs, and can be traded on the order book.
- The LP asset name is provided on the wire by the depositor as `lp_asset_id` and must be a **numeric asset** that is not already in use by any other valid issuance. The compose endpoint can auto-generate one when omitted.

## Pool math (constant-product)

Pools maintain the invariant `k = reserve_a * reserve_b`. Every swap is required to grow `k` (fees stay in reserves and accrue to LPs).

The output of a swap of `input_qty` of the input asset is computed with a fee-adjusted constant-product formula:

```python
input_with_fee = input_qty * (10000 - fee_bps)
numerator      = input_with_fee * reserve_out
denominator    = reserve_in * 10000 + input_with_fee
output         = numerator // denominator
```

A runtime assertion in `execute_pool_match` enforces `new_reserve_a * new_reserve_b >= reserve_a * reserve_b` after every fill.

## Fees

The swap fee is paid in the asset being swapped and stays in pool reserves. Two tiers are defined:

| Pair         | Fee             | Rationale                         |
| ------------ | --------------- | --------------------------------- |
| XCP pair     | `0.50%` (50 bps)  | Incentivize XCP-denominated depth |
| Non-XCP pair | `1.00%` (100 bps) | Compensate LPs in thinner markets |

```python
XCP_POOL_FEE_BPS   = 50
OTHER_POOL_FEE_BPS = 100
```

The protocol takes nothing from the swap fee; 100% of the fee accrues to remaining LP holders through the growth of `k`.

Separately, `pooldeposit` and `poolwithdraw` transactions pay a small **XCP gas fee** that scales sigmoidally with recent volume of the same message type (the same pattern used by `attach`/`detach`, see [Gas System](gas-system.md)). This gas fee is independent of the swap fee.

## Pool deposit (`pooldeposit`, type `120`)

A `pooldeposit` adds liquidity to a pool and mints LP tokens to the depositor.

### Wire format

```
FORMAT = ">QQQQQQ"   # 6 × uint64 = 48 bytes
fields:
  asset_a_id        # numeric id of asset_a
  asset_b_id        # numeric id of asset_b
  quantity_a        # max quantity of asset_a to deposit (in satoshis)
  quantity_b        # max quantity of asset_b to deposit (in satoshis)
  min_lp_quantity   # slippage protection: minimum LP tokens to mint
  lp_asset_id       # numeric id of the LP asset (only used on first deposit)
```

### First deposit (creates the pool)

When no pool exists for the sorted pair `(asset_a, asset_b)`:

1. The depositor must supply a numeric `lp_asset` that is not in use.
2. Both quantities are debited in full from the depositor's balance.
3. LP tokens minted: `floor(sqrt(quantity_a * quantity_b))`.
4. The LP asset is issued (`source = issuer = UNSPENDABLE`), all LP tokens are credited to the depositor.
5. A new row is inserted in the `pools` table with the initial reserves.
6. The pool's opening price is set by the deposit ratio: `quantity_b / quantity_a`.

### Subsequent deposit (existing pool, supply > 0)

When a pool already exists and has non-zero LP supply:

1. The submitted quantities are treated as **maximums**.
2. The protocol clamps the deposit to the pool's current reserve ratio so that price is **not moved**:

   ```python
   ratio_a = quantity_a * reserve_b
   ratio_b = quantity_b * reserve_a
   if ratio_a <= ratio_b:
       actual_a = quantity_a
       actual_b = quantity_a * reserve_b // reserve_a
   else:
       actual_a = quantity_b * reserve_a // reserve_b
       actual_b = quantity_b
   ```

3. Excess on the side that did not bind is **left with the depositor** (never debited).
4. LP tokens minted use the L-2 anti-dilution rule (Uniswap v2 `min` of both bases):

   ```python
   quantity_minted = min(
       actual_a * total_lp_supply // reserve_a,
       actual_b * total_lp_supply // reserve_b,
   )
   ```

5. Reserves are updated: `reserve_a += actual_a`, `reserve_b += actual_b`.

### Pool restart (existing pool, supply = 0)

If every LP holder has destroyed their LP tokens (via the generic `destroy` message), the pool ends up with `reserves > 0` and `total_lp_supply = 0`. To prevent reserves from being permanently stranded, the next deposit **re-seeds** the pool:

1. The deposit goes through the **first-deposit code path**, but reuses the pool's existing `lp_asset` (no new LP asset is created).
2. LP tokens minted: `floor(sqrt(quantity_a * quantity_b))`.
3. The deposited quantities are added on top of any stranded reserves.
4. The rescuer ends up owning 100% of the post-rescue pool — matching Uniswap v2's "donation accrues to whoever is in the pool when it lands" semantics.

This case is identified by `total_lp_supply == 0` (LP supply read directly from the DB, bypassing the API process's `AssetCache`, since post-startup issuances may not be visible to the cache).

### Validation rules

- Neither asset may be `BTC`.
- The two assets must be different.
- Each asset must already exist (or be `XCP`).
- Neither asset may itself be an LP token from another pool.
- `quantity_a > 0`, `quantity_b > 0`, both `≤ MAX_INT`, and `quantity_a * quantity_b ≤ MAX_INT`.
- `min_lp_quantity ≥ 0` and `≤ MAX_INT`.
- `quantity_minted > 0` (deposits that would mint zero LP tokens are rejected before any debit).
- `quantity_minted ≤ MAX_INT`.
- If `min_lp_quantity > 0`, then `quantity_minted ≥ min_lp_quantity` (slippage protection).
- On first deposit: `lp_asset` must be supplied, must be a numeric asset, and must not already have a valid issuance.
- The depositor must have sufficient balance of both assets (after clamping to the proportional pair).
- The depositor must have sufficient XCP balance to pay the gas fee (and the deposit, if either asset is XCP).

## Pool withdrawal (`poolwithdraw`, type `121`)

A `poolwithdraw` burns LP tokens and returns the proportional share of both reserve assets to the source.

### Wire format

```
FORMAT = ">QQQQQ"   # 5 × uint64 = 40 bytes
fields:
  asset_a_id        # numeric id of asset_a
  asset_b_id        # numeric id of asset_b
  quantity          # number of LP tokens to burn
  min_quantity_a    # slippage protection on asset_a payout
  min_quantity_b    # slippage protection on asset_b payout
```

### Execution

1. Compute proportional payout:

   ```python
   quantity_a = quantity * reserve_a // total_lp_supply
   quantity_b = quantity * reserve_b // total_lp_supply
   ```

2. Debit `quantity` LP tokens from the source and record an `ASSET_DESTRUCTION` (so `asset_supply()` stays accurate).
3. Credit `quantity_a` of `asset_a` and `quantity_b` of `asset_b` back to the source.
4. Update reserves: `reserve_a -= quantity_a`, `reserve_b -= quantity_b`.
5. The XCP gas fee for `poolwithdraw` is debited from the source (paid in XCP).

### Validation rules

- Neither asset may be `BTC`.
- The two assets must be different.
- Each asset must exist.
- `quantity > 0` and `≤ MAX_INT`.
- `min_quantity_a` / `min_quantity_b` must be `≥ 0` and `≤ MAX_INT`.
- The pool must exist and have liquidity (`reserve_a > 0` and `reserve_b > 0`).
- The source's LP token balance must be `≥ quantity`.
- **Asymmetric drains are rejected**: if `quantity_a == 0` OR `quantity_b == 0`, the withdrawal is invalid (using OR, not AND, prevents pool-state/LP-supply drift across many tiny burns that round one side to zero).
- If `min_quantity_a > 0`, then computed `quantity_a ≥ min_quantity_a` (slippage protection).
- If `min_quantity_b > 0`, then computed `quantity_b ≥ min_quantity_b` (slippage protection).
- The source must have sufficient XCP balance for the gas fee.

## Pool–order book composition

The pool does not introduce a new swap message. Instead, the existing `order` matcher in `lib/messages/order.py:match()` is extended so that pool liquidity participates automatically whenever a new `order` arrives for a pair that has a pool.

### Matching loop

For an incoming `order` (`tx1`) with pair `(give_asset, get_asset)`:

1. Look up the pool for the sorted pair. If the pair contains BTC, or no pool exists, or the pool has no liquidity, the matcher behaves exactly as before.
2. Iterate through the matching open book orders (`tx0` candidates), sorted by best price first. At each step:
   - **Pool first if it beats the next book price.** Compute the maximum input that can be fed into the pool **before its marginal price reaches the next book order's limit price**. If non-zero, execute that fill against the pool, deducting from `tx1`'s remaining give and get, and re-read the pool reserves for the next iteration.
   - **Then book.** Match against `tx0` as before.
3. **Tail phase.** After all eligible book orders have been considered, if `tx1` still has give remaining and is still `open`, sweep the remainder against the pool, capped at `tx1`'s **own** limit price (`give_quantity / get_quantity`). The pool partial-fills at the taker's limit price rather than overshooting it.

This routing rule guarantees **best-price execution** for the taker: pool liquidity is consumed exactly while it is cheaper than the next resting book order; otherwise the resting order is taken first.

### Limit price enforcement

`try_pool_fill` enforces the order's limit price strictly. For a fill of `fill_quantity` of the give asset:

```python
# Ceil so the limit price is enforced strictly (floor would allow
# sub-satoshi fills below the order's rate).
min_output = -(-fill_quantity * tx1["get_quantity"] // tx1["give_quantity"])
if output < min_output or output <= 0:
    return 0, 0
```

If the pool would produce an output below the order's effective limit price, the pool fill is skipped (returns `0, 0`).

### Fill recredit

When a pool fill makes `tx1` `filled` (either `give_remaining ≤ 0`, or `get_remaining ≤ 0` under the `recredit_give_remaining` gate), any leftover `give_remaining` is credited back to the source as `action="filled"`. Both the in-loop and tail-phase paths apply this recredit, so escrow dust is never stranded when the pool delivers the full `get_quantity` while the order's give is not fully consumed.

## Asset conservation and `held()`

Pool reserves are escrowed by the protocol — they leave the depositor's balance and live in the pool's reserves until withdrawn. To keep the asset conservation check (`held() == issued() − destroyed()`) consistent across pool operations, `lib/ledger/supplies.held()` includes two extra union branches that sum `reserve_a` and `reserve_b` from the latest row of every pool.

The `asset_holders` and `xcp_holders` views (rebuilt by State DB migration `0014`) similarly include pool reserves under the synthetic holding type `pool_reserve` with the address fixed to `UNSPENDABLE`, so `/holders` endpoints surface pool reserves for any asset.

## Quote endpoints

Three current-state quote endpoints estimate the result of a swap, deposit, or withdraw without composing a transaction. These are pure read-only computations against the State DB; actual execution may differ if other transactions confirm before yours.

- **Swap quote** — runs the same pool/book interleave as the matcher, returning `pool_output`, `book_output`, `book_orders_matched`, `fee_bps`, `fee_amount`, `effective_price`, and `price_impact`.
- **Deposit quote** — given a `quantity` of `asset1`, returns the partner `quantity_b_required` (computed with **ceiling** division so a user following the quote lands on the A-constraint branch and mints exactly the quoted LP) and `quantity_minted_estimate`.
- **Withdraw quote** — given a `quantity` of LP tokens to burn, returns the proportional payouts in both assets.

## Edge cases and known limitations

- **Burning LP to lock liquidity — use `send`, not `destroy`.** Sending LP tokens to a provably unspendable address (a standard practice to signal committed liquidity) locks them as intended. The generic `destroy` message (type `110`) reduces `total_lp_supply` without touching reserves, which **donates** those reserves pro-rata to remaining LP holders. To lock, use `send`; to donate to other LPs, use `destroy`.
- **Pool restart after total LP destruction.** As described above, if all LP holders run `destroy`, the next deposit re-seeds the pool and the rescuer owns 100% of the post-rescue pool. This matches Uniswap v2 donation semantics and prevents coordinated-destruction bricking.
- **Within-block transaction reordering.** Block producers can reorder transactions within their own block. This is the only MEV primitive that applies on Bitcoin L1 (no flash loans, no callbacks, no admin keys). It is mitigated by:
  - The `order` message's existing limit price.
  - The `min_lp_quantity` slippage parameter on `pooldeposit`.
  - The `min_quantity_a` / `min_quantity_b` slippage parameters on `poolwithdraw`.
- **No BTC pairs.** Pool pairs cannot contain BTC. BTC trading on Counterparty's DEX continues to require BTC payments via `btcpay` and is incompatible with the pool execution model.
- **Out of scope.** No v3-style concentrated liquidity (ticks, position NFTs, range orders), no per-pool fee tiers, no protocol fee extraction, no oracle-based pricing safeguards, no protection against tiny-pool mispricing beyond normal market arbitrage. This is a deterministic v1 AMM.

# API

## Compose

- `GET /v2/addresses/<address>/compose/pooldeposit` — compose a `pooldeposit` (parameters: `asset_a`, `asset_b`, `quantity_a`, `quantity_b`, `min_lp_quantity`, `lp_asset`).
- `GET /v2/addresses/<address>/compose/pooldeposit/estimatexcpfees` — estimated XCP gas fee for a `pooldeposit` at the current block.
- `GET /v2/addresses/<address>/compose/poolwithdraw` — compose a `poolwithdraw` (parameters: `asset_a`, `asset_b`, `quantity`, `min_quantity_a`, `min_quantity_b`, `lp_asset`).
- `GET /v2/addresses/<address>/compose/poolwithdraw/estimatexcpfees` — estimated XCP gas fee for a `poolwithdraw` at the current block.

## Quotes (current-state estimates)

- `GET /v2/pools/<asset1>/<asset2>/quote?quantity=N` — estimated swap output for selling `N` of `asset1`, accounting for both pool and order book.
- `GET /v2/pools/<asset1>/<asset2>/quote/deposit?quantity=N` — required partner quantity and expected LP mint for depositing `N` of `asset1`.
- `GET /v2/pools/<asset1>/<asset2>/quote/withdraw?quantity=N` — expected payout in both assets for burning `N` LP tokens.

## Pool data

- `GET /v2/pools` — all pools.
- `GET /v2/pools/<asset1>/<asset2>` — a single pool by pair.
- `GET /v2/pools/<asset1>/<asset2>/deposits` — deposit history for the pair.
- `GET /v2/pools/<asset1>/<asset2>/withdrawals` — withdrawal history for the pair.
- `GET /v2/pools/<asset1>/<asset2>/matches` — pool-match (swap) history for the pair.
- `GET /v2/pools/<asset1>/<asset2>/price_history` — reserve snapshots at every state change for the pair (build price charts, compute TWAP).

## Address-scoped

- `GET /v2/addresses/<address>/pools` — LP positions held by an address.
- `GET /v2/addresses/<address>/pool_deposits` — deposits made by an address.
- `GET /v2/addresses/<address>/pool_withdrawals` — withdrawals made by an address.

## Order- and block-scoped

- `GET /v2/orders/<order_hash>/pool_matches` — pool matches for a given order.
- `GET /v2/pool_matches` — all pool matches (paginated).
- `GET /v2/blocks/<block_index>/pool_deposits` — pool deposits in a block.
- `GET /v2/blocks/<block_index>/pool_withdrawals` — pool withdrawals in a block.
- `GET /v2/blocks/<block_index>/pool_matches` — pool matches in a block.

# Database Changes

Five new events and four new tables are introduced. The ledger schema is updated by migration `0009.amm_pools.sql` and consolidated into the State DB by migration `0014.add_pool_consolidated_tables` (registered in `MIGRATIONS_AFTER_ROLLBACK`, also rebuilds `asset_holders` / `xcp_holders` to include pool reserves).

## Events

| Event                  | Trigger                                            |
| ---------------------- | -------------------------------------------------- |
| `OPEN_POOL`            | First deposit for a pair: pool row inserted.       |
| `POOL_UPDATE`          | Reserves changed (deposit, withdraw, or swap).     |
| `NEW_POOL_DEPOSIT`     | A `pooldeposit` is parsed (valid or invalid).      |
| `NEW_POOL_WITHDRAWAL`  | A `poolwithdraw` is parsed (valid or invalid).     |
| `POOL_MATCH`           | A swap is filled against the pool by the matcher.  |

## `pools` table

The current state of every pool. Updated rows are appended (the latest row by `rowid` is the live state); roll-back replays the rewind chain.

`tx_index`: *INTEGER* — Index of the transaction that created the pool (first deposit).

`tx_hash`: *TEXT* — Hash of the transaction that created the pool.

`block_index`: *INTEGER* — Block index of the create or last update.

`source`: *TEXT* — Address that performed the first deposit.

`asset_a`: *TEXT* — Lexicographically smaller asset of the pair.

`asset_b`: *TEXT* — Lexicographically larger asset of the pair.

`reserve_a`: *INTEGER* — Current reserve of `asset_a` (in satoshis).

`reserve_b`: *INTEGER* — Current reserve of `asset_b` (in satoshis).

`lp_asset`: *TEXT* — Numeric asset name of the LP token for this pool.

## `pool_deposits` table

One row per `pooldeposit` transaction (valid or invalid).

`tx_index`: *INTEGER* — Transaction index.

`tx_hash`: *TEXT* — Transaction hash.

`block_index`: *INTEGER* — Block index.

`source`: *TEXT* — Depositor address.

`asset_a`: *TEXT* — Sorted pair asset_a.

`asset_b`: *TEXT* — Sorted pair asset_b.

`quantity_a`: *INTEGER* — Actual quantity of `asset_a` debited (after ratio clamp).

`quantity_b`: *INTEGER* — Actual quantity of `asset_b` debited (after ratio clamp).

`quantity_minted`: *INTEGER* — LP tokens minted to the depositor.

`status`: *TEXT* — `valid` or `invalid: <reason>`.

## `pool_withdrawals` table

One row per `poolwithdraw` transaction (valid or invalid).

`tx_index`: *INTEGER* — Transaction index.

`tx_hash`: *TEXT* — Transaction hash.

`block_index`: *INTEGER* — Block index.

`source`: *TEXT* — Withdrawer address.

`asset_a`: *TEXT* — Sorted pair asset_a.

`asset_b`: *TEXT* — Sorted pair asset_b.

`quantity_destroyed`: *INTEGER* — LP tokens burned.

`quantity_a`: *INTEGER* — Quantity of `asset_a` returned to the source.

`quantity_b`: *INTEGER* — Quantity of `asset_b` returned to the source.

`status`: *TEXT* — `valid` or `invalid: <reason>`.

## `pool_matches` table

One row per pool fill. Multiple rows can be produced by a single `order` transaction if the matcher interleaves multiple pool/book fills.

`tx_index`: *INTEGER* — Transaction index of the incoming `order`.

`tx_hash`: *TEXT* — Hash of the incoming `order`.

`block_index`: *INTEGER* — Block index.

`source`: *TEXT* — Source address of the incoming `order`.

`asset_a`: *TEXT* — Sorted pair asset_a.

`asset_b`: *TEXT* — Sorted pair asset_b.

`forward_asset`: *TEXT* — Asset received by the taker (the order's `get_asset`).

`forward_quantity`: *INTEGER* — Quantity of `forward_asset` paid out by the pool.

`backward_asset`: *TEXT* — Asset paid in by the taker (the order's `give_asset`).

`backward_quantity`: *INTEGER* — Quantity of `backward_asset` consumed by the pool.

`fee_quantity`: *INTEGER* — Pool fee retained in reserves (`backward_quantity * fee_bps / 10000`).

`fee_bps`: *INTEGER* — Fee tier applied (`50` for XCP pairs, `100` otherwise).

`order_tx_hash`: *TEXT* — Hash of the resting/incoming order whose match this fill belongs to.

`status`: *TEXT* — Always `valid` for recorded pool matches.
