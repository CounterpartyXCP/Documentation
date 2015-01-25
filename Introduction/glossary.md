Glossary, Sites and Repositories
================================

In case you’re lost and don’t know where to start…

Web sites
---------

-   [counterparty.io][] - Web site of the Counterparty Project
-   [counterpartyfoundation.org][] - the Counterparty Foundation
-   [counterwallet.io][] - Counterparty-hosted instances of
    Counterwallet (mainnet)
    -   [devtest.counterwallet.io][] - a test & development server
        (self-signed SSL cert)
    -   [testnet.counterwallet.io][] - a Counterwallet testnet instance
        running on bitcoin testnet. (self-signed SSL cert)
    -   [beta.counterwallet.io][] - Counterwallet instance usually
        running code from one or more `develop` branches
        (`counterpartyd`, `counterblockd`, `counterwalletd` or any
        combination thereof) (self-signed SSL cert)
-   [support.counterparty.io][] - the Support site
-   [forums.counterparty.io][] - the Forums site
-   [status.counterparty.io][] - status of various sites and services

Repositories
------------

-   [Github][]
    -   [counterpartyd][] - Counterparty reference client
    -   [counterparty-cli][] - Counterparty CLI
    -   [counterparty-gui][] - Counterparty GUI (OS X and Windows)
    -   [counterblockd][] - Provides extended API services to
        Counterwallet, as well as Counterparty 3rd-party applications
    -   [Counterwallet][] - the Web wallet
    -   [federatednode_build](https://github.com/CounterpartyXCP/federatednode_build) - Federated Node Build System

  [counterparty.io]: http://counterparty.io
  [counterpartyfoundation.org]: http://counterpartyfoundation.org
  [counterwallet.io]: https://counterwallet.io
  [devtest.counterwallet.io]: https://devtest.counterwallet.io
  [testnet.counterwallet.io]: https://testnet.counterwallet.io
  [beta.counterwallet.io]: https://beta.counterwallet.io
  [support.counterparty.io]: http://support.counterparty.io
  [forums.counterparty.io]: http://forums.counterparty.io
  [status.counterparty.io]: http://status.counterparty.io
  [Github]: https://github.com/CounterpartyXCP
  [counterpartyd]: https://github.com/CounterpartyXCP/counterpartyd
  [counterparty-cli]: https://github.com/CounterpartyXCP/counterparty-cli
  [counterparty-gui]: https://github.com/CounterpartyXCP/counterparty-gui
  [counterblockd]: https://github.com/CounterpartyXCP/counterblockd
  [Counterwallet]: https://github.com/CounterpartyXCP/counterwallet


Software
========

counterparty-lib, counterparty-cli
----------------------------------

`counterpartyd` is the Counterparty reference client (similar to what
`bitcoind` is for Bitcoin). It has a basic command line interface, and a
relatively low-level API for getting information on specific
transactions, or general state info. Its responsibilities include
parsing out Counterparty transactions from the Bitcoin blockchain, and
encoding new Counterparty transactions from a command issued via the
command line, or an API call.

counterblockd
-------------

The `counterblockd` daemon provides a more high-level data processing, and
an API that layers on top of counterpartyd’s API. `counterblockd`
generates and allows querying of data such as market and price
information, trade operations, asset history, and more. It is used
extensively by Counterwallet itself, and is appropriate for use by
applications that require additional API-based functionality beyond the
scope of what counterpartyd provides. 

`counterblockd` also provides a
proxy-based interface to all counterpartyd API methods, via the
`proxy\_to\_counterpartyd` API call. This call is used in the Federated
Node setup so that `counterpartyd` does not have to be directly exposed,
and to allow `counterblockd` to cache counterpartyd API responses.
