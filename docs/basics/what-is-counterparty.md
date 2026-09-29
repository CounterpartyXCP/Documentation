---
title: What is Counterparty?
---

### What is Counterparty?

The Counterparty Protocol is an extension to the Bitcoin protocol which implements a number of features that Bitcoin itself does not offer.

These include features like Token Issuance, a fully decentralized and Trustless Asset Exchange, Liquidity Pools, Fairminters, Destructions, Crypto Gaming, Broadcasting Feeds, Sweeps, Atomic Swaps, Dispensers, Curated Art Projects, On-Chain Publishing and much more...

Below is the homepage for the [Spells of Genesis](https://spellsofgenesis.com/) blockchain trading card game by [EverdreamSoft](https://everdreamsoft.com/). The Counterparty protocol is the backbone for the cryptographic infrastructure of the Spells of Genesis cards, currency and even the artistic culture included.

![Spells of Genesis homepage](https://github.com/user-attachments/assets/997fdfb4-c2d5-4510-a681-7485102e75bc)

### How does Counterparty work?

Counterparty works by ‘writing in the margins’ of Bitcoin transactions. All Counterparty transactions are Bitcoin transactions with additional data.

To a regular Bitcoin client, these transactions look like normal Bitcoin transactions, with one party sending another party a very small amount of Bitcoin. A Counterparty node (which runs the Bitcoin client along with [Counterparty Core](https://github.com/CounterpartyXCP/counterparty-core)) will recognize and interpret the data in these Bitcoin transactions based on specific rules. From this, a node constructs its own ledger of Counterparty transactions and Counterparty network state.

This means that Counterparty transactions contain some amount of extra information attached through Bitcoin centric functions like OP_RETURN, Multi-Sig, and even Taproot.

Adam Krellenstein, co-founder of Counterparty, wrote about this functionality and labelled Counterparty as a 'metaprotocol' in the [Counterparty Whitepaper](https://krellenstein.com/adam/get/counterparty-whitepaper_2024-03-29.pdf) titled "Counterparty An Extension to Bitcoin by State-Machine Replication".

![Counterparty whitepaper excerpt](https://github.com/user-attachments/assets/fe87ec93-4a2b-40e8-ab40-ebfc56a29df8)

### Does Counterparty have its own blockchain?

Counterparty lives entirely on the Bitcoin blockchain.

While the data is within the Bitcoin transactions themselves (as seen on a Bitcoin Block Explorer), the Counterparty data within those is interpreted and shown in an easily readable manner by [Counterparty Block Explorers](https://www.counterparty.io/#explorers).

Below is data from the [xcp.io](https://xcp.io/blocks) Counterparty Block Explorer showing the percentage of Counterparty transactions within Bitcoin blocks by year since Counterparty was created.

![Counterparty transactions by year](https://github.com/user-attachments/assets/4e45318e-3e51-43de-8731-3de39426c8cb)

### How is the Counterparty network secured?

Counterparty transactions are just as secure as regular Bitcoin transactions because Counterparty transactions are Bitcoin transactions, so Bitcoin miners validate the entire history of the Counterparty network.

Because of this, it is no easier to attack Counterparty than it is to attack Bitcoin itself.

Below is the same data from the [xcp.io](https://xcp.io/blocks) Counterparty Block Explorer but this time showing the percentage of Bitcoin fees paid to Bitcoin miners for Counterparty transactions.

![Counterparty miner fees](https://github.com/user-attachments/assets/e9663540-4bda-412c-a6a0-90a66cbb9321)

### Is Counterparty "polluting" the Bitcoin blockchain, then?

The vast majority of Counterparty transactions utilize a data-encoding method called OP_RETURN, which is fully "prunable". This means that the data may be safely discarded by Bitcoin nodes that don't wish to store it.

Unprunable Counterparty transactions use alternative encoding methods. However, these outputs for these transactions do not stay in the memory of Bitcoin nodes for very long. Of course, every Counterparty transaction pays a fair fee to the network for being mined and are immutable.

Keep in mind the Genesis Bitcoin Block included data shown below:

![Bitcoin genesis block message](https://github.com/user-attachments/assets/a4b2e847-ae8a-4bb5-9b4c-e16f0c43c334)

To expand on the philosophy of this question, the discussion of data-embedding on Bitcoin has been debated for a very long time, a discussion of which now includes methods other than OP_RETURN like Taproot, Witness Data and more.

Even before Counterparty, OP_RETURN and other Bitcoin functionality was used to publish information, shown below:

![Early Bitcoin data embedding](https://github.com/user-attachments/assets/9f25a754-9b43-4038-89f1-7df14685af98)

### How do the Counterparty nodes stay in sync?

As all Counterparty nodes run the same code, and all receive the same Bitcoin transaction data, the ledgers across each node match exactly.

Counterparty nodes are not like Bitcoin nodes in that they don't communicate with each other directly: they simply connect to the Bitcoin software and download transactions from it, decoding each one as they go along.

In this way, the immense security and computing power behind Bitcoin is leveraged as the "transport network" for Counterparty data.
