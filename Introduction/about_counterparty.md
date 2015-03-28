What is Counterparty?
=====================

**Counterparty is a peer-to-peer financial platform and a distributed, open-source protocol built on top of the Bitcoin blockchain and network. By encoding data and interacting with ordinary Bitcoin transactions, Counterparty expands the uses and features of Bitcoin in new and unprecedented ways.**

Pioneering in its field, the true innovation of [Bitcoin](http://en.wikipedia.org/wiki/Bitcoin) is making peer-to-peer transfer of currency available to anyone with an internet connection. But as many nascent technologies before it, Bitcoin only offers the technical foundation necessary to reach the full potential of programmable money. This becomes especially obvious when one considers that even the Internet had to evolve past simply transferring plaintext to break through into the mainstream. 

To address this, Counterparty was developed as an application layer secured by the full power of the Bitcoin network, while the underlying Bitcoin protocol itself stays exactly the same. Therefore, Counterparty has often been compared to the 'Hypertext Transfer Protocol' ([HTTP](http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol)), which exists as a layer on [TCP/IP](http://en.wikipedia.org/wiki/Internet_protocol_suite), and provides the foundation of the internet as we know it today. 

**Counterparty is:**

* a feature-complete toolkit for developing decentralized applications and financial instruments
* a method for proof-of-publication and proof-of-ownership with security of the Bitcoin blockchain 
* a system for creating and trading tokens without counterparty risk
* a decentralized exchange with algorithmic order matching
* _100% free, modular and extensible open-source software_

In accordance with Satoshi's philosophy, the Counterparty protocol was launched in January 2014 without raising any funds and began with functioning source code instead of hype. Initially, the core developers were anonymous. To learn more, read [about XCP](about_xcp.md).

One can think of Bitcoin as a road, which can be used to transport coins from A to B. To develop new features, one does not need to reinvent the wheel and rebuild the road. The better solution is to build better cars.

Counterparty has successfully ported Ethereum's smart contracts system onto the Bitcoin blockchain, pioneering the most feature complete solution for developing decentralized applications on the Bitcoin blockchain. Smart contracts are agreements (or applications) whose terms and conditions are upheld by the protocol itself, and do not require arbitration by a third-party to determine their outcome. These agreements are secured by the blockchain, and execute automatically without intermediation or any counterparty risk. 

Creating custom contracts and DApps on the Bitcoin blockchain is now possible using the same languages as Ethereum DApps, and the virtual machines are entirely cross-compatible. The smart contracts system is Turing-complete, offering limitless potential for building custom financial instruments, intelligent markets, organizations, games, and countless other creative uses. 

**The Counterparty platform consists of several components:**

* [counterparty-lib][] is the reference implementation of the Counterparty Protocol.

* [counterparty-cli][] is a command line interface for counterparty-lib.

* [counterparty-gui][] is a modular graphical interface for counterparty-lib.

* [Counterwallet][] is a secure web wallet with client-side logins and transaction signing. A hosted version is available [here](http://counterwallet.io).

* **[XCP](about_xcp.md)** is the native, deflationary token of the platform. It is a technical necessity, and forms a symbiosis with bitcoin. It is not designed to be a traditional currency per se, although it can be used as such if desired.  

**With Counterparty, users can:**

* Send assets (also known as tokens, coins, derivatives, or shares depending on the context) from any Bitcoin address to another

* Create numeric tokens 

* Create alphabetical tokens (_0.5 XCP anti-spam fee_)

* Issue additional units of their own assets (or lock them to prevent this)

* Pay distributions on assets using BTC, XCP, or other assets (e.g. dividends) (_0.002 XCP fee per recipient_)

* Trade XCP and assets on Counterparty's distributed exchange

* Broadcast textual and numeric data onto the Bitcoin blockchain (e.g. proof of publication)

* Make bets and derivatives on broadcasted data (_Using XCP_)

* Provably distribute ownership of assets through multi-signature support.

* Craft smart contracts and custom financial instruments using Turing-complete smart contracts scripting. (_XCP fees are required for each computational step._)

_Note: Counterparty features do not require the use of XCP unless explicitly stated._

For a more in-depth look at what you can do with Counterparty, see [Counterparty Features](counterparty_features.md).

How can I learn more?
=====================

You can read the [Frequently Asked Questions](FAQ.md) or take a look at the [User Tutorials](/Tutorials/User_Tutorials/counterwallet_manual.md). 

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
-   [Bitcointalk](https://bitcointalk.org/index.php?topic=3957610).

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
