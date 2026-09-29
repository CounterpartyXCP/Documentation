---
title: What is a Counterparty Block Explorer?
---

# What is a Counterparty Block Explorer?

Similar to a Bitcoin block explorer, a [Counterparty Block Explorer](https://www.counterparty.io/#explorers) is an explorer specifically for information coded in the OP_Return function of Bitcoin transactions, which is what Counterparty transactions are.

Below is a screenshot of the [xcp.io](https://xcp.io/) Counterparty Block Explorer.

![xcp.io Counterparty Block Explorer](https://github.com/user-attachments/assets/50d7aee5-da4f-45b1-87fe-dd8c93aaa9c9)

## How do I read a Counterparty Block Explorer?

The same way you look up addresses or transaction ID's on a BTC block explorer, those same addresses and transaction ID's will now show Counterparty info as well. Counterparty transaction information is all public just like the Bitcoin blockchain is.

Below is a Counterparty transaction, but seen on a Bitcoin Block Explorer. This [specific transaction](https://mempool.space/tx/b55ea71e57f9c34c0f5894a2bf833fe7f1f59da006eb3d2b27b12e3ae687015b) was for the 'locking' action for the first Counterparty asset: TEST.

Notice how the sender address is also the receiving address but the transaction carries OP_RETURN data along with the transaction. Most Counterparty transactions will look like this since you are using only enough Bitcoin to cover the Bitcoin mining fee, the rest of your balance is return to you.

Keep in mind some Counterparty functions dont just use OP_RETURN but also include other Bitcoin actions like Multi-Sig or even Taproot.

![TEST lock transaction on a Bitcoin explorer](https://github.com/user-attachments/assets/edf8af7c-0cb4-4998-955b-1bd5c3f2b741)

Not all Bitcoin transactions are Counterparty transactions, but all Counterparty transactions are Bitcoin transactions.

Below is [the same transaction ID](https://xcp.io/tx/b55ea71e57f9c34c0f5894a2bf833fe7f1f59da006eb3d2b27b12e3ae687015b), but now shown on a Counterparty Block Explorer.

![TEST lock transaction on a Counterparty explorer](https://github.com/user-attachments/assets/b49619b8-1af0-4dee-add6-4d608421fb90)

Some explorers focus on specific assets like STAMPS, specific markets like Atomic Swaps or specific projects like Rare Pepe.
It is best to search around for your favorite and also understand which explorer shows which Counterparty functions or features projects you are interested in.

## What functions are visible on a Counterparty Block Explorer?

The functions that can be seen on Counterparty Block Explorers for Counterparty transactions can include:

- Send and Receive History / Balance (BTC + all XCP Assets)
- Multiple Address Types (Legacy, SegWit, Taproot)
- Counterparty Asset Info (Named / Numeric / Subasset)
- Counterparty Inscriptions (on-chain Taproot)
- Counterparty Asset Supply (Locked, Divisible, Destroyed or Reset)
- Asset Description + Lock Description Data
- Memo Data within Transaction
- Dividend Data
- Sweep's Data + Debit / Credit Data
- Broadcast Data within Transaction
- Token Ownership of Asset Transfer Data
- Counterparty Decentralized Exchange Orders (Any Pair - Open and Closed)
- Open + Closed Dispensers (by Token or Hash)
- Open Fairmints
- XCP Asset's Attached/Detached to UTXO
- Atomic Swap history with UTXOs (BTC/PSBT markets)
- Sales Data in ETH / USD from Emblem Vault Markets

Below is an example of when all POWH tokens were sent to a burn address (so they could not be recovered), this transaction is not only a good piece of history but a good idea for what a Counterparty function looks like on a block explorer.

[This example](https://tokenscan.io/tx/1181319) shown below is from the [tokenscan.io](https://tokenscan.io/) Counterparty Block Explorer.

![POWH burn transaction on tokenscan.io](https://github.com/user-attachments/assets/03a68ab8-59f9-49b1-ab88-3dbbea77756c)

## Should I only use one Counterparty Block Explorer to view Counterparty information?

Absolutely not! You should always verify Bitcoin and Counterparty transaction data from various sources.

Below is the same transaction of the POWH send from before, but just viewing on the mempool.wtf Counterparty Block Explorer.

![POWH burn transaction on mempool.wtf](https://github.com/user-attachments/assets/a6dd24aa-30a1-44f1-8aa9-83d23af3a964)

Before taking action using any Counterparty function, it is very prudent to check data from [multiple explorers](https://www.counterparty.io/#explorers) and also very important know the [extent of functionality](https://github.com/CounterpartyXCP/CIPs/discussions/158) for the [Counterparty Wallet](https://www.counterparty.io/#wallets) you would like to use.
