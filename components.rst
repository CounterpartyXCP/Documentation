Components
==========

1. bitcoind
-----------

Bitcoind is the Bitcoin reference client. In the context of
Counterparty, bitcoind is used by the various components to retrieve
block and transaction data (to allow for Counterparty transaction
processing), as well as broadcast transactions to the network.

2. counterpartyd
----------------

counterpartyd is the Counterparty reference client (similar to what
bitcoind is for Bitcoin). It has a basic command line interface, and a
relatively low-level API for getting information on specific
transactions, or general state info. Its responsibilities include
parsing out Counterparty transactions from the Bitcoin blockchain, and
encoding new Counterparty transactions from a command issued via the
command line, or an API call.


3. Insight / blockr.io
----------------------

Both insight and blockr.io allow for local querying of balance
information and unspent transaction outputs (UTXOs) for arbitrary
addresses. This is a feature not available to bitcoind itself.
Alternatives to running insight on the server are using a service like
blockr.io, which both counterpartyd and counterblockd support. For the
most reliable service, we recommend that production servers (at least)
run insight locally.

4. counterblockd
----------------

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

5. MongoDB
----------

MongoDB is used as the backend datastore for counterblockd.
Counterpartyd uses its own embedded SQLite database.

6. Web Server / nginx
---------------------

The web server software hosts the static content for Counterwallet (and
anything else, such as the BlockParty block explorer). On the standard
Federated node setup, nginx serves this role, and is configured in a
way, as well as serving as a front-end (reverse proxy) for all API
requests, and a front-end cache retrieval system (so that cached data
can be served out of redis by nginx directly).
