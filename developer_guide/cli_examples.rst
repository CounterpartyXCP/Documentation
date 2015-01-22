CLI Example Usage
======================

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
