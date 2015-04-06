Counterwallet FAQ
==================

[TOC]

## What is Counterwallet?

**Counterwallet is an open-source web wallet for Bitcoin (BTC) and [Counterparty](https://github.com/CounterpartyXCP/) (XCP), the world’s first protocol for decentralized financial tools. It is built using Javascript, Bitcoin libraries and Counterparty software.**

* Counterwallet handles transaction signing locally, which means your passphrase and private keys never leave your browser. 

* Additional security features such as m-of-n (max 3) multi-signature addresses, watch-only, and [Armory](/Tutorials/User_Tutorials/create_armory_address.md) addresses are also natively supported.

* All trades and actions made with Counterwallet use a secure automatic escrow system within the Bitcoin blockchain, which means that unlike centralized exchanges, _no middleman is ever required_.

**Counterwallet is being actively developed and currently implements many current Counterparty features.**

- Fully functional wallet for BTC, XCP, and user-created tokens
- Peer-to-peer asset trading with algorithmic order matching (XCP, other assets)
- Custom asset creation
- Betting
- Broadcasting data on the Bitcoin Blockchain

## Where can I access it?

Counterwallet (CW) hosted by the Counterparty project is available at [Counterwallet.io](https://counterwallet.io/). However, because Counterwallet source code is [open source](https://github.com/CounterpartyXCP/counterwallet/), anyone can host and alter their own instance of Counterwallet. Those instances, however, are not under control of Counterparty.io, so it is up to the user to assess reliability and trustworthiness of the host. Any geographic restrictions and other limitations of Counterwallet can be disabled at the user's own peril.

If you are having trouble accessing CW, try one of the individual servers. Although keep in mind that it is possible that they are down for maintenance:

* https://cw01.counterwallet.io/#

* https://cw02.counterwallet.io/#

* https://cw03.counterwallet.io/#

## What is an Asset/Token/Coin? How can I store them?

Assets (also known as tokens or coins) are user-created currencies that are stored inside the Bitcoin blockchain using Counterparty technology. Anyone can create their own. 

All Counterwallet addresses are regular Bitcoin addresses. You can store BTC, XCP, and user created assets on any Counterwallet address. In fact, you can store any of these currencies on any regular Bitcoin address as well, provided that you have access to the private key of that address.

(Altcoins that have their own blockchain, which is seperate from the Bitcoin blockchain, are not supported.)

## I want to trade a certain asset, is it legitimate?

Assets/tokens are issued on the Bitcoin blockchain directly. This means that anyone with access to the internet is able to create and trade tokens freely without restrictions. There is no way to block Bitcoin addresses and transactions, which means that there is also no way to limit any Counterparty activity. We recommend significant due diligence and research before trading. Counterwallet does not filter any assets. Please check the official website of whatever asset/token you are planning to trade, and make sure to verify that it is legitimate. 

## Is Counterwallet down?

Counterparty health status monitor is available [here](http://status-backend.counterparty.io/). Should the server you're connecting to be unresponsive or time out, you can try to directly access another of "cw" servers from this page. Counterwallet.io is a multi-server cluster so if one node is down it is likely that others may be up. It is also possible that Counterwallet is being updated, as it is constantly undergoing development.

## Counterwallet is offline. Can I still access my funds?

Yes, and your orders and assets are still there*. You can mathematically generate your public and private keys using your passphrase. Since the addresses are generated on the fly using JavaScript, it is possible to do this in your own browser (even offline). You can use [this tool](https://blockscan.com/tool_generatekey). 

* The Counterparty exchange is actually part of the Bitcoin blockchain. This means that Bitcoin itself would have to be shut down entirely in order for it to go offline.

## How does Counterwallet make profit?

It doesn't! Counterwallet development is a public service to the Counterparty and Bitcoin community. If you would like to contribute, you can click the donate button within Counterwallet itself. Or you can fork [the code](https://github.com/CounterpartyXCP/counterwallet/) and contribute that way.

## Can I try Counterwallet on testnet?

Yes, you can test Counterwallet by using a testnet instance located at [testnet.counterwallet.io](https://testnet.counterwallet.io/). Once you log on, get some testnet Counterparty tokens from the faucet as explained on the welcome page.

## Can I use Counterwallet with Armory?

Sure.

Add an address in an offline armory wallet, [here's how](https://bitcoinarmory.com/about/using-our-wallet/)
to your Counterwallet, and do something with the address (like send some XCP from that address), which will produce the armory unsigned transaction text. Copy it to a USB key, take it to your offline computer running Armory (which has the private keys), sign it on that computer via the Armory GUI, and then broadcast the signed transaction back in Counterwallet.

This will make use of assets owned in this address very secure... Basically Armory will act as cold storage of Counterparty assets, with almost the usability of a hot wallet.

## I logged in and my address is different, and I have no balance! Help!

Please see [missing balance](no_balance.md)

## I sent funds to a crowdsale vending machine, why didn’t they show up?


## I sent BTC to Counterwallet, why doesn't it show up?
  
    
## Why do I need small amounts of Bitcoin to do things in Counterwallet?

Counterparty builds directly on top of the Bitcoin network, and every Counterparty transaction is a Bitcoin transaction as well. This means that Counterparty transactions are the same as as Bitcoin transactions, with some information attached. 

Because of this, Counterparty transactions must pay a small BTC fee to the Bitcoin miners for each transaction sent. Beyond being a sign of our commitment to the health of the Bitcoin network, this allows Counterparty transactions to be given a high priority and be confirmed quickly.

If speed of confirmation is not as important to you as the fee amount paid, note that it is possible to have lower fees in Counterparty, especially involving bulk sends. This functionality will also be coming to Counterwallet as well.

## Does Counterwallet support two-factor authentication?

Currently, no. But you can create multi-signature addresses.

## What else do I need to know?

- All encryption is handled client-side. Neither your passphrase nor any of your private information ever leaves your browser. This also means that there is no password recovery, so make sure you do not lose your passphrase

- Because Counterwallet does not store your credentials, it has no access to your information.

- Because of the US government regulations, betting functionality is limited to non-US-based client IP addresses by default. This is not a limitation of the protocol itself.

## I want to translate Counterwallet to my language

Translations are hosted at [Transifex](https://www.transifex.com/organization/counterparty/dashboard/counterwallet). Open an account (or login with Github) and contribute as a translator or reviewer. We appreciate any contributions.
