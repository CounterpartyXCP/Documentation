---
title: What is an Atomic Swap?
---

# What is an Atomic Swap?

An atomic swap is a trustless, peer-to-peer exchange of assets in which the trade either completes fully for both parties or does not happen at all. There is no intermediary, no custodial risk, and no possibility that one side receives assets while the other does not.

Counterparty assets can be attached directly to Bitcoin UTXOs, allowing them to be traded using the same Partially Signed Bitcoin Transaction (PSBT) mechanisms popularized by Ordinals and other colored-coin protocols. The result is a single-transaction, fully trustless swap between BTC and any Counterparty asset.

This capability was introduced with Counterparty’s UTXO Support (protocol release v10.4.0), enabling assets to move between address-based balances and UTXO-bound balances. In the broader cryptocurrency world, atomic swaps traditionally relied on Hash Time-Locked Contracts (HTLCs) across different blockchains. On Counterparty (a Bitcoin metaprotocol), atomic swaps work differently and more efficiently thanks to UTXO support.

Below is an example of the buying process for an Atomic Swap on [Horizon Marketplace](https://horizon.market/assets/A1619006396900464164?offset=0&limit=10).

![Atomic swap buy on Horizon Marketplace](https://github.com/user-attachments/assets/45b6c88a-2e1c-4119-9375-74a37823ff75)

## How do Atomic Swaps work on Counterparty?

Counterparty balances are normally associated with Bitcoin addresses, but with UTXO support the "Attach" function vaults a Counterparty asset (or multiple assets) from an address to a specific Bitcoin UTXO.

Because the asset is bound to a UTXO, a seller can create a partially signed Bitcoin transaction offering that UTXO (and its attached asset) in exchange for a specified amount of BTC. A buyer completes and signs the PSBT. When the final transaction confirms on the Bitcoin blockchain, both the BTC and the Counterparty asset move atomically. Neither party can take the other’s funds without delivering their own.

While it is good to know how this process works in its entirety, the user experience can be quite smooth and frictionless with the correct tooling. Below is an [example from Rare-BTC-Assets](https://rare-btc-assets.com/art/counterparty/Spells%20of%20Genesis) showing the price of a Spells of Genesis Card for sale using Atomic Swaps.

![Spells of Genesis atomic swap listing](https://github.com/user-attachments/assets/a4ffab21-b237-4444-baa8-cf5e25b5960d)

While the UI might feel easy in some marketplaces, here is a general overview of the process:

- Prepare the Asset in a supported Counterparty wallet, attach the desired quantity of the asset to a UTXO (this incurs a small dynamic XCP gas fee).
- Create the Sell Offer: The wallet (or market interface) generates a PSBT that offers the UTXO-bound asset for a set BTC price. The incomplete PSBT is published to an order book (Horizon Market, OpenStamp, xcpdex, etc.).
- Buyer Accepts: The buyer constructs their side of the PSBT (supplying the BTC), joins the two partial transactions, signs, and broadcasts the final transaction.
- Settlement: Once confirmed on Bitcoin, the seller receives BTC and the buyer receives the UTXO (with the attached Counterparty asset).
- Detach: The seller can decide to cancel the sell order and detach their asset at any time (assuming no match order has been published). After buying and recieving the asset, the buyer can also later detach the asset if desired.

There are some caveats to keep in mind:

- The entire attached balance on a UTXO must be sold together; fractions cannot be listed separately.
- Only one attach transaction is allowed per block (to prevent over-attachment or accidental multi-asset issues).
- Attached assets cannot be used in normal Counterparty operations (sends, orders, dispensers, etc.) until detached.
- Once the asset is detached and moved from the UTXO back to an address balance, detached assets behave like ordinary Counterparty balances again and are safe from 'accidental UTXO spending' by non-Counterparty-aware wallets.

Atomic swaps complement (and in many cases improve upon) other Counterparty trading methods such as the decentralized exchange (DEx) and dispensers. Dispensers act like virtual vending machines that accept BTC and release assets, but they can involve front-running or timing risks. Atomic swaps eliminate those risks entirely.

## What are the risks of Atomic Swaps?

Atomic swaps on Counterparty are trustless at the protocol level, but attaching assets to Bitcoin UTXOs introduces the main risk of accidental spending, because a UTXO is basically a very small balance of bitcoin.

In a very broad sense, Atomic Swaps and PSBT's use a 'stamped' chunk of loose change (small balance of bitcoin) to imprint the information of your Counterparty assets, so it is important you do not 'accidently' spend your stamped loose change (attached assets) at the 'gas station' for a coffee and snacks before or after transaction at the marketplace exchange.

That is why it is important to understand a few helpful things for Atomic Swaps:

- Always use a Counterparty Atomic Swap aware wallet (or one that does understand attachments), spending that UTXO on a different wallet could irreversibly move the assets with it.
- Users who don’t understand UTXOs (and use their Counterparty address often for other uses) could easily select the wrong output when consolidating or sending Bitcoin and lose the attached assets. Keep Bitcoin only balances on other dedicated wallets, it is best to use a specific wallet and specific address for Atomic Swaps.
- Other minor risks include manual PSBT construction errors and leaving assets attached longer than needed and forgeting.

To stay safe, always use Counterparty-aware wallets, detach assets promptly after trading, learn how to read and understand your UTXO's and practice careful coin control. Below is an example of the 'Attach to UTXO' function in the [XCP Wallet](https://chromewebstore.google.com/detail/xcp-wallet/nicpjdbehgcjbjfjkobcidnfmfpijohg).

![Attach to UTXO in XCP Wallet](https://github.com/user-attachments/assets/8174b08b-de29-4921-a4f8-125eaadfeaa3)

## Which wallets support Counterparty Atomic Swaps?

As of the latest community feature matrix, the following wallets support Atomic Swap with UTXOs (BTC/PSBT markets):

- [RarePepeWallet](https://rarepepewallet.wtf/) (Rare Pepe Assets only)
- [Horizon Wallet](https://chromewebstore.google.com/detail/horizon-wallet/bnmgkjlaommgappfckljlelgahnbngme?hl=en) (via Horizon Market)
- [NinjaWallet](https://wallet.xcp.ninja/) (via xcp.ninja marketplace)
- [XCP Wallet](https://chromewebstore.google.com/detail/xcp-wallet/nicpjdbehgcjbjfjkobcidnfmfpijohg) (via xcpdex.com)
- Emblem Vault (via [rare-btc-assets.com](https://rare-btc-assets.com/))
- Compatible Bitcoin wallets that understand PSBTs and sat/UTXO tracking (Xverse, OKX, Leather, UniSat, etc.) can also interact with Horizon Market listings and some other Counterparty Marketplaces.

Keep in mind other Counterparty specific wallets may add support over time for this feature. Do as much due diligence as possible before choosing a wallet and trading any time of assets.

## Are atomic swaps the same as the Counterparty DEx?

No.

The classic DEx is an on-protocol order book that settles via Counterparty rules. Atomic swaps settle entirely via a single Bitcoin transaction using UTXO attachment and PSBTs, offering stronger atomicity with Counterparty asset trading direct to Bitcoin.
