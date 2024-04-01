---
title: What is Counterparty?
---

### What is Counterparty?

The Counterparty Protocol is an extension to the Bitcoin protocol which implements a number of features that Bitcoin itself does not offer. These include token issuance, a fully decentralized and trustless asset exchange, contracts for difference, native oracles and trustless gaming.


### How does Counterparty work?

Counterparty works by ‘writing in the margins’ of Bitcoin transactions, and all Counterparty transactions are Bitcoin transactions with additional data that the Counterparty software can read and interpret. To a regular Bitcoin client, these transactions look like normal Bitcoin transactions, with one party sending another party a very small amount of Bitcoin. A Counterparty node (which runs the Bitcoin client along with [Counterparty Core](https://github.com/CounterpartyXCP/counterparty-core)) will recognize and interpret the data in these Bitcoin transactions based on specific rules. From this, it constructs its own ledger of Counterparty transactions and Counterparty network state.


### What does a Counterparty transaction look like?

[Here](https://counterpartychain.io/transaction/c717d2d205155c2067786c08b7c7e6e6f904a18626969daca0ecb6c3e8bb7b8f) is a record of a Counterparty transaction where one address is sending 48 SJCX tokens (a custom token used by [Storj](https://storj.io/)) to another address.

[Here](https://blockchain.info/tx/c717d2d205155c2067786c08b7c7e6e6f904a18626969daca0ecb6c3e8bb7b8f) is what this transaction looks like to a blockchain.info, a popular Bitcoin block explorer. You can see that while it is indeed a Bitcoin transaction, the amount of Bitcoin moved is small. In reality, the BTC spent is just enough to compensate the Bitcoin miners to include the transaction in a block. Essentially, the user that sent the transaction is paying the Bitcoin network to record and secure this embedded Counterparty data.


### Does Counterparty have its own blockchain?

Counterparty lives entirely on the Bitcoin blockchain. Such a protocol is sometimes called a **metaprotocol** or **metachain**.


### Is Counterparty "polluting" the Bitcoin blockchain, then?

The vast majority of Counterparty transactions utilize a data-encoding method called `OP_RETURN`, which is fully "prunable". This means that the data may be safely discarded by Bitcoin nodes that don't wish to store it. Unprunable Counterparty transactions use alternative encoding methods. However, these outputs for these transactions do not stay in the memory of Bitcoin nodes for very long. Of course, every Counterparty transaction pays a fair fee to the network for being mined.


### How is the Counterparty network secured?

Counterparty transactions are just as secure as regular Bitcoin transactions because Counterparty transactions *are* Bitcoin transactions, so Bitcoin miners validate the entire history of the Counterparty network. It is no easier to attack Counterparty than it is to attack Bitcoin itself.


### How do the Counterparty nodes stay in sync? What's to stop one node from disagreeing with another?

As all Counterparty nodes run the same code, and all receive the same Bitcoin transaction data, the ledgers across each node match exactly. Counterparty nodes are not like Bitcoin nodes in that they don't communicate with each other directly: they simply connect to the Bitcoin software and download transactions from it, decoding each one as they go along. In this way, the immense security and computing power behind Bitcoin is leveraged as the "transport network" for Counterparty data.
