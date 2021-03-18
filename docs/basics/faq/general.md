---
title: Frequently Asked Questions
---

### What is XCP?

XCP is the native token of Counterparty. It is a technical necessity for adding advanced features to Counterparty, which by nature require a protocol aware currency. Bitcoin can only be aware of BTC, while Counterparty can be aware of both BTC and XCP itself. This makes it possible to escrow funds, trade in a decentralized manner, and harness the full potential of programmable money.

*To learn more about XCP, see [about XCP](FAQ-XCP.md).*

### Can I secure my XCP and tokens in cold storage?

Yes. You can make a regular Bitcoin paper wallet and store them there. Later, you can sweep the funds into a Counterparty wallet, like Counterwallet.

Counterwallet also supports the use of Offline Armory. More info on that is [here](/UI/Counterwallet_Tutorials/create_armory_address.md).

### Is a 51% attack against Counterparty possible?

As every Counterparty transaction is a Bitcoin transaction, to do a "51% attack" on Counterparty you would have to do a 51% attack on Bitcoin.

### Besides a 51% attack, what are the other risks to consensus?

The Counterparty network could be effectively "forked" by a sizable number of people running different versions of the Counterparty client that had different "consensus sensitive code" (i.e. protocol code). In this case, if a transaction was read in from the Bitcoin client software, the differing code may cause two different interpretations of the data, and thus, two different ledger states.

As long as all participants run software that has the same protocol rules (even if it is different Counterparty client implementations), this situation will not happen. The reference client includes extensive safeguards that help detect and prevent this from happening.

That being said, [the Counterparty client](https://github.com/CounterpartyXCP/counterparty-lib) is completely open-source. Anyone is able to copy the code and make their own modifications. They can then run their modified version of the software, which technically may generate a different ledger than everyone else. This is similar to Bitcoin itself. However, to have any impact, that person would have to get others to run it, who would have to trust this individual more than they trust the Counterparty development team. This new ledger would not be "Counterparty". It would be a separate ledger with its own protocol rules. Services built on this ledger (such as a block explorer) would not agree with similar services built on the Counterparty ledger.

### So can the Counterparty Team rewrite the Counterparty ledger’s history, in an emergency or by decree? How does that compare to the same risks with Bitcoin Core devs?

It’s identical to the case with Bitcoin. The Bitcoin core devs could publish a copy of Bitcoin Core that does anything, but no one would download it.

Counterparty is 100% open source, with [a list of code changes](https://github.com/CounterpartyXCP/counterparty-lib/releases) from one release to the next visible for all to see and inspect.

### What about support for other blockchains instead of Bitcoin?

Counterparty is built on Bitcoin. That has always been the case and we do not see it changing, ever. For other blockchains, there are "forks" of the Counterparty software. Examples would be Dogeparty for Dogecoin, and Viacoin's ClearingHouse. We generally encourage forks on other blockchains, especially if they help contribute back bug fixes and enhancements to the main Counterparty codebase.

### What is Bitcoin fails or becomes co-opted?

In the event of a catastrophic failure of the Bitcoin network, Counterparty _does_ have the technical capability of "freezing" balances and migrating to another blockchain, like Litecoin for instance, with relative ease.

### What happens if and when OP_RETURN data is auto-pruned?

Counterparty only needs some Bitcoin full nodes somewhere to have an unpruned copy of the blockchain. As every Counterparty full node is also a Bitcoin full node, this is easily done.

### How are blockchain reorganizations ("reorgs") handled by Counterparty?

Blockchain reorganizations are essentially handled by Counterparty the same way they are handled by Bitcoin. If the Counterparty software detects that a reorganization has occurred, it will utilize an internal "undolog" to quickly undo (roll back) transactions up to the point of the chain branching, and then process new transactions on the now-longest chain.

### How can a thin client trustlessly lookup the Bitcoin public address associated with the OSTOCK asset name?

You can use a local copy of the blockchain just fine. The only difference between Counterparty and Bitcoin here is that Counterparty doesn’t support SPV. We’re working on solutions to this issue. Protocols like VerSum offer excellent models for untrusted verification here.