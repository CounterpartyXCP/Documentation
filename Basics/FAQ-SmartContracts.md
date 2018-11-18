Smart Contracts/EVM FAQ
====================

**WARNING: this page is kept for historical purposes and does not represent the current state of counterparty. A new proposal is being built for a specific Counterparty VM.**

[TOC]

### What is a smart contract?

At the level of crypto-currencies, a smart contract is a computer program that is stored on a blockchain and specifies contractual terms, along with possessing the means to enforce those terms.

For more information, please see the following:

* [A gentle introduction to smart contracts](https://bitsonblocks.net/2016/02/01/a-gentle-introduction-to-smart-contracts/)
* [Smart contracts Wikipedia page](https://en.wikipedia.org/wiki/Smart_contract)
* [Nick Szabo’s writings on smart contracts](http://szabo.best.vwh.net/smart_contracts_idea.html)

### What is the EVM?

From the [Solidity Introduction to Smart Contracts](http://solidity.readthedocs.io/en/latest/introduction-to-smart-contracts.html):
> “The Ethereum Virtual Machine or EVM is the runtime environment for smart contracts in Ethereum. It is not only sandboxed but actually completely isolated, which means that code running inside the EVM has no access to network, filesystem or other processes. Smart contracts even have limited access to other smart contracts.”

The EVM is not a virtual machine like VMWare, instead it is a protected sandbox for smart contract execution.

### Can Ethereum smart contracts run on Counterparty?

Yes. Counterparty supports the same smart contract functionality that Ethereum does. There are a few minor tweaks (e.g. hardcoded addresses needing to change) but any Solidity or Serpent smart contract from Ethereum should be able to work on Counterparty with very little or no modification.

### What languages can I use to write a smart contract?

We support both Solidity and Serpent.

### How does it work at a high level?

* You write the smart contract code (using Solidity or Serpent) and compile it to a more compact form (bytecode)
* Counterparty will create and broadcast a `publish` transaction to embed this contract code into the Bitcoin blockchain. This is done in a way that is spendable and doesn't "pollute" the blockchain
* Once published, the smart contract "lives" at an address, which looks like a regular Bitcoin address, but starts with a `C`
* You can then use Counterparty to create and broadcast an `execute` transaction to call a specific function or method in the smart contract code
* Once an execution transaction is broadcast and confirmed by a Bitcoin miner, every running Counterparty node will receive this request, and execute that method. As the smart contract code executes, it modifies the contract state, which is stored in the Counterparty database. Since each Counterparty node has the same contract code (guaranteed by Bitcoin) as well as the same EVM code, and the code is all [deterministic](https://en.wikipedia.org/wiki/Deterministic_algorithm), these state changes are the same for every node
* Others can also send Counterparty assets to the smart contract, which will store them and can use them in future `execute` calls. This is useful for things like funding contracts, for instance
* Essentially, we see that the publishing of smart contracts and the command to kick off the execution of a specific function or method in a contract are made as actual transactions on the Bitcoin blockchain. Thus, these two operations are limited by Bitcoin's ~10 minute blocktimes. However, once an execution of smart contract code is kicked off, it generally runs as fast as the node can process it

### When will it be released on Bitcoin mainnet?

Basically, "When It Is Ready" (TM). A lot of it depends on how good of a job the community can do testing the EVM code on testnet. Nonetheless, we have an agressive timeschedule (within the guidance of prudent safety measures), and an interest to release as soon as we deem it ready. Realistically, we expect sometime in Autumn of this year (2016) for the mainnet release.

### Can I use a counterparty asset in a smart contract?

Yes, smart contracts may hold and control any Counterparty asset, such as XCP, SJCX, CAKE, and more.

### Can smart contracts work with Bitcoin?

While Counterparty smart contracts can interact with any Counterparty asset, they cannot control or send Bitcoin. Using [BTC Relay](http://btcrelay.org/), they can peer into the Bitcoin blockchain and perform actions based on if a Bitcoin transaction exists and is valid.

### What is used as Gas?

XCP is “burned” (destroyed) when smart contracts are executed, to essentially pay the network for their execution.

### Won't that cause deflation of the XCP supply?

Yes, as unlike ETH, the supply of XCP is fixed. However, this should not endanger the network itself: for a given smart contract execution, the amount of XCP consumed will slowly decrease as the supply in existence shrinks. This will ensure that the amount of XCP never goes to zero.

### How does Bitcoin’s 10 minute block time affect the EVM?

After a contract is written, it is "published" to the blockchain, which embeds its data in the blockchain, ensuring that all Counterparty nodes have the same contract code to execute. Once published, a method/function on a contract may then be executed.

Both the publishing operation, as well as any execution operations, are published as a Counterparty transaction (inside a Bitcoin transaction) and thus subject to the block time. However, once a contract executes, it will move from line of code to line of code as quickly as the host computer allows, and individual "steps" within a contract are not subject to block times. Nor is a contract executing another contract (via `CALL`) subject to the block times, and the called contract method (as well as any methods that it calls, and so on) execute immediately.

Thus, the block time limit is overall rather minor, and only affects the initial publishing and the initial execution of a contract method.

### Can payment channels be used with the EVM?

Not currently. With the EVM, when a contract’s "state" (i.e. storage data) is modified via an execution operation, all nodes on the Counterparty network must perform the operation at the same time. This is because all contract state must be identical and shared across all nodes.

Payment channels, on the other hand, are essentially a private negotiation between two parties, who, once they agree, will finalize their agreement on the blockchain. This is done via utilizing Bitcoin’s internal scripting language in a certain clever way (i.e. intentional non-broadcast double-spends). The EVM, on the other hand, relies on all nodes updating their state as a contract runs (i.e. no "private negotiations") and does not utilize Bitcoin script directly. Instead, all EVM operations are embedded inside Counterparty protocol data.

So while, technically, the parties could "negotiate" an EVM publish or execute operation, it would not yet be broadcast, and thus, not have any impact on the EVM’s global contract state.

This all being said, there are certain use cases where payment channels could possibly be used for EVM interactions: Two parties may be able to negotiate an execution statement for a contract that only they interact with, and has no interactions or "side effects" to or from other contracts. In this case, they would essentially "pre-run" the contract execution, independently verifying the resulting state changes, and trading modifications of the original execution statement via payment channel mechanics. Once they were both happy with the results, they would commit the finial execution statement to the blockchain, where it would be actually executed, by the network as a whole.

The last bit is rather interesting and is a possible direction for future research and development.

### How is this different than Rootstock?

* The Counterparty EVM will operate on Bitcoin mainnet, while Rootstock runs on a sidechain.
* Counterparty uses proven technology (i.e. embedded consensus) that has been in use for > 2.5 years on mainnet. Sidechains are very new and expirimental.
* Rootstock utilizes merged mining and federated pegs in their model. Both of these have a variety of possible issues with them.
* Counterparty is a non-profit effort, Rootstock is commercial (and indeed the commercial entity will be taxing a percentage of gas used to operate the network).
* On the positive side for Rootstock, their use of a sidechain (if successful) could lead to considerably higher transaction throughput than Bitcoin mainnet. However, if sidechains successfully work out, there’s no reason Counterparty can’t adopt them as well, using the same embedded consensus approach as on mainnet, with much faster block times.

### Why would an Ethereum developer develop on Counterparty?

We don't see this as an "either-or" type decision. With very little effort, Ethereum developers can port existing smart contracts to Counterparty, and extend their reach to not just the Ethereum community, but the Bitcoin community as well.

### I heard about The DAO hack. What was the problem?

The problem was not with a bug in the EVM, but a problem in how “The DAO” smart contract (which was holding > $100 million at the time worth of ETH tokens) was written. Basically, the DAO was written to allow “splitting”, where one or several holders in a DAO can separate off into their own DAO fund if they don’t like the proposals that their current DAO is voting on (more info [here](https://github.com/slockit/DAO/wiki/How-to-split-the-DAO)). This splitting functionality was poorly designed and implemented and had numerous issues in the code. “The attacker” took advantage of these issues to award himself more ETH than he was entitled to, therefore draining the DAO of funds.

So to reiterate, the vulnerability that occurred is due to these bugs in the DAO smart contract, not a security bug in the EVM itself. (Although the Solidity language design can and most likely will be improved to make such smart contract coding mistakes less possible in the future.)

### Are my Counterparty assets at risk of any issue with a smart contract?

Not if you don’t send those funds to the smart contract (which allows it to control the funds via its code).

Unlike with Ethereum, where smart contracts are a fundamental and required component of most any action beyond sending Ether, our system is designed so that our core feature-set is completely independent of any smart contract functionality. This means that anyone can use Counterparty’s well-tested asset creation, transfer and decentralized trading features without having to interact with or otherwise touch smart contracts.

### What are the differences between the current EVM and the one announced in 2014?

In comparison to the [Proof-of-Concept EVM port](http://counterparty.io/news/counterparty-recreates-ethereums-smart-contract-platform-on-bitcoin/) carried out in late 2014, the current port:

* Is with the newest version of the EVM software that is successfully running on Ethereum today and, we believe mature enough for use on Counterparty/Bitcoin mainnet (with appropriate precautions)
* Adds the ability for smart contracts to interact with Counterparty assets
* Includes the EVM Safeguard feature (see below)

### How will the Counterparty team deal with bugs in specific smart contracts?

On Counterparty, authors of smart contracts will be responsible for bugs in their contracts. In contrast to Ethereum, the Counterparty Foundation Board, with development team guidance, has passed a “non-rollback” amendment to the Bylaws. This policy forbids the Counterparty development team from publishing code to fork and/or roll-back the network as a response to bugs in specific smart contracts. (Where the fault is due to a bug in the underlying EVM -- and not any specific smart contract that runs on it -- the development team will of course write and publish bug fixes.) This action reiterates how Counterparty has been run for over two and a half years, and is in the same spirit of Bitcoin itself: completely decentralized, community-driven, and non-profit.

### Can you walk me through the process to create a smart contract on Counterparty?

We have a “getting started guide” coming soon.

### How do Smart Contracts “form a consensus” on Counterparty?

Smart contracts don’t form consensus. Every network participant just executes each contract in the same way (like a ‘send’ transaction). The consensus is formed with the blockchain determining which contracts exist and the order they are found in. As each network node has the same smart contract code, as well as the same protocol (“consensus sensitive”) code, that operates on them, the output from the execution of each smart contract call will be the same (as all code that executes is [deterministic](https://en.wikipedia.org/wiki/Deterministic_algorithm) in nature).

### What is a simple smart contract that I, as a non programmer, can create with some simple copy pasting?

* Ethereum has a "hello world" type tutorial [here](https://www.ethereum.org/greeter).
* Here are [some](https://medium.com/@AroundTheBlock_/a-current-list-of-use-cases-for-ethereum-b8caa5807553#.8a9vmfk12) [guides](http://cryptorials.io/a-beginners-guide-to-smart-contracts/) that discuss different use cases for smart contracts.
