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
