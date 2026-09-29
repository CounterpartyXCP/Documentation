---
title: What is a Counterparty Fairmint?
---

# What is a Counterparty Fairmint?

A Counterparty Fairmint is a way to launch a Counterparty asset so people can mint it themselves, instead of the creator issuing the full supply and holding all of it at launch. The older launch path is still available: create the asset, receive 100% of the tokens, then sell or give them away later.

A Fairmint flips that. The creator publishes the mint first. Other addresses mint under those rules. The protocol creates the tokens as people join. Fairminting is a built-in protocol feature. It replaced the older workaround of sending tokens to a burn address and selling them from a dispenser (XCP-20 model).

You can browse open and closed Fairmints on a [Counterparty Block Explorer](https://www.counterparty.io/#explorers).  To create or mint from a Fairminter, make sure to use a [Counterparty Compatible Wallet](https://www.counterparty.io/#wallets).

Below is an example from the [xcp.io](https://xcp.io/asset/XCPCOPY) Counterparty Block Explorer of an open Fairmint (at the time of writing) where five separate Counterparty addresses have fairminted this asset XCPCOPY.

![Open XCPCOPY Fairmint on xcp.io](https://github.com/user-attachments/assets/e2d83bce-d202-4364-97b0-1e71776bf622)

## How is Fairminting different from just issuing the asset?

Issuance starts with one owner. Fairminting starts with a public mint.

With issuance, the creator decides the amount and holds it on day one. With a Fairmint, supply is created as people mint.

The creator can still own the asset name, but they do not have to own the whole supply. Both methods are valid. Fairminting is the option when you want distribution at launch, not after.

Below is a screenshot from the [tokenscan.io](https://tokenscan.io/asset/FAIRLORDKEK) Counterparty Block Explorer showing FAIRLORDKEK as 100% minted. Instead of just one person holding distribution for this asset on launch, 23 addresses hold this asset at the time of writing.

![FAIRLORDKEK minted distribution](https://github.com/user-attachments/assets/f3853117-3dc2-41e7-b70e-6a81463fe3e0)

## What can you do with a Fairmint?

A Fairmint is a set of choices, not one product. Different launches can:

- Let anyone mint for only a Bitcoin miner fee
- Charge XCP to mint
- Cap how much one address can mint
- Set a time window
- Give the creator a premine, a cut of each mint, the XCP raised, or none of those
- Burn the XCP paid to mint
- Refund everyone if not enough people show up
- Put the raised XCP into a trading liquidity pool instead of sending it to the creator

After the mint ends, the asset works like any other Counterparty asset. People can send it, trade it on the DEx, sell it from a dispenser, burn it, etc.

Anyone can open a Counterparty Fairmint. Read the terms on an explorer before you join.  A “fair” mint on one asset is not automatically the same deal as a mint on another.

Below is a screenshot of the finished Fairminter of FAIRSOUND as shown on the [tokenscan.io](https://tokenscan.io/tx/d3f42691702a32e2376ebf334317f4079894085ff697d3e357c165ba069ca22f) Counterparty Block Explorer. Notice all of the different settings and options can be used for this feature.

![FAIRSOUND Fairminter settings](https://github.com/user-attachments/assets/d61a25a2-1f3c-4c08-9e33-35710f2ba490)

## How do I open a Fairmint or participate in an existing open Fairmint?

To open a custom Fairmint, use a compatible Counterparty wallet that supports Fairminting, choose a new or existing unlocked asset, set the terms, and confirm the Bitcoin transaction. Named assets still pay the usual 0.5 XCP name fee.

Below is an example screenshot from the [XCP Wallet](https://chromewebstore.google.com/detail/xcp-wallet/nicpjdbehgcjbjfjkobcidnfmfpijohg) Counterparty Wallet for creating a Fairminter. Take note there are even more choices a creator can do by clicking the 'Advanced Options' tab.

![Create a Fairminter in XCP Wallet](https://github.com/user-attachments/assets/022f56e6-03e9-4e01-b0ca-36434d213069)

To mint, find an open Fairmint, read the Fairminting price and limits on a Counterparty Block Explorer, and send the fairmint transaction from Counterparty Compatible wallet. Below is an example of the 'Mint Supply' action from the [Freewallet Desktop](https://freewallet.io/) Counterparty Wallet.

![Mint Supply in Freewallet](https://github.com/user-attachments/assets/261d942e-8d08-42a2-8a55-47613d17d4d9)

You need a little Bitcoin for the miner fee. If the mint is priced to include an XCP cost, you also need XCP on that same address.

If the launch uses a minimum raise and misses it, the protocol can return the XCP.
If it succeeds, the tokens are credited and the mint closes.

When minting Fairmints it is very important you research and verify that:
- The Fairminter is still open
- The Fairminter doesnt have enough unconfirmed minter transaction to close before your transaction confirmed
- You have enough BTC (or XCP if required) to mint
- You understand the specifications and settings the Fairmint provides

A good example is shown below for the asset 'CUPOFGM' by looking at the tokenscan.io Counterparty Block Explorer. The asset is only 23.8% minted out, but upon further inspection the Fairminter is currently closed.

![CUPOFGM mint progress](https://github.com/user-attachments/assets/9b7b870b-f296-45ba-9ade-00389a0a932e)

![CUPOFGM Fairminter closed](https://github.com/user-attachments/assets/e8a2808c-86a0-4218-8d8b-fc72258d2873)

![CUPOFGM Fairminter details](https://github.com/user-attachments/assets/dc19babe-7a4e-4baa-8550-e43e591208e6)

## What is an xcp.fun Fairmint?

An xcp.fun Fairmint is not a different protocol. It is one fixed way to use Counterparty Fairminting, listed on [xcp.fun](https://xcp.fun/) and described as XCP-69. A graduated and successful xcp.fun Fairmint also automatically creates the liquidity pool for the Fairmint asset trading with the XCP token.

A normal Fairmint can include a premine, a creator payout, no refunds, or no trading pool. xcp.fun only lists launches that all use the same rules:
- A named token with a fixed 100 million supply
- 69 million offered to the public
- 31 million reserved for a TOKEN/XCP pool
- A set price in XCP
- A cap so one address cannot buy the whole mint
- No premine and no creator commission
- The raised XCP goes into locked liquidity, not to the creator
- If the public amount is not filled in time, everyone is refunded and the token ends at zero supply

To create, mint or buy/sell [xcp.fun](https://xcp.fun/) Fairmints, the best Counterparty Wallet to use is the [XCP Wallet](https://chromewebstore.google.com/detail/xcp-wallet/nicpjdbehgcjbjfjkobcidnfmfpijohg).

![xcp.fun Fairmint interface](https://github.com/user-attachments/assets/5016ec0e-b9da-4f96-92ae-8c37b3945b61)

The terms are published on-chain before minting opens. If the public allocation fills, minters get their tokens and a locked pool is created so trading can start. If it does not fill, XCP is returned.

- Bitcoin miner fees are not refunded.
- Use a custom Fairmint when you want different terms.
- Use an xcp.fun Fairmint when you want the same public launch every time: either the crowd fills a fixed allocation, or the launch is unwound and all XCP for all minters is returned.

![xcp.fun Fairmint rules](https://github.com/user-attachments/assets/dff16527-9894-401b-8953-de1740cc7460)

## What should I watch out for?

- Not every Fairmint is XCP-69. If you are not on xcp.fun, read price, premint, commission, burn flag, soft cap, pool quantity, and locks yourself.
- Soft-cap escrow is not a wallet balance. Until a soft-cap mint resolves, you may not be able to send or trade the tokens.
- Refunds return XCP quantity, not dollar value. If XCP moves during a week-long window, the refund can be worth more or less in fiat terms.
- A failed XCP-69 launch buries the name. The ticker stays registered at zero supply. Do not use a name you care about keeping live unless you accept that risk.
- Per-address caps raise the cost of a fake crowd; they do not make one impossible.
- Locked pool liquidity is not a price floor you will necessarily like. It means there is always some bid in the pool, not that the token cannot trade below mint.
- You still need a small amount of Bitcoin for every Fairminter and Fairmint transaction, the same as any other Counterparty action.

For the protocol-level parameter list, see the [Fair Minting specification](/docs/advanced/specifications/fairminter). For the exact XCP-69 field values and conformance checks, see [xcp-69.md](https://github.com/XCP/launchpad/blob/main/docs/xcp-69.md) and the [xcp.fun FAQ](https://xcp.fun/faq).
