---
title: What is a Counterparty Liquidity Pool?
---

# What is a Counterparty Liquidity Pool?

A Counterparty Liquidity Pool is a built-in Automated Market Maker (AMM) using the Counterparty protocol on the Bitcoin blockchain.
Two Counterparty assets sit in the pool. Anyone can trade against that pair without waiting for a matching order.

The protocol uses a constant-product formula (the same style as Uniswap v2): as one side is bought, its price rises and the other side gets cheaper. Pools sit next to the existing XCP DEx order book. They do not replace it. When you place a normal DEx order, the protocol can fill you from the pool, from the book, or from both, whichever gives the better price.

You can browse pool balances and trades on a [Counterparty Block Explorer](https://www.counterparty.io/#explorers). Creating a pool, adding liquidity, or swapping takes a [Counterparty Compatible Wallet](https://www.counterparty.io/#wallets) that supports this feature. Below is an example from the [XcpDex Counterparty Marketplace](https://www.xcpdex.com/A6900000000000001774).

![Counterparty liquidity pool on xcpdex.com](https://github.com/user-attachments/assets/f155abc5-a0b9-40b7-882f-a5828509ee1e)

## How is a pool different from the Counterparty DEx order book?

The order book waits for two people to agree on a price. A pool is always willing to trade, at the price implied by its current reserves.

One pool exists per asset pair. The pair is sorted by the protocol, so TOKEN/XCP and XCP/TOKEN are the same pool. There is no separate “swap” transaction. A regular DEx order is enough. If a pool exists and its price is better than the book, the matcher uses the pool.

- Pools can hold XCP and any user-issued Counterparty assets.
- BTC pairs are not allowed.
- Fees stay in the pool. 0.5% on pairs that include XCP, 1% on other pairs. Those fees grow the reserves and belong to liquidity providers.

## What can you do with a Counterparty Liquidity Pool?

Any Counterparty user can:
- Open a new pool by depositing both assets for the first time (that first deposit sets the starting price)
- Add more liquidity to an existing pool
- Withdraw their share later
- Trade against the pool with a normal DEx order
- Send, trade, attach, or burn the LP token they receive

Below is a screenshot from the [XcpDex Counterparty Marketplace](https://www.xcpdex.com/explore/pools) showing recent Counterparty liquidity pool data.

![Recent Counterparty liquidity pools](https://github.com/user-attachments/assets/563bea77-967c-4894-b7f5-f8500a088864)

## How are Counterparty Liquidity Pool tokens represented?

The first depositor also picks an unused numeric asset ID. That asset becomes the pool’s LP token.

LP tokens are ordinary Counterparty assets issued by an unspendable protocol address, so nobody can reissue or lock the name. They represent your share of the pool.

Later deposits are clamped to the current reserve ratio so you do not move the price just by adding liquidity. Withdrawals burn LP tokens and return both assets in proportion, including fees the pool has earned.

To lock liquidity so it cannot be pulled, send LP tokens to an unspendable address.
Do not destroy these tokens if your goal is a lock: destroying LP tokens donates the underlying reserves to whoever still holds LP.

## How do I create a pool or use an existing one?

You need a little Bitcoin for the miner fee and a little XCP for the pool gas fee. To create or add liquidity, use a wallet that supports pools. Choose the two assets and the amounts.

On the first deposit, both amounts go in and you receive floor LP tokens (mentioned earlier). On later deposits, use the wallet’s quote so your amounts match the live ratio, and set a minimum LP amount if you want slippage protection. Below is an example user interface for adding liquidity to Counterparty pools from the [XcpDex Counterparty Marketplace](https://www.xcpdex.com/liquidity/deposit/XCP/PEPECASH).

![Add liquidity on xcpdex.com](https://github.com/user-attachments/assets/fb058d2b-ced1-43d7-932f-73e6b658c4c2)

To trade, place a normal DEx order for that pair. If the pool can fill you inside your limit price, it will. To withdraw, burn some or all of your LP tokens and set minimum payouts for both assets. Not every wallet shows pools yet. Check the wallet’s Pools or Liquidity section, and confirm the same pair on more than one explorer before you size a large deposit.

## What should I watch out for?

- The first deposit sets the price. A badly chosen ratio is a gift to the first trader through the pool.
- Impermanent loss is real. If one asset outperforms the other, you can withdraw less value than if you had just held both.
- A locked pool is not a price floor. It means some liquidity is always there, not that the token cannot trade below the price you like.
- Destroying LP tokens is not a lock. It shrinks LP supply and leaves the reserves for remaining holders.
- If every LP token is destroyed, stranded reserves stay in the pool. The next deposit restarts it and the new depositor owns the new LP supply, including those leftover reserves.
- You still pay Bitcoin miner fees on every action, plus a small XCP gas fee on deposit and withdraw.

For the protocol-level rules, see the [AMM Liquidity Pools specification](/docs/advanced/specifications/amm-pools).

## How does XCP.FUN use liquidity pools?

An XCP.FUN pool is not a different kind of pool. It is the same Counterparty AMM, opened automatically when an XCP-69 Fairmint sells out.

XCP.FUN only lists launches that use one fixed Fairmint setup (XCP-69).

If the public 69 million allocation fills:
- Minters receive their tokens
- The protocol deposits 31 million tokens plus the 690 XCP raised into a TOKEN/XCP pool
- The LP tokens are minted to an unspendable address
- Nobody, including the creator, can withdraw that launch liquidity

If the allocation misses the deadline, there is no pool. The XCP is refunded and the escrowed supply is destroyed.

A custom pool is a choice for the user. You pick the pair, the starting amounts, and whether you keep the LP tokens. You can withdraw later and collect fees. A Fairmint that is not on xcp.fun can also send raised XCP into a pool, with whatever lock and size the creator set. Read those terms on an explorer. They are not all the same.

Below is the [homepage for XCP.FUN](https://xcp.fun/) showing active 'graduated' tokens that all have Counterparty Liquidity Pools active.

![xcp.fun homepage with graduated tokens](https://github.com/user-attachments/assets/8300bc02-b481-45b7-bc1e-4959f01bc602)

## What is the difference between a custom Counterparty LP pool and the XCP-69 pool standard in practice?

Custom pool:
- You are the liquidity provider.
- You deposit, you hold LP tokens, you can add or withdraw, and you earn the swap fees on your share.

XCP.FUN launch pool:
- The mint itself funds the market.
- You participate by minting (or by trading after it graduates).
- You do not receive the launch LP tokens.
- That slice of the pool is locked on purpose.

Because Counterparty allows only one pool per pair, later users can still deposit extra TOKEN and XCP into that same pool and receive their own LP tokens. Their share can be withdrawn. The original XCP.FUN slice stays locked.

Use a custom pool when you want to make a market and keep (or lock) the LP yourself.
Use an xcp.fun Fairmint when you want the public launch to create a locked TOKEN/XCP market, or when you want to mint or trade that market after it graduates.

For the exact XCP-69 field values, see [xcp-69.md](https://github.com/XCP/launchpad/blob/main/docs/xcp-69.md) and the [xcp.fun FAQ](https://xcp.fun/faq).

Keep in mind XCP.FUN also provides the user interface for adding or removing liquidity from the XCP.FUN created pairs. Below is a screenshot of the UI from the XCP.FUN website.

![xcp.fun liquidity UI](https://github.com/user-attachments/assets/44bc3e56-1a84-4253-abcd-cfc8a87679ae)
