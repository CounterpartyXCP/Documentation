Counterwallet
=============

[Counterwallet Release Documentation](https://github.com/CounterpartyXCP/counterwallet/releases)

Features and Specifications
---------------------------

### Functional Features

-  Supports BTC, XCP and all Counterparty assets
-  Create and manage new assets (tokens) on the Bitcoin blockchain
-  Distribute profits to asset holders using BTC, XCP, or any other
   Counterparty currency
-  Broadcast data feeds to the Bitcoin network
-  Trade XCP for any Counterparty asset (peer-to-peer)
-  Access P2P derivatives with no middleman, and no counterparty risk
-  Monitor the Counterparty network statistics
-  Strong privacy - no registration required; you can run your own
   Counterwallet
- Chat with other Counterwallet users
-  Multilingual (English, Chinese, Russian and other languages) -
   [become a translator!](https://www.transifex.com/organization/counterparty/dashboard/counterwallet)


### Technical Features and Specifications

-  Deterministic hierarchical wallet
-  Supports desktop and mobile browsers
-  Client-side authentication/encryption
-  Cold storage support (with Armory)
-  Multi-sig support (up to 3-of-3)
-  Watch-only addresses

Localization and Translation
----------------------------

Counterwallet has been translated into several languages. However, new
strings get added periodically, which means that existing languages need to be kept up to date. New translators and reviewers are welcome to join our project on Transifex.

### How to enable language translations in Counterwallet

-  Install Federated Node (or standalone Counterwallet, if you know
   how.)
-  Create (or edit, if it exists) ``counterwallet.conf.json`` (default
   location: ``/home/xcp/counterwallet``) and enable desired languages.
   A translation-related segment of this configuration file can be found
   [here](https://github.com/CounterpartyXCP/counterwallet/blob/develop/counterwallet.conf.json.example). Note that the example is not a complete settings file. Other
   settings can be found in Federated Node documentation. Without
   non-default languages enabled, only English is be available.
-  You may need to download translation files from Transifex, either
   manually or by using the Transifex client. If you enabled other
   languages but Counterwallet is not showing the little flags, then in
   Counterwallet 1.6.0 installed on Federated Node that can be
   accomplished from under ``/home/xcp/counterwallet`` like so:

>     sudo su -s /bin/bash -c 'grunt transifex --force' xcp
>     Running "transifex:languages" (transifex) task
>     Download (sic!) translations from transifex
>     ...

   Then empty your browser cache and try again.

#### Known Issues

-  Some parts of the GUI are available only in English. This could be caused by
   3rd party components that only support English or
   may be a consequence of a translation falling behind the
   English original. If you can confirm it’s the latter, please help us
   out or submit a bug report.
-  Numbering formats are not internationalized to reduce confusion
