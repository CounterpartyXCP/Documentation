Glossary, Sites and Repositories
=============================================

In case you’re lost and don’t know where to start…

Web sites
---------

-  `counterparty.io`_ - Web site of the Counterparty Project
-  `counterpartyfoundation.org`_ - the Counterparty Foundation
-  `counterwallet.io`_ - Counterparty-hosted instances of Counterwallet (mainnet)

   -  `devtest.counterwallet.io`_ - a test & development server
      (self-signed SSL cert)
   -  `testnet.counterwallet.io`_ - a Counterwallet testnet instance
      running on bitcoin testnet. (self-signed SSL cert)
   -  `beta.counterwallet.io`_ - Counterwallet instance usually running
      code from one or more ``develop`` branches (``counterpartyd``,
      ``counterblockd``, ``counterwalletd`` or any combination thereof)
      (self-signed SSL cert)

-  `support.counterparty.io`_ - the Support site
-  `forums.counterparty.io`_ - the Forums site
-  `status.counterparty.io`_ - status of various sites and services

Repositories
------------

-  `Github`_

   -  `counterpartyd`_ - Counterparty reference client
   -  `counterparty-cli`_ - Counterparty CLI
   -  `counterparty-gui`_ - Counterparty GUI (OS X and Windows)
   -  `counterblockd`_ - Provides extended API services to
      Counterwallet, as well as Counterparty 3rd-party applications
   -  `Counterwallet`_ - the Web wallet
   -  `federatednode_build_` - 


Software
--------

counterparty-lib, counterparty-cli
~~~~~~~~~~~~~
counterpartyd is the Counterparty reference client (similar to what
bitcoind is for Bitcoin). It has a basic command line interface, and a
relatively low-level API for getting information on specific
transactions, or general state info. Its responsibilities include
parsing out Counterparty transactions from the Bitcoin blockchain, and
encoding new Counterparty transactions from a command issued via the
command line, or an API call.

counterblockd
~~~~~~~~~~~~~

The counterblockd daemon provides a more high-level data processing, and
an API that layers on top of counterpartyd’s API. Counterblockd
generates and allows querying of data such as market and price
information, trade operations, asset history, and more. It is used
extensively by Counterwallet itself, and is appropriate for use by
applications that require additional API-based functionality beyond the
scope of what counterpartyd provides. counterblockd also provides a
proxy-based interface to all counterpartyd API methods, via the
proxy\_to\_counterpartyd API call. This call is used in the Federated
Node setup so that counterpartyd does not have to be directly exposed,
and to allow counterblockd to cache counterpartyd API responses.

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
.. _counterpartyd_build: https://github.com/CounterpartyXCP/counterpartyd_build
.. _Community Wiki: https://github.com/CounterpartyXCP/Community
.. _status.counterparty.io: http://status.counterparty.io
.. _the main Web site: http://counterparty.io/get-started/
.. _Counterwallet.io: https://counterwallet.io
