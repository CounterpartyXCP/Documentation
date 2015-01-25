# Software

**NOTE**: `counterpartyd` was recently split into two parts: `counterparty-lib` and `counterparty-cli`.

### counterparty-cli

**LINK**

`counterparty-cli` contains two command line scripts:
- `counterparty-server.py` (replaces `counterpartyd.py`)
- `counterparty-client.py` (replaces `counterparty-cli.py`)

## counterparty-lib

**LINK**

`counterpartyd` is the Counterparty reference client (similar to what
`bitcoind` is for Bitcoin). It has a basic command line interface, and a
relatively low-level API for getting information on specific
transactions, or general state info. Its responsibilities include
parsing out Counterparty transactions from the Bitcoin blockchain, and
encoding new Counterparty transactions from a command issued via the
command line, or an API call.

the main characteristics of `counterparty-lib` are:
- it is a "pure" Python library and don't contains any command line script.
- it can be installed/upgraded with a simple `pip3 install counterparty-lib`
- it don't needs/manages a Wallet but only a block explorer (btw that why, in the API, the pubkey parameter is now mandatory if not present in the blockchain)
- it don't needs/manages user configuration file


### counterblockd

**LINK**

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


# Repositories

-   [Github][]
    -   [counterpartyd][] - Counterparty reference client
    -   [counterparty-cli][] - Counterparty CLI
    -   [counterparty-gui][] - Counterparty GUI (OS X and Windows)
    -   [Counterwallet][] - web wallet
    -   [counterblockd][] - Provides extended API services to Counterwallet, as well as Counterparty 3rd-party applications
    -   [federatednode_build](https://github.com/CounterpartyXCP/federatednode_build) - Federated Node Build System

[Github]: https://github.com/CounterpartyXCP
[counterpartyd]: https://github.com/CounterpartyXCP/counterpartyd
[counterparty-cli]: https://github.com/CounterpartyXCP/counterparty-cli
[counterparty-gui]: https://github.com/CounterpartyXCP/counterparty-gui
[counterblockd]: https://github.com/CounterpartyXCP/counterblockd
[Counterwallet]: https://github.com/CounterpartyXCP/counterwallet
