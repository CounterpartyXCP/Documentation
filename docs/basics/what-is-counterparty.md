---
title: What is Counterparty?
---

### How does Counterparty work?

Counterparty embeds data into regular Bitcoin transactions. To a regular Bitcoin client, these transactions look like normal Bitcoin transactions, with one party sending another party a very small amount of Bitcoin. A Counterparty node (which runs the Bitcoin client along with [the Counterparty Core software](https://github.com/CounterpartyXCP/counterparty-core)) will recognize and interpret the data in these Bitcoin transactions based on specific rules. From this, it constructs its own ledger of Counterparty transactions that it has seen on the Bitcoin network.

To better help understand this, [here](https://counterpartychain.io/transaction/c717d2d205155c2067786c08b7c7e6e6f904a18626969daca0ecb6c3e8bb7b8f) is a record of a Counterparty transaction where one address is sending 48 SJCX tokens (a custom token used by [Storj](https://storj.io/)) to another address. [Here](https://blockchain.info/tx/c717d2d205155c2067786c08b7c7e6e6f904a18626969daca0ecb6c3e8bb7b8f) is what this transaction looks like to a blockchain.info, a popular Bitcoin block explorer. You can see that while it is indeed a Bitcoin transaction, the amount of Bitcoin moved is small. In reality, the BTC spent is just enough to compensate the Bitcoin miners to include the transaction in a block. Essentially, the user that sent the transaction is paying the Bitcoin network to record and secure this embedded Counterparty data.

### So Counterparty is not its own Blockchain, but "rides on top of" Bitcoin?

Yes. Another way to think of it is similar to a [Russian nesting doll](https://en.wikipedia.org/wiki/Matryoshka_doll), where the bigger doll would be the Bitcoin transaction, and the next doll (inside of it) would be a Counterparty transaction.

This embedding method is technically known as **embedded consensus**.

### Is Counterparty "polluting" the Bitcoin blockchain, then?

No. 99%+ of Counterparty transactions utilize a data encoding method called `OP_RETURN`, which is fully "prunable", meaning that the data may be safely discarded by Bitcoin nodes which wish to do so. For the remaining 1% of transactions, an different encoding method is utilized that produces fully "spendable" outputs. These outputs do not stick around in the critical list of unspent outputs (the "UTXO set"). Of course, every Counterparty transaction pays a fair fee to the network for inclusion.

### Are Counterparty transactions less secure than Bitcoin transactions?

As Counterparty transactions _are_ Bitcoin transactions, their data are just as secure as any other Bitcoin transaction.

### How do the Counterparty nodes stay in sync? What's to stop one node from disagreeing with another?

As all Counterparty nodes run the same code, and all receive the same Bitcoin transaction data, the ledgers across each node match exactly. Counterparty nodes are not like Bitcoin nodes in that they don't communicate with each other directly: they simply connect to the Bitcoin software and download transactions from it, decoding each one as they go along. In this way, the immense security and computing power behind Bitcoin is leveraged as the "transport network" for Counterparty data.

Given the above, there is no "Counterparty peer-to-peer network" like there is a "Bitcoin peer-to-peer network": Counterparty-aware nodes comprise a subset of the Bitcoin full nodes in existance.

### What kind of addresses does Counterparty use?

Counterparty uses the same Bitcoin addresses we all know and love. As such, Counterparty tokens (such as XCP, SJCX, CAKE, and more) may be sent to any Bitcoin address.
