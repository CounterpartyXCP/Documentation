---
title: FAQ
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


### What Counterparty wallet should I use?

The list of Counterparty wallets currently available may be found here on the [official project page](https://www.counterparty.io/#wallets).


### What is “Counterparty 2.0”?

“Counterparty 2.0” is an affectionate term that the community has given to the revival of the Counterparty project this year, and specifically the development of a number of long-awaited, major new features such as UTXO Support, Atomic Swaps with Bitcoin, Fair Minting and (the forthcoming) AMMs/LPs. “Counterparty 2.0” doesn’t refer to any particular version of Counterparty.


### Did Counterparty recently fork?

Protocol upgrades are a normal part of the evolution of the Counterparty protocol, and there have been [dozens](https://github.com/CounterpartyXCP/counterparty-core/blob/master/counterparty-core/counterpartycore/protocol_changes.json) throughout its history. The developer of Freewallet and Tokenscan has published versions of those applications which run on top of an old version of Counterparty (v9.61.3—the last version that he contributed to), rather than the latest version of Counterparty (currently [v10.6.1](https://github.com/CounterpartyXCP/counterparty-core/releases/tag/v10.6.1)). Every other node host has upgraded to the latest release of Counterparty and offers no support for out-of-date versions. A list of services that have upgraded is as follows:

- Dex-Trade 
- Zaif
- Horizon Wallet 
- RarepepeWallet 
- Pepe.wtf 
- OpenSea 
- Firemints.xyz 
- Horizon Explorer 
- Memepool 
- XCP.io 
- Pepe.wtf 
- XCPDex 
- XCPNinja 
- Emblem Vault 
- Spells of Genesis 
- Bitcoin Stamps


### Is it safe to use Counterparty?

Yes, as long as you use tooling that supports the latest version of Counterparty, there’s no risk.


### What happened to Counterwallet?

Counterwallet has unfortunately not been actively maintained in a number of years (see below). A bug was introduced into Counterparty last year (in [v9.61.1](https://github.com/CounterpartyXCP/counterparty-core/issues/1294)) which broke the Counterblock service that Counterwallet depends on. This bug was fixed in [Counterparty Core v10.0.0](https://github.com/CounterpartyXCP/counterparty-core/releases/tag/v10.0.0), however—as is often the case—when old software goes down, sometimes it doesn’t come back up. The community has since spent its energy on the creation of a new generation of wallets rather than attempt to revive Counterblock and Counterwallet. However, [the code is all open-source](https://github.com/CounterpartyXCP/counterwallet) and anyone is free to work on it.


### What is the “origin” functionality that was recently lost?

Part of the protocol change that was implemented in [Counterparty Core v10.4.0](https://github.com/CounterpartyXCP/counterparty-core/releases/tag/v10.4.0) fixed two critical bugs in the design of dispensers. One of these fixes required the removal of *the ability for someone to open dispensers at an empty address that they don't own*. Per the [protocol spec published in August](https://docs.counterparty.io/docs/advanced/specifications/dispenser-must-be-created-by-source/), this change was necessary for two main reasons:

1. It resolves a critical security vulnerability whereby one user could force others to sell assets (e.g. illicit material) without their consent.

2. It allows for the elimination of the AddrIndexRs dependency for Counterparty Core. This piece of middleware is source of major stability, scalability and correctness issues in the node software. Removing AddrIndexRs makes Counterparty nodes dramatically faster and easier to deploy, and it shrinks the node storage requirements from around 250 GB to around 45 GB.

Even with this protocol change, users can of course still open dispensers at empty addresses, it simply requires two transactions (send asset \+ BTC; open dispenser), which may be chained together. In effect, this doubles the Bitcoin transaction fee. The other new limitation is that it is no longer possible to open a dispenser at a cold wallet without actually *using* the cold wallet (with a second transaction). [Community consensus](https://github.com/CounterpartyXCP/counterparty-core/issues/1785) was that these trade-offs were perfectly reasonable given the severity of the problem. Moreover, the increase in transaction fees is temporary. There is already a [popular proposal for changing the Counterparty transaction format](https://github.com/CounterpartyXCP/counterparty-core/issues/2197) to allow for the bundling of multiple Counterparty transactions together in a single Bitcoin transaction. In addition, with [the adoption of modern data storage methods](https://github.com/CounterpartyXCP/counterparty-core/issues/1375), it will soon be able to dramatically reduce tx fees in the future (by around 75%). For any node host, the savings in storage costs from eliminating AddrIndexRs will easily outweigh the temporary increase in tx fees.
