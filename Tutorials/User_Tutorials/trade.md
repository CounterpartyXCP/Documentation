Trading on the Decentralized Exchange
---------------------------

It is possible to trade on the Counterparty decentralized exchange directly inside Counterwallet. You can trade any token against any other token, including XCP. (Trading against BTC is planned for the near future.)

**Important:** But before you begin, please be aware this exchange inside Counterwallet is actually an interface to the Bitcoin network. This means that all tokens, buy, and sell orders are _all_ actually individual Bitcoin transactions. These transactions are then order matched by the protocol. This means that:

* **All buy and sell orders are automatically escrowed _in the Bitcoin blockchain_ itself until they are completed.** The Counterparty exchange is decentralized and peer-to-peer. This means that there is never a third party or middleman (such as a server administrator, traditional exchange, clearing house, or bank). This kind of trading is called 'trustless', because you do not have to trust anyone to handle your funds and complete your trade correctly.

* Placing and cancelling orders requires the Bitcoin network to confirm these transactions, which may take some time.

* Each action requires a basic transaction fee (like any other regular Bitcoin transaction.)

* Some Counterwallet features may be restricted due to regulatory uncertainty in certain countries. This does not mean that they are disabled in the decentralized exchange. These features are simply hidden from the user interface by default to avoid legal issues. Like Bitcoin, Counterparty exists without international borders. So it is absolutely possible to use _any_ of the features in _any_ country by running your own copy of Counterwallet or Counterparty-cli, but please make 100% sure you are operating within the law before attempting this.

**Disclaimer:** 
All Counterwallet (and therefore Counterparty) actions are Bitcoin transactions. And because anyone can make a Bitcoin transaction, anyone can create a decentralized token. If this concept seems confusing, consider that Bitcoin functions entirely without a central bank. This is an identical 'free-for-all' scenario. It is _fundamentally_ impossible to have an 'owner' and or 'admins' at such an exchange. Escrowed funds are provably inaccessible until peer-to-peer orders are successfully matched, and all completed orders are irreversible.

Counterparty (the open-source Bitcoin toolkit for financial instruments and markets) itself cannot distinguish whether tokens are legitimate, so please ensure due diligence before trading. Always research the official website of the token you are trading, its page on [Blockscan](http://blockscan.com) and (if applicable) its thread on [Bitcointalk](http://bitcointalk.org). 

### Trading Basics

Click **Exchange** `->` **Markets on the sidebar menu.**

![](/_images/trade1.png)

You will see the pairs with the most current activity. Clicking on these will forward you to their orderbook.

![](/_images/trade2.png)

You can also specify a custom token to trade, if it does not appear in the top pairs list. If you want to trade a token you have just created, you need have to wait until it has been verified by the Bitcoin blockchain first.)

![](/_images/trade3.png)

Simply write your token in the field (autocomplete will try to help) and click XCP or other. Most tokens are primarily traded against XCP, but you can trade absolutely any token. 

![](/_images/trade4.png)

![](/_images/trade5.png)

![](/_images/trade6.png)

![](/_images/trade7.png)

![](/_images/trade8.png)

![](/_images/trade9.png)

![](/_images/trade10.png)
