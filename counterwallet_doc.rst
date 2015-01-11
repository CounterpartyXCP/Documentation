Counterwallet
=============

Meta Book
-----------

The Counterparty Meta Book is a set of links to existing material
condensed in single place.

-  Chapter 1: What is it and how do I get started?

   -  `How to buy XCP and Counterparty-listed tokens/assets`_

-  Chapter 2: Common operations

   -  Send, receive
   -  Issuance and dividends
   -  Trading on the Counterparty Distributed Exchange
   -  Betting (non-US users only)

-  Chapter 3: Security, backup, migration

   -  Pass phrases and Easy Access URLs
   -  Security and Best Practices
   -  Backup, migration, export/import

-  Chapter 4: Support and Troubleshooting

   -  Getting support
   -  Troubleshooting

Features and Specifications
---------------------------

Functional Features
~~~~~~~~~~~~~~~~~~~

-  Supports BTC, XCP and all Counterparty assets
-  Create and manage new assets (tokens) on the Bitcoin blockchain
-  Distribute profits to asset holders using BTC, XCP, or any other
   Counterparty currency
-  Broadcast data feeds to the Bitcoin network
-  Trade XCP for any Counterparty asset
-  Access P2P derivatives with no middleman, and no counterparty risk
-  Monitor the Counterparty network statistics
-  Strong privacy - no registration required; you can run your own
   Counterwallet
-  Multilingual (English, Chinese, Russian and other languages) -
   `become a translator!`_

Technical Features and Specifications
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

-  Deterministic hierarchical wallet
-  Supports desktop and mobile browsers
-  Client-side authentication/encryption
-  Cold storage support (with Armory)
-  Multi-sig support (up to 3-of-3)

Localization and Translation
----------------------------

Counterwallet has been translated into several languages, but new
strings get added periodically so existing languages need to be kept up
to date while new need translators and reviewers.

How to enable language translations in Counterwallet
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

-  Install Federated Node (or standalone Counterwallet, if you know
   how.)
-  Create (or edit, if it exists) ``counterwallet.conf.json`` (default
   location: ``/home/xcp/counterwallet``) and enable desired languages.
   A translation-related segment of this configuration file can be found
   `here`_. Note that the example is not a complete settings file. Other
   settings can be found in Federated Node documentation. Without
   non-default languages enabled, only English is be available.
-  You may need to download translation files from Transifex, either
   manually or by using the Transifex client. If you enabled other
   languages but Counterwallet is not showing the little flags, then in
   Counterwallet 1.6.0 installed on Federated Node that can be
   accomplished from under ``/home/xcp/counterwallet`` like so:

   ::

       sudo su -s /bin/bash -c 'grunt transifex --force' xcp
       Running "transifex:languages" (transifex) task
       Download (sic!) translations from transifex
       ...

   Then empty your browser cache and try again.

Q&A
~~~

I want to translate Counterwallet to my language
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Translation is hosted at `Transifex`_. Open an account (or login with
Github) and contribute as a translator or reviewer.

I spotted a mistake!
^^^^^^^^^^^^^^^^^^^^

-  You can join us at Transifex and submit a better translation
-  You can submit a bug report (`Counterwallet issues`_)

Known Issues
^^^^^^^^^^^^

-  Some parts of the GUI are available only in English. That sometimes
   comes from 3rd party components that only support English and
   sometimes may be a consequence of a translation falling behind the
   English original. If you can confirm it’s the latter, please help us
   out or submit a bug report.
-  Numbering formats are not internationalized to lessen the confusion

.. _here: https://github.com/CounterpartyXCP/counterwallet/blob/develop/counterwallet.conf.json.example
.. _Transifex: https://www.transifex.com/projects/p/counterwallet/
.. _Counterwallet issues: https://github.com/CounterpartyXCP/counterwallet/issues
.. _become a translator!: https://www.transifex.com/organization/counterparty/dashboard/counterwallet
.. _How to buy XCP and Counterparty-listed tokens/assets: https://github.com/CounterpartyXCP/Community/wiki/How-to-Buy-and-Sell-XCP-and-Counterparty-listed-Tokens
