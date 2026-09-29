---
title: What is a Counterparty Dispenser?
---

# What is a Counterparty Dispenser?

A Counterparty Dispenser is similar to how a vending machine works. The machine sets a price for a given item, and upon payment, dispenses the item. Using the Counterparty protocol a Dispenser is a feature that allows for any token (named, subasset, numeric) to be bought with Bitcoin directly by sending the correct amount of a Bitcoin to a specific address.

For a buyer, it is as simple as the example below: Send the right amount of Bitcoin from a Counterparty compatible wallet and automatically recieve the asset when payment is confirmed.

![Send Bitcoin to a dispenser and receive the asset](https://github.com/user-attachments/assets/056867e1-f1cc-43f3-be6e-913ed4ce2dfe)

A dispenser works for a single specific asset. You can sell one or many of that asset token for a set BTC price. Below is a view from [tokenscan.io](https://tokenscan.io/) of recent dispensers at the time of this writing.

![Recent dispensers on tokenscan.io](https://github.com/user-attachments/assets/2b4c2a8e-a3cb-4282-aa0d-16514a9c9352)

It is even possible to create multiple Dispensers on one address so a specifc Bitcoin price can dispense many different Dispensers, and thus sell many Counterparty assets with the buyer paying in just one Bitcoin transaction. Though for the seller, each dispenser opening on that address costs a Bitcoin transaction fee.

All data for currently open and closed Dispensers in the past can be seen using a [Counterparty Block Explorer](https://www.counterparty.io/#explorers).

![Open and closed dispensers on an explorer](https://github.com/user-attachments/assets/604859b3-9519-4eef-9d0d-7df391ec2f81)

## How Do I Sell With a Dispenser?

Dispensers can only sell Counterparty assets you already own. Dispensers also must be created with a [Counterparty Compatible Wallet](https://www.counterparty.io/#wallets).

The example below shows the user interface of [xcpdex.com](https://www.xcpdex.com/sell) used with the [XCP Wallet](https://chromewebstore.google.com/detail/xcp-wallet/nicpjdbehgcjbjfjkobcidnfmfpijohg).

As a seller, the process is as follows:
- Identify a Counterparty Asset in your Wallet that you wish to sell
- Use a Counterparty Wallet to create a Dispenser on a Counterparty address you own
- Set any quantity of that Asset per Dispense
- Set a Bitcoin price per Dispense of your Asset
- Wait for your Create Dispenser transaction to confirm on the Bitcoin network
- Leave the Dispenser open (as long as you wish)
- Any Bitcoin sends above that price to that Dispenser address you set will automatically Dispense the token

![Create a dispenser on xcpdex.com](https://github.com/user-attachments/assets/136f8ac9-6363-4650-a56f-c3943a4a8b18)

Keep in mind no central company, custodian, or intermediary holds your funds or controls the market. The entire process is deterministic and enforced by the protocol running on every Counterparty node. The protocol acts as escrow with no platform fees for dispensing (only standard Bitcoin transaction fees).

During the time the Dispenser is 'open', the sellers assets are in escrow and cannot be moved. Any BTC sent to that address (with a Counterparty wallet) above that BTC price set will automatically dispense the asset.

This is important to know as a seller, as to not accidently dispense your asset. It is common for sellers to generate a new address specifically for a Dispenser and to not create them on a Counterparty address that is used often or holds their main token balances. Once there are no more tokens in a Dispenser, it is automatically closed.

## How Do I Buy From a Dispenser?

Buying from a Dispensers must be done a [Counterparty Compatible Wallet](https://www.counterparty.io/#wallets) and will only work if the correct amount (or more) of Bitcoin is sent to the open Dispenser address. The machine will not dispense the item unless it is paid for, in full, with one Bitcoin transaction.

Multiple transactions and partial dispenses are not supported for the protocol to dispense the asset.

The example below shows the user interface of [xcpdex.com](https://www.xcpdex.com/buy) used with the [XCP Wallet](https://chromewebstore.google.com/detail/xcp-wallet/nicpjdbehgcjbjfjkobcidnfmfpijohg).

As a buyer, the process is as follows:
- Identify a Dispenser for an Asset you desire to buy
- Check the Dispenser is still labeled as 'open'
- Verify there are no unconfirmed transactions of BTC already being sent to that address that would 'buy the dispenser out before you'
- Verify the Dispenser address, Asset amount and Bitcoin amount to send
- Send Bitcoin to Dispenser address with a Counterparty Wallet
- Wait until the BTC transaction is confirmed
- Recieve the Asset(s) automatically

![Buy from a dispenser on xcpdex.com](https://github.com/user-attachments/assets/745c962e-c7c0-46ae-a731-a541047d5194)

As a buyer it also important to be extremely diligent, take your time and verify all the details. One of the most common details to miss is the possibility that the Asset you wish to buy (such as XCP) is divisible into smaller decimals than a single token. Keep in mind to check for Give Amounts of the dispenser to be 1.00000000 and not 0.00000001, as XCP is a divisible asset and can be broken (and sold) in very small amounts.

## How Do You Close a Dispenser?

Dispensers have no expiration date unless closed by the seller address. At any time the seller can choose to close the Dispenser, but it will take five Bitcoin blocks to finally close after the sellers 'close dispenser' message has been confirmed on the Bitcoin network.

Because of this five block delay after the close dispenser confirmation, it is very important to use a very high bitcoin fee compared to the market average and keep an eye on the Counterparty activity of the Dispenser address on a Counterparty Block Explorer.

It is up to you to make sure that transaction gets confirmed on the network as soon as possible and make sure the Dispenser is still open.

Because this process is automatic on a protocol level it is important to never send Bitcoin to an actively 'closing' Dispenser and to do as much due diligence as possible before initiating any Dispenser buy at all. After the Dispenser has closed, any remaining tokens will be automatically refunded to the seller address (which is why using a high fee as a buyer is so important).

Example below is from [tokenscan.io](https://tokenscan.io/tx/5f3f0a60cbc1e04116e3e19d3c7381595fb5f31a095e9106fa93351546e33c8f) and shows a closed dispenser for XCP because the amoutn escrowed sold out!

![Closed XCP dispenser on tokenscan.io](https://github.com/user-attachments/assets/01a6f6ac-8cc7-42ee-91ed-94f69542d2f8)

## What is the History of Dispensers?

This feature was added in 2019 by John Villar with the implementation of [Counterparty Improvement Proposal 21](https://github.com/CounterpartyXCP/CIPs/blob/master/cip-archive/cip-0021.md). The main goal was to alleviate the limitation of the XCP DEx originally not supporting BTC as a possible trading pair and the technical limitations of the earlier 'BTCpay' function for direct Bitcoin to Asset markets.

![CIP-21 dispenser history](https://github.com/user-attachments/assets/315211d8-c605-46d4-aa91-b1a4acb5bd31)

Dispensers created a great way to sell assets directly to BTC without an intermediary or a centralized exchange and are still very common in the contemporary Counterparty community.

While the vast majority of Counterparty dispenses have had zero issues, some users in the community were wary of the feature due to the risks with Bitcoin fees and further technical issues regarding edge cases of multiple buyers initiating Dispenser buys in the same Bitcoin block.

This debate inspired the more recent and trustless feature of Counterparty Atomic Swaps, which work in a similar way to more recent Ordinal wallets and centralized Ordinal exchanges. Counterparty Atomic Swaps utilize Bitcoin features like Partially Signed Bitcoin Transactions (PSBT's).
