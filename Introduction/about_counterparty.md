What is Counterparty?
=====================

**Counterparty is a peer-to-peer financial platform and a distributed, open-source Internet protocol built on top of the Bitcoin blockchain and network. By encoding data in ordinary Bitcoin transactions, Counterparty expands the uses and features of Bitcoin in new and unprecedented ways.**

While Bitcoin has made fully peer-to-peer transfer of value available to anyone with an internet connection, it is clear that global finance requires more than the ability to send coins from A to B. Consider, for example, that the internet only reached the mainstream after it evolved far beyond the transfer of basic data, and additional protocol layers were developed. 

And because Counterparty is an additional layer on top of the Bitcoin network, it has often been compared to the 'Hypertext Transfer Protocol' ([HTTP](http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol)), which exists as a layer on [TCP/IP](http://en.wikipedia.org/wiki/Internet_protocol_suite), and provides the foundation of the internet as we know it today. On the same note, Counterparty adds valuable new features secured by the full power of the Bitcoin network, while the Bitcoin protocol itself stays exactly the same.  

Besides providing users with the world’s first functioning decentralized exchange, as well as the ability to create virtual assets, issue dividends, create price feeds and bets, Counterparty enables anyone to create smart contracts on the Bitcoin blockchain. Smart contracts are agreements whose terms and conditions are digitized, and do not require arbitration by a third-party to determine their outcome, but instead are executed automatically, with no intermediation. Counterparty's built-in Turing-complete scripting language allows anyone to create custom smart contracts and execute their code on the Bitcoin blockchain.

**The Counterparty platform consists of several components:**

* [counterparty-lib][] is the reference implementation of the Counterparty Protocol.

* [counterparty-cli][] is a command line interface for counterparty-lib.

* [counterparty-gui][] is a modular graphical interface for counterparty-lib.

* [Counterwallet][] is a secure web wallet with client-side logins and transaction signing. A hosted version is available [here](http://counterwallet.io).

* **XCP** is the native, deflationary token of the platform. 

XCP exists as a technical necessity for advanced Counterparty features, is **not** a competitor of Bitcoin, and in fact cannot exist without it. It is not designed to be a traditional currency (for purchasing products or services), although it can easily be used as such.

XCP is the fuel of smart contracts, as each execution step in a contract requires a fee. Spam fees for distribution payments and registering token names, are also paid in XCP. However, all XCP fees are _burned_, which means they are taken out of circulation permanently. The increasing rarity of XCP thereby provides a benefit to all holders thereof, instead of any specific group or individual.

XCP cannot be mined, staked or otherwise created. The initial supply of XCP was established in a process called proof-of-burn. From Jan 2nd to Feb 3rd 2014, users were able to send Bitcoins to a verifiably unspendable Bitcoin address and automatically receive XCP in return from the protocol. 

A total of ~2125 BTC was destroyed, and a total of ~2,649,791 XCP was created. This can be verified using a block explorer, for example on [Blockscan](http://blockscan.com/burn). No new XCP can _ever_ be created, and the supply is decreasing with each paid fee. To prevent a complete depletion of the supply, the fees for smart contracts are a fraction of the total supply. This means the supply will continue to reduce, but cannot ever reach zero. 

**With Counterparty, users can:**

* Send assets (also known as tokens, coins, derivatives, or shares depending on the context) from any Bitcoin address to another

* Create assets (numeric or alphabetical)

* Issue additional units of their own assets (or lock them to prevent this)

* Pay distributions on assets using BTC, XCP, or other assets (e.g. dividends)

* Trade XCP and assets on Counterparty's distributed exchange

* Broadcast textual and numeric data onto the Bitcoin blockchain

* Make bets and derivatives on broadcasted data

* Provably distribute ownership of assets through multi-signature support.

* Take advantage of turing-complete scripting to craft smart contracts and financial instruments.

How can I learn more?
=====================

**For example, you could start by reading our [Frequently Asked Questions](FAQ.md) or taking a look at our [User Tutorials](/Tutorials/User_Tutorials/counterwallet_manual.md).**

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
