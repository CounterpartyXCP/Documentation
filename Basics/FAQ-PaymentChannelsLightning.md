Payment channels, Lightning FAQ
====================

[TOC]

### What are Payment channels?

**Payment channels** allow two users of Bitcoin to transact commitments to pay back and forth between each other much faster and more fluidly than Bitcoin’s 10 minute block times would normally allow. These commitments are exchanged between the users outside of the Bitcoin blockchain. Once the users are done, they can close the payment channel by committing the last commitment to the blockchain, which will finalize the amount actually transacted.

An ideal use case for the technology would be to enable **micropayments**: Imagine user A making numerous very small payments (e.g. .0001 BTC) to Big Music Company as she listens to songs over a certain period. Without payment channels, the Bitcoin transaction fees from these small payments would be as much or more than the payments themselves, and each payment would take on average 10 minutes to clear.

Shawn Wilkinson of [Storj](https://storj.io/) (a Counterparty project) provides a [good overview](http://super3.org/introduction-to-micropayment-channels/) of payment channels (which goes into detail on both unidirectional and bidirectional channels.

### What is the Lightning Network?

Still under development, the **Lightning Network** will allow for secure, instant off-chain payments between two arbitrary participants. It is one of the primary methods of scaling Bitcoin to have credit card network-like transaction throughput, while preserving its decentralized qualities.

Lightning Network technology uses bidirectional payment channels under the hood. Much like the internet does in routing data packets from network point to network point, the Lightning Network routes payments across multiple interconnected payment channels. This avoids the need for you having to construct a new payment channel for every party that you want to transact with. Instead, you may have a channel set up with a party you have an established relationship with, such as a payment provider like Coinbase, who (possibly through multiple degrees of separation) has a payment channel connection to the final end party.

Because the individual participants’ transactions utilize Bitcoin cryptography and are eventually committed back to the Bitcoin blockchain, transactions on the Lightning Network are essentially as secure as if they were transacted directly on Bitcoin, but without the same cost, speed and scalability limitations.

The [Lightning Network site](https://lightning.network/) includes more information.

### Why is Counterparty supporting payment channels a Big Deal?

Previously, individual Counterparty transactions were committed directly to the Bitcoin blockchain. This is very secure, but is impacted by Bitcoin’s 10 minute block times and per-transaction fees. With payment channels, Counterparty users gain the ability perform certain common actions, such as incrementally swapping XCP for BTC or paying TOKENABC for increased use of a service, without having to wait between iterations. The benefits of this are especially apparent when the amounts transacted are small.

### What are some potential uses for payment channels/micropayments?

* Rewarding users for specific actions they take, such as contributing content to a blog, or writing a review
* Incrementally purchasing a service offering, such as paying for additional storage use with [Storj](https://storj.io/)
* Buying in-game items with Counterparty-based games such as [Spells of Genesis](http://spellsofgenesis.com/) or [SaruTobi](https://itunes.apple.com/gb/app/sarutobi/id932194840?mt=8)
* Payments for other digital/virtual goods, such as a “contributor” badge on a forum
* Referral network payments
* Small/regular donations to charities, projects or individuals (such as musicians and writers of very neat open source software (_hint, hint!_))
* Enabling rental of Counterparty asset names

### Could payment channels be useful for any kind of transaction?

Theoretically, any Counterparty transaction could be sent in a payment channel. However, the technology is by far most appropriate for send transactions, where one would transfer a Counterparty asset much like one would transfer Bitcoin.

Payment channels don’t remove the need for on-chain transactions (and indeed, each payment channel is started from and ends with an on-chain transaction). Instead, they enable certain use-cases such as rapid incremental payments, and microtransactions.

### What is P2SH?

Most commonly in Bitcoin, transactions are made to a specific user’s public key hash (colloquially known as a Bitcoin address), and are spendable by that user’s corresponding private key.

With **“Pay-to-script-hash” (P2SH)**, transactions are sent to the hash of a “redeem script”, which is a special [Bitcoin script](https://en.bitcoin.it/wiki/Script) (e.g. a Bitcoin smart contract) that can be written to do a variety of things. To “execute” the script and operate on some or all of the sent funds, another party will broadcast an additional transaction that provides the original script content, along with any required signatures. 

The P2SH support implemented in Counterparty makes payment channels possible, as payment channels (and Lightning Network, for that matter) require the use of these redeem scripts to work. P2SH is also commonly used for multisignature transactions since the signing process is generally more compact and streamlined than the earlier method (“bare multisig”).

You can tell if a Bitcoin address is for a P2SH destination because it will start with ‘3’ on Bitcoin mainnet. Given this, you may notice that many exchanges, for instance, utilize these ‘3’ addresses for deposits. The redeem script in use with that is most definitely a multisig script of some kind, allowing secure, multi-party handling of deposited funds by the exchange.

### What are atomic swaps and OTC markets?

P2SH support, the same technology implemented in Counterparty that makes payment channels possible, also makes on-chain “atomic swaps” possible.

With an **atomic swap**, two parties perform a specific process that culminates with the broadcasting of a transaction on the blockchain that both parties have signed. As the word “atomic” would imply, the single transaction exchanges (or, “swaps”) some quantity of one asset from the first party, for some quantity of another asset from the other party, at all once. Thus, in a trade, for instance, neither party has to “go first” and trust the other party.

The use of atomic swaps can be useful to enable the use of things like **over the counter (OTC) markets** and **dark pools**. With either structure, a third party (often known as a bookrunner) would maintain a list of bids and offers between buyers and sellers of one asset for another, such as XCP and BTC. That list may be publically published, or not. Interested parties would contact the bookrunner and place buy and sell offers. The bookrunner would match buyers to sellers, who would then perform the trade themselves utilizing an atomic swap. Using this model, risk is greatly minimized, as the bookrunner does not have to hold any assets (and thus cannot run away with them).

The concept of an OTC market may sound antiquated but in reality they are a major boon to markets, especially for large holders who can then enter or exit a market or accumulate an asset without much price “slippage”, as would oftentimes occur on an exchange. In mainstream finance, OTC markets comprise over 40% of stock trading, as well as the vast majority of bond and derivative trading ([source 1](https://en.wikipedia.org/wiki/Over-the-counter_(finance)), [source 2](https://en.wikipedia.org/wiki/Derivatives_market)).

### How do I start using all of this technology?

This technology is all in various stages of development, with some of it being complete (P2SH, for instance) and some in very early states (such as Lightning Network support).

We will be publishing guides for users and developers as the respective technology becomes available and matures. Until that point, feel free to check out [the newest source code](https://github.com/CounterpartyXCP/counterparty-lib/tree/develop) and ask questions on #dev on [our official Slack chat](http://slack.counterparty.io/).
