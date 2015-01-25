Counterwallet FAQ
==================

Counterwallet is a web-wallet for Counterparty, the world’s first protocol for decentralized financial tools. All transactions made with Counterwallet use an automatic escrow system to keep them secure, with no middleman required.

Counterwallet is being actively developed and currently implements most of Counterparty features.

Fully functional wallet for Counterparty (XCP) and bitcoin (BTC) tokens

- Distributed exchange
- Asset trading (XCP, other assets)
- Betting
- Gaming

Where can I access it?
--------------------------

Counterwallet hosted by the Counterparty project is available at [Counterwallet.io] (https://counterwallet.io/). Because Counterwallet source code is [open source](https://github.com/CounterpartyXCP/counterwallet/), anyone can host their own instance of Counterwallet. Those instances, however, are not under control of Counterparty.io, so it is up to the user to assess reliability and trustworthiness of the host.

Is Counterwallet down?
-----------------------

Counterparty health status monitor is available [here] (http://status-backend.counterparty.io/). Should the server you're connecting to be unresponsive or time out, you can try to directly access another of "cw" servers from this page. Counterwallet.io is a multi-server cluster so if one node is down it is likely that others may be up.

Can I try Counterwallet on testnet?
------------------------------------------

Yes, you can test Counterwallet by using a testnet instance located at [testnet.counterwallet.io](https://testnet.counterwallet.io/). Once you log on, get some testnet Counterparty tokens from the faucet as explained on the welcome page.

Can I use Counterwallet with Armory?
------------------------------------------

Sure.

Add an address in an offline armory wallet, [here's how](https://bitcoinarmory.com/about/using-our-wallet/)
to your Counterwallet, and do something with the address (like send some XCP from that address), which will produce the armory unsigned transaction text. Copy it to a USB key, take it to your offline computer running Armory (which has the private keys), sign it on that computer via the Armory GUI, and then broadcast the signed transaction back in Counterwallet.

This will make use of assets owned in this address very secure... Basically Armory will act as cold storage of Counterparty assets, with almost the usability of a hot wallet.

What else do I need to know?
------------------------------

- All encryption is handled client-side. Neither your passphrase nor any of your private information ever leaves your browser. This also means that there is no password recovery, so make sure you do not lose your password.
- Because Counterwallet does not store your credentials, it has no access to your information if/when you are not logged in. If you log off or close your browser, any pending orders on the distributed exchange may not execute and you will have to resubmit your order and pay another transaction fee required for the underlying bitcoin transaction processing.
- Because of the US government regulations the betting functionality is limited to non-US-based client IP addresses.

I want to translate Counterwallet to my language
-------------------------------------------------

Translation is hosted at [Transifex](https://www.transifex.com/organization/counterparty/dashboard/counterwallet). Open an account (or login with
Github) and contribute as a translator or reviewer.
