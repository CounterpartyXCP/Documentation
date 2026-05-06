# Cancel All Open Offers

# Motivation

A `cancel` message has historically been able to cancel exactly one open offer (an `order` or a `bet`) at a time, addressed by its 32-byte transaction hash. An address with many resting offers — a market maker quoting both sides of several pairs, or a bot that has accumulated stale orders across maintenance windows — has had no choice but to broadcast one Bitcoin transaction per cancel. This is expensive (one BTC fee per cancel), slow (each cancel competes for block space independently), and operationally fragile (partial failures leave the address in a half-cleared state).

This protocol change adds a **cancel-all mode** to the existing `Cancel` message: a single transaction can cancel every open order and every open bet for its source address, up to a per-transaction limit. The wire format for single-hash cancels is unchanged. The feature is gated behind a new `cancel_all_offers` protocol change in `protocol_changes.json`.

# Design

## Overview

- The existing `Cancel` message (ID `70`) is extended with a second wire form whose payload is a single sentinel byte. When the parser encounters this sentinel, it cancels every open order for the source first, then every open bet, up to the `cancel_all_offers_limit` for the current block.
- The order of cancellation is **deterministic**: open orders are cancelled before open bets, and within each list offers are taken in `(tx_index, tx_hash)` order — the same ordering used everywhere else in the codebase.
- The first cancelled offer is **free**; each additional offer pays a per-offer XCP fee on the same gas-system schedule as a single `cancel`. A cancel-all of a single offer therefore costs exactly the same as the legacy free `cancel`.
- A new `CANCEL_ALL` event is emitted on success; `INVALID_CANCEL` is emitted on failure (e.g. no open offers, or insufficient XCP for the fee).
- The wire format for single-hash cancels is **unchanged** — old wallets can keep sending 32-byte cancels indefinitely.

## Wire format

The `Cancel` message keeps its existing single-hash form and adds a sentinel-byte form:

| Mode             | Payload length | Payload                                         |
| ---------------- | -------------- | ----------------------------------------------- |
| Single-hash      | 32 bytes       | `struct.pack(">32s", offer_hash_bytes)`         |
| Cancel-all       | 1 byte         | `CANCEL_ALL_FLAG = b"\x01"`                     |

```python
ID              = 70
FORMAT          = ">32s"
LENGTH          = 32
CANCEL_ALL_FLAG = b"\x01"
```

The full message on the wire is the standard `messagetype.pack(ID)` byte (one byte under the `short_tx_type_id` gate, four bytes otherwise) followed by the payload above.

The parser disambiguates purely by length: a 1-byte payload equal to `CANCEL_ALL_FLAG` is cancel-all; a 32-byte payload is a single-hash cancel; anything else is `invalid: could not unpack`.

## Selection rules

For a cancel-all transaction with source `S` confirming at `block_index`:

1. Read the per-transaction cap: `limit = protocol_changes["cancel_all_offers_limit"]` for the network and `block_index`. Default value on mainnet, testnet3, and testnet4 is **`100`**.
2. Fetch every open order with `source = S`, ordered by `(tx_index, tx_hash)` (via `ledger.markets.get_open_orders_by_source`).
3. Fetch every open bet with `source = S`, ordered by `(tx_index, tx_hash)` (via `ledger.other.get_open_bets_by_source`).
4. Take the first `limit` open orders. If the orders list does not exhaust the cap, fill the remainder with the first open bets up to the remaining capacity.
5. Cancel the selected orders first (oldest first), then the selected bets (oldest first), reusing the existing `order.cancel_order` and `bet.cancel_bet` paths. Each cancellation refunds escrow exactly as it would for a single `cancel`.

Excess offers above the cap are simply not cancelled by this transaction; the source can broadcast another cancel-all to clear them.

## Fee schedule

The first offer cancelled in a cancel-all transaction is **free**. Each additional offer is charged a per-offer XCP fee equal to the gas-system fee for a single `cancel` at the current block:

```python
def get_cancel_all_fee(db, source, block_index):
    to_cancel_orders, to_cancel_bets = get_offers_to_cancel(db, source, block_index)
    offer_count = len(to_cancel_orders) + len(to_cancel_bets)
    billable_count = max(0, offer_count - 1)
    if billable_count == 0:
        return 0
    return gas.get_transaction_fee(db, ID, block_index) * billable_count
```

`gas.get_transaction_fee` uses the same sigmoidal schedule as `attach`/`detach` (see [Gas System](gas-system.md)), parameterised in `protocol_changes.json` under `fee_parameters` for transaction id `"70"` (`fee_lower_threshold = 3`, `fee_upper_threshold = 15`, `base_fee = 1`, `fee_sigmoid_k = 1` at activation). The fee is in XCP satoshis.

This rule guarantees that **a cancel-all of a single offer costs the same as the legacy free `cancel`**, so wallets and bots can switch to the cancel-all encoding for *every* cancellation without ever paying more for the trivial case.

## Validation rules

A cancel-all transaction is rejected (`status = "invalid: <reason>"`, `INVALID_CANCEL` event emitted) if any of the following hold at parse time:

- The `cancel_all_offers` protocol gate is not yet enabled at `tx["block_index"]` (treated as `invalid: could not unpack`, indistinguishable on the wire from an unknown 1-byte payload).
- The source has no open orders **and** no open bets (`no open offers for this address`).
- The fee is non-zero and the source's XCP balance is strictly less than the fee (`insufficient XCP for fee`).

The `compose` endpoint runs the same validation against the current block index and raises `ComposeError` with the same problem strings before composing a transaction.

A single-hash `cancel` keeps its original validation: the offer must exist, must be `open`, and must belong to the source.

## Execution

When a cancel-all parses as `valid`:

1. If the fee is non-zero, debit it from the source's XCP balance with `action="cancel all fee"` and `event = tx["tx_hash"]`. The fee is **burned** (debited but not credited anywhere) — the protocol takes nothing, but the XCP leaves circulation, mirroring how all gas-system fees work.
2. Increment the gas-system transaction counter for message id `70` by `offer_count` (not `1`), so that the gas curve sees the actual number of cancellations. Bursts of cancel-all therefore raise the per-offer fee just as bursts of single cancels would.
3. Cancel each selected open order via `order.cancel_order(db, open_order, "cancelled", tx["block_index"], tx["tx_index"])` — refunds escrow, sets order `status = "cancelled"`, emits `CANCEL_ORDER`.
4. Cancel each selected open bet via `bet.cancel_bet(db, open_bet, "cancelled", tx["tx_index"])` — refunds escrow, sets bet `status = "cancelled"`, emits `CANCEL_BET`.
5. Insert one row in the `cancels` table with `offer_hash = "cancel_all"` and the `CANCEL_ALL` event.
6. Mark the transaction valid via `ledger.blocks.set_transaction_status`.

If the transaction is invalid, no offers are cancelled, no fee is debited, the gas counter is **not** incremented, and a single `cancels` row with `offer_hash = "cancel_all"` and the `INVALID_CANCEL` event is recorded for audit.

## Replay safety and reorg behaviour

- A cancel-all is committed as the union of standard `CANCEL_ORDER` / `CANCEL_BET` events plus a single `CANCEL_ALL` row, so a rollback rewinds it the same way a batch of equivalent single cancels would: each underlying offer is restored to `open` by the existing per-offer rewind path.
- If the source acquires new open offers between two cancel-all transactions in the same block, only those visible at the moment each cancel-all is parsed are taken. Within-block ordering is the standard `(block_index, tx_index)` ordering.

## Edge cases and known limitations

- **Per-transaction cap.** A cancel-all confirms in O(`cancel_all_offers_limit`) database writes, which keeps a single transaction's cost bounded. An address with more open offers than the cap simply needs more than one cancel-all transaction to fully clear — there is no special "carry-over" state.
- **Atomicity.** Because the fee is debited up front and validation rejects insufficient balance, the transaction is **all or nothing**: every selected offer is cancelled, or none of them are.
- **Fee for one offer.** By construction, cancel-all of one offer is free. Wallets that always use the cancel-all encoding therefore pay the legacy zero fee whenever the user happens to have only one open offer, and only escalate to a per-offer fee on the second offer onward.
- **No selective cancel-all.** This first version cancels orders before bets, oldest-first, with no filter (no per-asset, per-pair, or per-side restriction). Wallets that want surgical cancellation can keep using single-hash `cancel` for those offers, and use cancel-all only when clearing the whole address.

# API

## Compose

- `GET /v2/addresses/<address>/compose/cancel?offer_hash=` — when `offer_hash` is omitted or empty, composes a cancel-all transaction for `address`. When `offer_hash` is a 64-hex-char string, composes a legacy single-hash cancel (unchanged behaviour).
- `GET /v2/addresses/<address>/compose/cancel/estimatexcpfees` — returns the estimated XCP fee for a cancel-all transaction at the current block, computed via `cancel_message.get_cancel_all_fee(db, address, current_block_index)`. Returns `0` when the address has zero or one open offer.

## Reads

The `cancels` table is unchanged in shape; cancel-all rows are simply distinguishable by `offer_hash = "cancel_all"`.

# Database Changes

No schema changes. One new event name is added:

| Event              | Trigger                                                                          |
| ------------------ | -------------------------------------------------------------------------------- |
| `CANCEL_ALL`       | A cancel-all transaction parsed as `valid`.                                      |
| `INVALID_CANCEL`   | (Existing event) Also emitted for a cancel-all that failed validation.           |

`CANCEL_ALL` is registered in `EVENTS_ADDRESS_FIELDS` with `["source"]`, so it is surfaced by every address-scoped event endpoint.
