What is Counterparty?
=====================

**Counterparty is a peer-to-peer financial platform and a distributed, open-source Internet protocol built on top of the Bitcoin blockchain and network. By encoding data in ordinary Bitcoin transactions, Counterparty expands the uses and features of Bitcoin in new and unprecedented ways.**

Bitcoin has made fully peer-to-peer transfer of value available to anyone with an internet connection. But it became clear that global finance required more than the ability to transfer from A to B. Which makes sense, considering that even the internet itself had to evolve beyond this limitation to reach the mainstream.

And because Counterparty is an additional layer on top of the Bitcoin network, it has often been compared to the 'Hypertext Transfer Protocol' ([HTTP](http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol)), which exists as a layer on [TCP/IP](http://en.wikipedia.org/wiki/Internet_protocol_suite), and provides the foundation of the internet as we know it today. Similarily, Counterparty adds valuable new features that are secured by the full power of the Bitcoin network, while the Bitcoin protocol itself stays exactly the same.  

With the recent addition of programmable money (smart contracts), Counterparty has become the most feature complete DApp toolkit on the Bitcoin blockchain.

Smart contracts are agreements whose terms and conditions are upheld by the protocol itself, and do not require arbitration by a third-party to determine their outcome. These agreements are secured by the blockchain, and execute automatically with no intermediation. Creating custom contracts and DApps on the Bitcoin blockchain is now possible using the same languages as Ethereum, and code is cross-compatible. 

The smart contracts system is Turing-complete, creating limitless potential for custom financial instruments, intelligent markets, and decentralized applications. 

Counterparty has successfully ported Ethereum's smart contracts system onto the Bitcoin blockchain, making cross-platform compatible development effortless.

**The Counterparty platform consists of several components:**

* [counterparty-lib][] is the reference implementation of the Counterparty Protocol.

* [counterparty-cli][] is a command line interface for counterparty-lib.

* [counterparty-gui][] is a modular graphical interface for counterparty-lib.

* [Counterwallet][] is a secure web wallet with client-side logins and transaction signing. A hosted version is available [here](http://counterwallet.io).

* **[XCP](about_xcp.md)** is the native, deflationary token of the platform. 

**With Counterparty, users can:**

_Note: The following features do not require users to own, or even know about XCP, unless explicitly stated._

* Send assets (also known as tokens, coins, derivatives, or shares depending on the context) from any Bitcoin address to another

* Create numeric tokens 

* Create alphabetical tokens (_0.5 XCP anti-spam fee_)

* Issue additional units of their own assets (or lock them to prevent this)

* Pay distributions on assets using BTC, XCP, or other assets (e.g. dividends) (_0.002 XCP fee per recipient_)

* Trade XCP and assets on Counterparty's distributed exchange

* Broadcast textual and numeric data onto the Bitcoin blockchain

* Make bets and derivatives on broadcasted data (_Using XCP_)

* Provably distribute ownership of assets through multi-signature support.

* Craft smart contracts and custom financial instruments using Turing-complete smart contracts scripting. (_XCP fees are required for each computational step._)

How can I learn more?
=====================

For a more in-depth look, see [Counterparty Features](counterparty_features.md).

Read the [Frequently Asked Questions](FAQ.md) or take a look at the [User Tutorials](/Tutorials/User_Tutorials/counterwallet_manual.md). 

**Here are some other ways to get involved:**

***Social Media***

-   Follow us on [Twitter][], [Facebook][], [Google+][] and
[LinkedIn][].
-   Become a member of our [Official Forum](https://forums.counterparty.io/).
-   Join our official chat: [End Users/General][] & [Developers/Technical][]
-   Receive updates via email: Counterparty currently has two free,
low-volume mailing lists (Community & Developer). [Subscribe
now!][]

***External sites with information about Counterparty***

-   [Counterparty Foundation](http://counterpartyfoundation.org)
-   [Coinmarketcap.com][] - XCP price, volumes, 24h average, and a list of exchanges
-   [Counterparty on Wikipedia][]
-   [Blockscan Block Explorer](http://blockscan.com)

  [Twitter]: https://twitter.com/CounterpartyXCP
  [Facebook]: https://www.facebook.com/CounterpartyXCP
  [Google+]: https://plus.google.com/u/0/b/116178666129262850551/+CounterpartyIoXCP/posts
  [LinkedIn]: https://www.linkedin.com/company/3644957
  [End Users/General]: http://gitter.im/CounterpartyXCP/General
  [Developers/Technical]: http://gitter.im/CounterpartyXCP/Technical
  [Subscribe now!]: http://counterparty.us9.list-manage.com/subscribe/post?u=670b494916e05d6d2cfaa5206&id=cdae97fc90
  [Coinmarketcap.com]: http://coinmarketcap.com/currencies/counterparty/
  [Counterparty on Wikipedia]: https://en.wikipedia.org/wiki/Counterparty_(technology)


***Repositories***

-   [Github][]
    -   [counterparty-lib][] - Reference implementation of the Counterparty protocol
    -   [counterparty-cli][] - Command-line Interface for counterparty-lib
    -   [counterparty-gui][] - Counterparty GUI (OS X and Windows)
    -   [Counterwallet][] - Web wallet
    -   [counterblock][] - Provides extended API services to Counterwallet, as well as Counterparty 3rd-party applications
    -   [federatednode_build](https://github.com/CounterpartyXCP/federatednode_build) - Federated Node Build System

[Github]: https://github.com/CounterpartyXCP
[counterparty-lib]: https://github.com/CounterpartyXCP/counterpartyd
[counterparty-cli]: https://github.com/CounterpartyXCP/counterparty-cli
[counterparty-gui]: https://github.com/CounterpartyXCP/counterparty-gui
[counterblock]: https://github.com/CounterpartyXCP/counterblock
[Counterwallet]: https://github.com/CounterpartyXCP/counterwallet
