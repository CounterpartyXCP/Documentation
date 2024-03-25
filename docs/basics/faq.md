---
title: Frequently Asked Questions
---

### Can I secure my XCP and Counterparty tokens in cold storage?

Yes. You can make a regular Bitcoin paper wallet and store them there. Later, you can sweep the funds into a Counterparty wallet.

### Is a 51% attack against Counterparty possible?

As every Counterparty transaction is a Bitcoin transaction, to do a "51% attack" on Counterparty you would have to do a 51% attack on Bitcoin.

### So can the Counterparty Team rewrite the Counterparty ledger’s history, in an emergency or by decree? How does that compare to the same risks with Bitcoin Core devs?

It’s identical to the case with Bitcoin. The Bitcoin core devs could publish a copy of Bitcoin Core that does anything, but no one would download it.

Counterparty is 100% open source, with [a list of code changes](https://github.com/CounterpartyXCP/counterparty-core/releases) from one release to the next visible for all to see and inspect.

### What about support for other blockchains instead of Bitcoin?

Counterparty is built on Bitcoin. That has always been the case and we do not see it changing, ever. For other blockchains, there are "forks" of the Counterparty software. Examples would be Dogeparty for Dogecoin, and Viacoin's ClearingHouse.

### What happens if and when `OP_RETURN` data is auto-pruned?

Counterparty only needs some Bitcoin full nodes somewhere to have an unpruned copy of the blockchain. As every Counterparty full node is also a Bitcoin full node, this is easily done.

### How are blockchain reorganizations ("reorgs") handled by Counterparty?

Blockchain reorganizations are essentially handled by Counterparty the same way they are handled by Bitcoin. The Counterparty database is log-structured. This means that Counterparty simply deletes all the database rows written after a certain block to execute a rollback, and then process new transactions on the now-longest chain.

### How can a thin client trustlessly lookup the Bitcoin public address associated with the OSTOCK asset name?

You can use a local copy of the blockchain just fine. The only difference between Counterparty and Bitcoin here is that Counterparty doesn't support SPV.
