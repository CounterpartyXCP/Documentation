Developer Guide
===============

Counterparty (XCP) Exchange Integration
---------------------------------------

As Counterparty is not a coin derived from the Bitcoin source code (as
it sits on top of Bitcoin itself), adding Counterparty support to your
exchange is different than adding support for a ``bitcoind``-style
clone. We outline the general process below:

Basic Setup
~~~~~~~~~~~

-  Ensure that you have an instance of bitcoind with jmcorgan addrindex
   patch running somewhere with ``txindex=1`` and ``addrindex=1``
   enabled in the ``bitcoind.conf`` file. If ``addrindex=1`` was added
   after blockchain existed, start bitcoind with ``-reindex`` once to
   let it build a full index blockchain data first.
-  Download and install counterpartyd (on to a clean VM/server is
   recommended) via the instructions in :doc:`build-system`. Note that when the
   installer asks if you want to start counterpartyd automatically on
   startup, you probably want to say yes (but make it so that it starts
   after bitcoind which it will be using is up, otherwise it will exit
   after a few retries).
-  Edit your ``counterpartyd.conf`` file (see
   `here <http://counterparty.io/docs/build-system/additional/>`__ to
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

Adding Support in your Codea
~~~~~~~~~~~~~~~~~~~~~~~~~~~

See the :doc:`api_documentation`.

Counterparty has a full-fledged JSON RPC API (which listens on port 4000
by default and requires HTTP basic authentication to connect, for the
username and password listed as ``rpc-host`` and ``rpc-password``).
Connecting to it and making queries is basically the same as bitcoind,
except that it uses JSON RPC 2.0. We have an example of making API
queries in Python and PHP listed
`here <http://counterparty.io/docs/counterpartyd/#connecting-and-making-requests>`__.
To integrate support into your exchange, you might adopt the following
methods:

Depositing Funds
''''''''''''''''

-  Create a single primary XCP holding address, or several primary XCP
   holding addresses. The address(es) will hold deposited XCP funds for
   all users using the exchange.
-  When a user wants to deposit XCP, you create a normal Bitcoin address
   for them (using the API of the bitcoind instance that your
   counterpartyd is running with).
-  You can poll for XCP being sent to the user’s deposit address using
   Counterpartyd’s ``get_balances`` API command, and specifying a
   `filter for
   asset==“XCP” <http://counterparty.io/docs/counterpartyd/#filtering-read-api-results>`_
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
'''''''

Your normal “off-chain” trading engine should work with XCP just like
any other coin.

Withdrawing Funds
'''''''''''''''''

-  When a user is ready to withdraw their funds, you’d simply make sure
   that the primary XCP holding address has enough BTC dust (e.g. >=
   .0005) to do the XCP send, then (after any necessary security
   confirmation) you’d issue a ``do_send`` API call to send the funds to
   the withdrawal address the user provided.
-  Multisig support is available starting from block 333500.

Best practices
~~~~~~~~~~~~~~

-  Do not credit the user’s funds until the money is in (one of your)
   primary XCP holding addresses.
-  Obviously, safeguard the private key for the primary XCP holding
   address. If you manage a large XCP balance, it may be a good idea to
   keep the bulk of the XCP balance off line in cold storage, and run
   your hot wallet on fractional reserve.
-  Very important: Implement safeguards to limit the max XCP and BTC
   withdrawal (either per day, per occurrance, or both).

Improving performance
~~~~~~~~~~~~~~~~~~~~~

-  Out of the box, counterpartyd performance should be pretty good.
-  For higher counterpartyd performance, you can add the options
   ``api-num-threads=100`` and ``api-request-queue-size=500`` to your
   counterpartyd.conf
   

CLI Example Usage
-----------------

The following examples are abridged for parsimony (meaning: actions are
normally preceded by ``counterpartyd``, i.e. the ``burn`` command would
be called with ``counterpartyd burn``).

-  Server

The ``server`` command should always be running in the background (or
another console). All other commands will fail if the index of the last
block in the database is less than that of the last block seen by
Bitcoin Core.

-  Burn

The ``burn`` command currently usable only on testnet because on mainnet
the burn period finished in early 2014.

``burn --source=mtQheFaSfWELRB2MyMBaiWjdDm6ux9Ezns --quantity=0.5``

-  Send divisible or indivisible assets

::

    send --source=mtQheFaSfWELRB2MyMBaiWjdDm6ux9Ezns --quantity=3 --asset=BBBC \
    --to=n3BrDB6zDiEPWEE6wLxywFb4Yp9ZY5fHM7

-  Buy BTC for XCP

BTC Pay has been disabled in Counterwallet, but remains available in the
CLI.

::

    order --source=mtQheFaSfWELRB2MyMBaiWjdDm6ux9Ezns --get-quantity=10 --get-asset=BTC \
    --give-quantity=20 --give-asset=XCP --expiration=10 --fee_required=0.001

-  Buy BBBC for BTC

BTC Pay has been disabled in Counterwallet, but remains available in the
CLI.

::

    order --source=mtQheFaSfWELRB2MyMBaiWjdDm6ux9Ezns --get-quantity=10 \
    --get-asset=BBBC --give-quantity=20 --give-asset=BTC --expiration=10 \
    --fee_provided=0.001

-  Buy XCP for BBBC

::

    order --source=mtQheFaSfWELRB2MyMBaiWjdDm6ux9Ezns --get-quantity=10 \
    --get-asset=XCP --give-quantity=20 --give-asset=BBBC --expiration=10

-  BTCPay

BTC Pay has been disabled in Counterwallet, but remains available in the
CLI.

::

    btcpay --source=mtQheFaSfWELRB2MyMBaiWjdDm6ux9Ezns \
    --order-match-id=092f15d36786136c4d868c33356ec3c9b5a0c77de54ed0e96a8dbdd8af160c23

Order Match ID can be obtained with the ``pending`` command.

-  Issue

Assets can be divisible or indivisible (the smallest unit is 1).

``issuance --source=mtQheFaSfWELRB2MyMBaiWjdDm6ux9Ezns --quantity=100 --asset='BBBC'``

``issuance --source=mtQheFaSfWELRB2MyMBaiWjdDm6ux9Ezns --quantity=100 --asset='BBBQ' --divisible``

-  Broadcast

::

    broadcast --source=mtQheFaSfWELRB2MyMBaiWjdDm6ux9Ezns --text="Bitcoin price feed" \
    --value=825.22 --fee-multiplier=0.001

Note: for some users counterpartyd has trouble parsing spaces in the
``--text`` argument. One workaround is to add an additional set of
quotes. For example, ``--text='"Bitcoin price feed"'``. This may not
work on Windows due to Python/Windows issues unrelated to Counterparty.

-  Bet (Equal/Not Equal)

Example: Bet on Super Bowl Feed. Denver vs. Seattle. Feed value of 1
means Seattle Wins. Feed value of 2 means Denver Wins. This command
places a 1 XCP bet on the Super Bowl Feed for Seattle to win, paying out
2 to 1. The bet will expire in 100 blocks and the settlement value of
the bet is based on the first feed update after the deadline timestamp
of February 3, 2014 1:39 PM US Eastern Standard Time (UTC-0500).

::

    bet --source=mtQheFaSfWELRB2MyMBaiWjdDm6ux9Ezns \
    --feed-address=n3BrDB6zDiEPWEE6wLxywFb4Yp9ZY5fH --bet-type=Equal \
    --deadline=2014-02-03T13:39:00-0500 --wager=1 --counterwager=2 \
    --target-value=1 --expiration=100

Note: Contracts for Difference (CfD’s) have been disabled and will be
replaced by Ethereum Smart Contracts (available on testnet since late
2014).

-  Cancel

::

    cancel --source=mtQheFaSfWELRB2MyMBaiWjdDm6ux9Ezns \
    --offer-hash=092f15d36786136c4d868c33356ec3c9b5a0c77de54ed0e96a8dbdd8af160c23

-  Dividend

::

    dividend --source=mtQheFaSfWELRB2MyMBaiWjdDm6ux9Ezns --quantity-per-share=1 \
    --asset=MULTIPOOLSTOCK

-  Market

The ``market`` action prints out tables of open orders, open bets,
feeds, and order matches currently awaiting Bitcoin payments from one of
your addresses. It is capable of filtering orders by assets to be bought
and sold.

Examples:

To filter the market to only show offers to sell (give) BTC:

::

    market --give-asset=BTC

To filter the market to only show offers to buy (get) BTC:

::

    market --get-asset=BTC

To filter the market to only show offers to sell BTC for XCP:

::

    market --give-asset=BTC --get-asset=XCP

-  Asset

The ``asset`` action displays the basic properties of a given asset.

-  Address

The ``address`` action displays the details of all transactions
involving the Counterparty address which is its argument.


How to Submit a Bug Report
--------------------------

End Users
~~~~~~~~~

You can seek community help on the chat (fastest), forums or submit a
bug report (instructions can be found below).

Counterwallet-related Support Pointers
''''''''''''''''''''''''''''''''''''''''''''''''

-  Before you open a new issue, do a search or two to check whether a
   similar problem is described somewhere on the Web. You can also
   search `the Countewallet issues`_ to see if the issue is open or has
   already been closed (an issue can be solved in there, but the code
   may still be in testing, so search closed issues, too)
-  If you suspect the problem is browser-related (e.g. disappearing or
   malformed text), confirm the problem in another browser or in the
   Incognito/Private mode (using the same browser). Stale cache is
   sometimes reason for weird browser behavior.
-  In case of issues with transactions that require tracking, paste your
   address in text (not image!) format
-  Related KB/FAQs:

   -  `How to collect client-side debug info for Counterwallet
      problems?`_
   -  `Diagnostic options in Counterwallet settings`_

Developers
~~~~~~~~~~

Countewallet
''''''''''''''''

-  Please see the pointers for end users (above).
-  Since it’s easy to check JavaScript Debug Console, it’s usually a
   good idea to check that out first

counterpartyd
''''''''''''''''

-  Please do not submit bugs for unsupported environments (or at least
   not without needed details). For unsupported environments it is best
   to use the chat or forums
-  Collect and submit relevant information
-  Counterparty, Python, and OS version: normally it’s enough to submit
   just the ``counterpartyd`` version information, but sometimes - if
   installation or other issues are encountered, Python and OS version
   information may be useful as well
   
    - Counterpartyd version (`counterpartyd -V`)
    - Python: (How to get it: `counterpartyd -V` and (Ubuntu) `python3 -V`). On Windows it’s the same - you want the right Python version (Python 3) so use the full path to query it.
    - OS details (On Linux: `uname -a` and (Ubuntu) `cat /etc/issue.net`))
-  Whether you are using `develop` or `master` branch

-  Describe the issue and submit the logs

   -  Counterwallet-related problems: what happened, how to duplicate
      the issue, especially whether it was observed in another Web
      browser.
   -  ``counterpartyd``-related problems: provide the exact command that
      caused unexpected or wrong behavior, including transaction or
      address information because that allows the developers to see how
      it was processed by Counterparty. The locations of various logs
      can be found in product documentation (submit just the relevant
      part, usually the last few lines). In case of API errors, copy the
      error.

Where to submit bug reports/issues?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

-  All Counterparty projects are hosted on Github and can be found at
   https://github.com/CounterpartyXCP.

   -  Counterwallet issues should go to the `Counterwallet` repo
   -  `counterpartyd` issues should be submitted to the
      `counterpartyd` repo
   -  Installation and upgrade issues should go to the
      `counterpartyd_build` repo

-  If you think you’ve identified a **security issue**, `check out the
   bounties page`_ and contact the Counterparty developers directly.

.. _check out the bounties page: http://counterparty.io/bounties/
.. _the Countewallet issues: https://github.com/CounterpartyXCP/counterwallet/issues
.. _How to collect client-side debug info for Counterwallet problems?: http://support.counterparty.io/solution/articles/5000013731-how-to-collect-client-side-debug-information-for-counterwallet-
.. _Diagnostic options in Counterwallet settings: http://support.counterparty.io/solution/articles/5000051310-what-do-various-strings-in-the-diagnostic-part-of-counterwallet-advanced-options-mean-
