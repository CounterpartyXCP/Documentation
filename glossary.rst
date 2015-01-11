Glossary, Sites and Repositories
=============================================

In case you’re lost and don’t know where to start…

Web sites
---------

-  `counterparty.io`_ - Web site of the Counterparty Project (also .co)
-  `counterpartyfoundation.org`_ - the Counterparty Foundation
-  `counterwallet.io`_ - Counterparty-hosted instances of Counterwallet
   on mainnet (also .co)

   -  `devtest.counterwallet.io`_ - a test & development server
      (self-signed SSL cert)
   -  `testnet.counterwallet.io`_ - a Counterwallet testnet instance
      running on bitcoin testnet. Use this as your Counterwallet
      “playground” (self-signed SSL cert)
   -  `beta.counterwallet.io`_ - Counterwallet instance usually running
      code from one or more ``develop`` branches (``counterpartyd``,
      ``counterblockd``, ``counterwalletd`` or any combination thereof)
      (self-signed SSL cert)

-  `support.counterparty.io`_ - the Support site (also .co)
-  `forums.counterparty.io`_ - the Forums site (also .co)

Repositories
------------

-  `Github`_

   -  `counterpartyd`_ - Counterparty reference client
   -  `counterparty-cli`_ - Counterparty CLI
   -  `counterblockd`_ - Provides extended API services to
      Counterwallet, as well as Counterparty 3rd-party applications
   -  `Counterwallet`_ - the Web wallet
   -  `counterparty-gui`_ - Counterparty GUI (OS X and Windows)
   -  `counterpartyd_build`_ - the Counterparty Build System helps you
      automatically install main Counterparty software applications (see
      below).

-  `status.counterparty.io`_ - status of various sites and services
   (also .co)

Software
--------

End Users
~~~~~~~~~

We recommend you to visit `the main Web site`_ and then
`Counterwallet.io`_. A “playground” for which you need “testnet coins”
(fake coins that can be obtained for free) is available on Counterwallet
instances running testnet such as the one listed above.

System Administrators and Developers: Stand-Alone Counterpartyd, Federated Node
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If you’re a developer with ample system resources (i.e. can run a VM
with 1GB+ of RAM), **it is recommended to run a Federated Node** on
Ubuntu 14.04.

-  ``counterpartyd`` is a key component for local services. Unless
   you’re accessing Counterparty API over the Web, you want to install
   ``counterpartyd``. There are 2 ways to install it:

   - For lightweight use it is recommended to use `the Build System`_ to install a “stand-alone” ``counterpartyd`` on Ubuntu or Windows.
   - For intermediate and developer use of ``counterpartyd`` it is recommended to setup a Federated Node (see below) and in the install wizard pick ``counterpartyd`` (or Countewallet). This takes longer to setup, but it is a complete test & development environment. A downside is that ``counterpartyd`` can run on Windows and other OS, while Federated Node supports only Ubuntu.
-  Counterwallet requires ``counterpartyd``, ``counterblockd`` and some
   other 3rd party services. The best way to install Counterwallet is to
   `setup a Counterblock Federated Node`_ on the supported OS (Ubuntu).
   The same Federated Node page explains how all components fit together
   and what each of them does. There is no other automated way to
   install Counterparty at the moment.

.. note::


   -  (3rd party) Bitcoin Core with a full copy of indexed blockchain is
      required for both ``counterpartyd`` and Counterwallet.
   -  While it is possible to install all these packages manually, it is
      difficult and can be time consuming. ``counterpartyd`` can be
      manually installed on Debian, OS X and other Linux/UNIX variants, but
      Federated Node could require significant efforts.
   -  Docker or other approaches are not yet available

.. _setup a Counterblock Federated Node: http://counterparty.io/docs/build-system/federated-node/
.. _the Build System: http://counterparty.io/docs/build-system/
.. _counterparty.io: http://counterparty.io
.. _counterpartyfoundation.org: http://counterpartyfoundation.org
.. _counterwallet.io: https://counterwallet.io
.. _devtest.counterwallet.io: https://devtest.counterwallet.io
.. _testnet.counterwallet.io: https://testnet.counterwallet.io
.. _beta.counterwallet.io: https://beta.counterwallet.io
.. _support.counterparty.io: http://support.counterparty.io
.. _forums.counterparty.io: http://forums.counterparty.io
.. _Github: https://github.com/CounterpartyXCP
.. _counterpartyd: https://github.com/CounterpartyXCP/counterpartyd
.. _counterparty-cli: https://github.com/CounterpartyXCP/counterparty-cli
.. _counterblockd: https://github.com/CounterpartyXCP/counterblockd
.. _Counterwallet: https://github.com/CounterpartyXCP/counterwallet
.. _counterparty-gui: https://github.com/CounterpartyXCP/counterparty-gui
.. _counterpartyd\_build: https://github.com/CounterpartyXCP/counterpartyd_build
.. _Community Wiki: https://github.com/CounterpartyXCP/Community
.. _status.counterparty.io: http://status.counterparty.io
.. _the main Web site: http://counterparty.io/get-started/
.. _Counterwallet.io: https://counterwallet.io
