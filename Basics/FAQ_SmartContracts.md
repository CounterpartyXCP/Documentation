Smart Contracts/EVM FAQ
====================

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

### I heard about The DAO hack. What was the problem?

The problem was not with a bug in the EVM, but a problem in how “The DAO” smart contract (which was holding > $100 million at the time worth of ETH tokens) was written. Basically, the DAO was written to allow “splitting”, where one or several holders in a DAO can separate off into their own DAO fund if they don’t like the proposals that their current DAO is voting on (more info [here](https://github.com/slockit/DAO/wiki/How-to-split-the-DAO)). This splitting functionality was poorly designed and implemented and had numerous issues in the code. “The attacker” took advantage of these issues to award himself more ETH than he was entitled to, therefore draining the DAO of funds.

So to reiterate, the vulnerability that occurred is due to these bugs in the DAO smart contract, not a security bug in the EVM itself. (Although the Solidity language design can and most likely will be improved to make such smart contract coding mistakes less possible in the future.)

### Can Ethereum smart contracts run on Counterparty?

Yes. Counterparty supports the same smart contract functionality that Ethereum does. There are a few minor tweaks (e.g. hardcoded addresses needing to change) but any Solidity or Serpent smart contract from Ethereum should be able to work on Counterparty with very little or no modification.

### Can smart contracts work with Bitcoin?

While Counterparty smart contracts can interact with any Counterparty asset, they cannot control or send Bitcoin. Using [BTC Relay](http://btcrelay.org/), they can peer into the Bitcoin blockchain and perform actions based on if a Bitcoin transaction exists and is valid.

### What languages can I use to write a smart contract?

We support both Solidity and Serpent.

### Can I use a counterparty asset in a smart contract?

Yes, smart contracts may hold and control any Counterparty asset, such as XCP, SJCX, CAKE, and more.

### What is used as Gas?

XCP is “burned” (destroyed) when smart contracts are executed, to essentially pay the network for their execution. However, unlike ETH, the supply of XCP is fixed. Due to this, for a given smart contract execution, the amount of XCP consumed will slowly decrease as the supply in existence shrinks. This will ensure that the amount of XCP never goes to zero.

### Are my Counterparty assets at risk of any issue with a smart contract?

Not if you don’t send those funds to the smart contract (which allows it to control the funds via its code).

Unlike with Ethereum, where smart contracts are a fundamental and required component of most any action beyond sending Ether, our system is designed so that our core feature-set is completely independent of any smart contract functionality. This means that anyone can use Counterparty’s well-tested asset creation, transfer and decentralized trading features without having to interact with or otherwise touch smart contracts. 

### What are the differences between the current EVM and the one announced in 2014?

In comparison to the [Proof-of-Concept EVM port](http://counterparty.io/news/counterparty-recreates-ethereums-smart-contract-platform-on-bitcoin/) carried out in late 2014, the current port:

* Is with the newest version of the EVM software that is successfully running on Ethereum today and, we believe mature enough for use on Counterparty/Bitcoin mainnet (with appropriate precautions)
* Adds the ability for smart contracts to interact with Counterparty assets
* Includes the EVM Safeguard feature (see below)

### What is this "EVM Safeguard" feature?

The EVM Safeguard is a “kill switch” for the EVM that is controlled by the community of XCP holders.

* With [XCP-based stake voting](https://github.com/CounterpartyXCP/cips/blob/master/cip-0005.md) being added to the protocol, we have solidified a plan for a community-driven “EVM SafeGuard” feature.
* Using this system, a significant to-be-determined percentage of XCP holders may at any time vote to deactivate the EVM. Such a vote will cause the Counterparty protocol itself to initiate a rapid shutdown of the EVM subsystem while the rest of the Counterparty network continues to function perfectly.
* At any time after that, a similar stake vote can re-enable the EVM system.
* This feature will soon be implemented into our EVM work.

### How will the Counterparty team deal with bugs in specific smart contracts?

On Counterparty, authors of smart contracts will be responsible for bugs in their contracts. In contrast to Ethereum, the Counterparty Foundation Board, with development team guidance, has passed a “non-rollback” amendment to the Bylaws. This policy forbids the Counterparty development team from publishing code to fork and/or roll-back the network as a response to bugs in specific smart contracts. (Where the fault is due to a bug in the underlying EVM -- and not any specific smart contract that runs on it -- the development team will of course write and publish bug fixes.) This action reiterates how Counterparty has been run for over two and a half years, and is in the same spirit of Bitcoin itself: completely decentralized, community-driven, and non-profit.

### Can you walk me through the process to create a smart contract on Counterparty?

We have a “getting started guide” coming soon.

### How do Smart Contracts “form a consensus” on Counterparty?

Smart contracts don’t form consensus. Every network participant just executes each contract in the same way (like a ‘send’ transaction). The consensus is formed with the blockchain determining which contracts exist and the order they are found in. As each network node has the same smart contract code, as well as the same protocol (“consensus sensitive”) code, that operates on them, the output from the execution of each smart contract call will be the same (as all code that executes is [deterministic](https://en.wikipedia.org/wiki/Deterministic_algorithm) in nature).

### What is a simple smart contract that I, as a non programmer, can create with some simple copy pasting?

* Ethereum has a "hello world" type tutorial [here](https://www.ethereum.org/greeter).
* Here are [some](https://medium.com/@AroundTheBlock_/a-current-list-of-use-cases-for-ethereum-b8caa5807553#.8a9vmfk12) [guides](http://cryptorials.io/a-beginners-guide-to-smart-contracts/) that discuss different use cases for smart contracts.
