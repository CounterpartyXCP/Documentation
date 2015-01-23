Counterparty (XCP) Exchange Integration
=========================================

As Counterparty is not a coin derived from the Bitcoin source code (as
it sits on top of Bitcoin itself), adding Counterparty support to your
exchange is different than adding support for a ``bitcoind``-style
clone. We outline the general process below:

Basic Setup
------------------

-  Ensure that you have an instance of bitcoind with jmcorgan addrindex
   patch running somewhere with ``txindex=1`` and ``addrindex=1``
   enabled in the ``bitcoind.conf`` file. If ``addrindex=1`` was added
   after blockchain existed, start bitcoind with ``-reindex`` once to
   let it build a full index blockchain data first.
-  Download and install counterpartyd (on to a clean VM/server is
   recommended) via the instructions in :doc:`build system </build_counterpartyd.rst>`. Note that when the
   installer asks if you want to start counterpartyd automatically on
   startup, you probably want to say yes (but make it so that it starts
   after bitcoind which it will be using is up, otherwise it will exit
   after a few retries).
-  Edit your ``counterpartyd.conf`` file (see
   `here </additional_topics.rst>`__ to
   specify the connection information for for your bitcoind server (just
   modify the 4 ``bitcoind-rpc-``\ \* parameters already there as
   necessary).
-  In ``counterpartyd.conf``, also set ``rpc-user`` and
   ``rpc-password``. These parameters set how counterpartyd will listen
   for API calls. (Note that if you will be accessing counterpartyd’s
   API from another system, also add or modify the ``rpc-host`` option
   to be ``rpc-host=0.0.0.0``).
-  Start counterpartyd via running ``counterpartyd server`` at the
   command line. Once started, it should start syncing blocks (which may
   take a few hours, but you can install counterpartyd using
   ``--with-bootstrap-db`` to download a recent copy of the DB, or
   download the DB by following links from `this <http://support.counterparty.io/support/articles/5000003524-how-do-i-get-started-developing-on-counterparty->`_ page.).

Adding Support in your Code
------------------------------------

See the :doc:`API documentation <counterpartyd_API.rst>`.

Counterparty has a full-fledged JSON RPC API (which listens on port 4000
by default and requires HTTP basic authentication to connect, for the
username and password listed as ``rpc-host`` and ``rpc-password``).
Connecting to it and making queries is basically the same as bitcoind,
except that it uses JSON RPC 2.0. We have an example of making API
queries in Python and PHP listed
:doc:`here <counterpartyd_API.rst>`.
To integrate support into your exchange, you might adopt the following
methods:

Depositing Funds
~~~~~~~~~~~~~~~~~~

-  Create a single primary XCP holding address, or several primary XCP
   holding addresses. The address(es) will hold deposited XCP funds for
   all users using the exchange.
-  When a user wants to deposit XCP, you create a normal Bitcoin address
   for them (using the API of the bitcoind instance that your
   counterpartyd is running with).
-  You can poll for XCP being sent to the user’s deposit address using
   Counterpartyd’s ``get_balances`` API command, and specifying a
   :doc:`filter for asset==XCP </counterpartyd_API.rst>`
   when you call it (or simply parsing the XCP balance out of the
   resulting list of asset balances – it’ll probably be the only entry,
   but you can’t guarantee that, as users could send non-XCP assets to
   that address as well).
-  ``get_balances`` will only show balances that have at least 1
   confirmation. Once you have a deposit from the user, your system will
   then need to send somewhere around .0004 or .0005 BTC to this deposit
   address. This is necessary to have the BTC balance necessary to be
   able to send the funds out of the address. We call this process
   “priming” the address.
-  Once the BTC dust you sent has at least 1 confirmation, you can then
   issue a ``do_send`` call to the counterpartyd API, to send the XCP to
   your primary XCP holding address. For this call, you should be able
   to just specify ``true`` for the ``multisig`` parameter. Once this
   send is complete (calling ``get_credits`` with a filter of
   ``address==primary XCP holding address`` show the deposit onto the
   primary XCP holding address), you could credit the user’s XCP balance
   on your exchange.

Trading
~~~~~~~~~~~~~~~~~~

Your normal “off-chain” trading engine should work with XCP just like
any other coin.

Withdrawing Funds
~~~~~~~~~~~~~~~~~~

-  When a user is ready to withdraw their funds, you’d simply make sure
   that the primary XCP holding address has enough BTC dust (e.g. >=
   .0005) to do the XCP send, then (after any necessary security
   confirmation) you’d issue a ``do_send`` API call to send the funds to
   the withdrawal address the user provided.
-  Multisig support is available starting from block 333500.

Best practices
------------------

-  Do not credit the user’s funds until the money is in (one of your)
   primary XCP holding addresses.
-  Obviously, safeguard the private key for the primary XCP holding
   address. If you manage a large XCP balance, it may be a good idea to
   keep the bulk of the XCP balance off line in cold storage, and run
   your hot wallet on fractional reserve.
-  Very important: Implement safeguards to limit the max XCP and BTC
   withdrawal (either per day, per occurrance, or both).

Improving performance
------------------------------------

-  Out of the box, counterpartyd performance should be pretty good.
-  For higher counterpartyd performance, you can add the options
   ``api-num-threads=100`` and ``api-request-queue-size=500`` to your
   counterpartyd.conf
   
