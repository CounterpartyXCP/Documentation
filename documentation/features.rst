Features
========

Assets
------

Counterparty allows users to *create*, *send*, *trade*, *pay dividends
on* and *callback* assets, all in a decentralized and trustless fashion.
Many of the actions described below can be accomplished in the official
Counterparty Web-based wallet Counterwallet. End users and those without
access to a working ``counterpartyd`` setup can examine Counterwallet
first.

Counterparty-issued assets (tokens) can have basic or enhanced
(:doc:`Enhanced Asset Info </enhanced_asset_info.md>` for details) information.

Creating assets
~~~~~~~~~~~~~~~

Counterparty allows users to *issue assets*. An asset that is created
within the Counterparty protocol is called a *user-created asset*.
User-created assets are just as real as XCP or even BTC. With the asset
issuance function, every user has the ability to contribute something
new to Counterparty’s financial ecosystem. Note that asset names can be
between 4 and up to 13 or 14 characters long (the exact length depends),
and utilize capital letters A through Z only. Due to the asset name
compression method used, asset names may not begin with ‘A’. For more
information, see the Assets section in the Counterparty specification.

The different kinds of assets
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The most basic kind of asset must specify:

-  who is issuing it ([source])
-  the name of the asset ([asset])
-  how much of [asset] is being issued ([quantity])
-  a description of asset ([description])

An asset’s name must comprise only capital Latin letters, be four
characters or more, and not start with an ‘A’. It is possible to issue
more of [asset], but, at any one time, there can only be one address
which issues [asset]. With that said, the Counterparty protocol allows
[source] to transfer issuance rights of [asset]. Moreover, an asset can
also be locked, so that there can be no further issuances of it. (See
the next section for instructions on how to do this with counterpartyd).
A description must always be included, even if [description] is just an
empty string; the syntax of an asset *with no description* is
``description=""``.

Beyond creating the most basic asset, it is also possible to make assets
either *divisible* or *callable*. If an asset is made divisible (or
callable) upon its initial issuance, it must always be divisible (or
callable) with every issuance thereafter. A divisible user-created asset
is, like, Bitcoin and XCP, divisible up to 8 decimal places. A callable
asset is an asset which the issuer can call back (i.e. repurchase) from
its owners at a date (``call-date``) and for a price (``call-price``)
specified at the initial issuance. *0.5 XCP are destroyed every time a
new asset is issued; there must be at least 0.5 XCP at [address] in
order to issue an asset.*

Issuing assets with the command line (``issuance``)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To issue the most basic asset the command is:

::

    issuance --source=[address]--asset=[asset] --quantity=[quantity]  --description=""

Having run this command, [address] will have issued [quantity] of
[asset]. Since neither ``callable`` nor ``divisible`` is an argument of
``issue``, [asset] is indivisible and not callable.

To make [asset] callable and divisible, the command is:

::

    issuance --source=[address]--asset=[asset] --quantity=[quantity] --divisible --callable --call-date=[call_date] --call-price=[call_price] --description [asset_description]

To call-back a fraction of an asset, the command is:

::

    callback --source=[source] --fraction=[fraction] --asset=[asset]

To lock an asset, the command is:

::

    issuance --source=[source] --asset=[asset] --description=""

Making trades on the decentralized exchange
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Counterparty allows for *peer-to-peer asset exchange*: users can trade
assets with no middleman and no counterparty risk. The platform upon
which trading is done is Counterparty’s *decentralized exchange*. In
what follows trading on the decentralized exchange will be detailed and
explained by means of examples. For the purposes of the following
use-cases:

-  “ordern” denotes the *nth* order in time, “[give\_asset]n” denotes
   the asset being given in ordern, etc.
-  Sally’s creates order1 and Alice creates order2
-  ``[give_asset]2=[get_asset]1``

Creating an order
^^^^^^^^^^^^^^^^^

At its most basic level, a trade on Counterparty’s decentralized
exchange consists of two *orders*, which are *matched* by the protocol.
When Sally is constructing her order, she must specify:

-  her address ([source]1)
-  the asset she will give ([give\_asset]1)
-  the quantity of [give\_asset]1 she will give ([give\_quantity]1)
-  the asset she will get ([get\_asset]1)
-  the quantity of [get\_asset]1 she will get ([get\_quantity])
-  how long before her order expires ([expiration]1)

The Counterparty protocol escrow service
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Once Sally publishes her order [give\_quantity]1 of [give\_asset 1is
debited from her address; her address is debited *before* her order is
matched with Alice’s, and so she cannot spend those funds before
[expiration]1 passes, i.e. until her order expires. In the meantime,
Sally’s funds are not lost or borrowed, they are held by the protocol
itself. *The Counterparty protocol acts as an escrow service, and
thereby eliminates counterparty risk from the exchange of assets*. If
another order is placed which satisfies Sally’s order, the protocol
matches them, and sends each counterparty its respective funds.

Matching an order
^^^^^^^^^^^^^^^^^

``[give_quantity]1/[get_quantity]1`` is the ‘’ratio’‘in which Sally will
exchange [give\_asset]1 for [get\_asset]1, and is denoted by ratio1. In
order for two orders to be matched, [ratio]1 must always be’‘greater
than or equal’’ to the inverse of [ratio]2, Thus, if, for example
``[ratio]2 ([give_quantity]1 + 1)/[get_quantity]1`` would be high enough
ratio to match Sally’s bet, but if
``ratio2=([quantity_2] -1)/[quantity_2]`` it would not. Having been
matched, the exchange is always made at [ratio]1. Further, when when an
order is matched, the exchange is always settled as much as it can be.

A straightforward case
^^^^^^^^^^^^^^^^^^^^^^

Suppose that Alice places order2 before [expiration]1 which matches
order1 perfectly: ``[give_quantity]2=[get_quantity]1``
``[get_quantity]2=[give_quantity]1``. Once Alice has made her order, the
protocol debits [quantity\_2] of [asset\_2] from her address, and, since
her order satisfies Sally’s, Alice’s order funds are sent to Alice, and
Sally’s order funds are sent to Alice. This completes the trade between
Alice and Sally.

Matching an order: partially fulfilling an order
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

For the following example, let [give\_quantity]1=10 and
[get\_quantity]1=20, and that neither [give\_asset]1 nor [get\_asset]1
is BTC. Suppose that Alice wants to match Sally’s order, does not want
all 10 of [give\_asset]1; rather, she only wants 8.

Since the ``ratio1=10/20=1/2``, Alice must ``ratio2 >= 2/1``, to match
Sally’s order. In other words Alice must offer ‘’at least’‘16 of
[asset\_2] to get 8 of [asset\_1] from Sally’s order. Let’s say Alice
constructs order2 such that ``[give_quantity]2=18`` and hence
``ratio2=18/8 > 2/1``. The order will be settled at [ratio]1: for every
unit of [give\_asset]1 that Sally gives Alice, she will get two units of
[get\_asset]1. Moreover, since every trade is settled as much and
``[give_quantity]2=18`` Sally will receive’‘18’’ [get\_asset]1 in
exchange for 9 [give\_asset 1.

Trading BTC on the decentralized exchange
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Suppose Sally makes an order to trade [asset] in exchange for BTC, and
Alice makes an order to trade BTC in exchange for [asset]. Upon placing
order1, Sally’s account is immediately debited, as usual, and, once
Alice has placed order2, it is matched with order1. However, her BTC is
not debited from her account, and the protocol will not send her Sally’s
XCP until Alice sends her BTC using Counterparty’s ``btcpay`` function.
If Alice sends the BTC using ``btcpay`` in ‘’fewer than 10 blocks’’, the
protocol will send her the XCP and thereby complete the transaction,
otherwise, the trade expires, and the protocol will re-credit Sally’s
address with [give\_asset].

Using the command line
^^^^^^^^^^^^^^^^^^^^^^

Trading non-BTC assets (``order``)
''''''''''''''''''''''''''''''''''

Assets can be trade on the decentralized exchange using the ``order``
function. For Sally to receive [get\_quantity]1 of [get\_asset]1 in
exchange for [give\_quantity]1 of [give\_asset]1, the command is the
following:

::

    order --source=[sallys_address] --give-asset=[give_asset]1 --give-quantity=[give_quantity]1 --get-asset=[get_asset]1 --get-quantity=[get_quantity]1 --expiration=EXPIRATION

In order for Alice to receive [get\_quantity]2 of [give\_asset]2 in
exchange for [give\_quantity]2 of [get\_asset]2, the command is:

::

    order --source=[address_2] --give-asset=[get_asset]2 --give-quantity=[give_quantity]2 --get-asset=[get_asset]2 --get-quantity=[get_quantity]2 --expiration=expiration2

Trades involving BTC (``btcpay``)
'''''''''''''''''''''''''''''''''

To make a trade that involves BTC, the ``order`` function requires an
extra parameter, and a second step is needed. If [address\_1] is trading
[give\_quantity]1 of BTC in exchange for [get\_quantity]1 of [asset],
the command is:

::

    order --source=[address_1] --give-asset=BTC --give-quantity=[give_quantity]1 --get-asset=[get_asset]1 --get-quantity=[get_quantity]1 --fee-provided=[fee_provided] --expiration=[expiration]1

If [address\_2] is trading [give\_quantity]2 of [asset] in exchange BTC,
the command is:

::

    order --source=[address_2] --give-asset=[asset] --give-quantity=[give_quantity]2 --get-asset=BTC --get-quantity=[get_quantity]2 --fee-required=[fee_required] --expiration=[expiration]2

[asset] is debited immediately from [address\_2] and is held in escrow.
[address\_1] then must complete the trade using ``btcpay`` before 10
blocks have passed (or the lesser of the two ``expiration`` periods has
passed, if the latter is less than 10 blocks from the time of match).
The command for a ``btcpay`` is:
  btcpay –order-match-id=[txhash1]+[txhash2]

Sending assets (``send``)
~~~~~~~~~~~~~~~~~~~~~~~~~

To send an asset in Counterparty, one must specify:

-  who is sending the asset ([source])
-  what asset [source] is sending ([asset])
-  how much of [asset] [source] is sending ([quantity])
-  to whom [source] is sending [quantity] of [asset] ([destination])

Sending assets using the command line
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To send an asset, the command is:

::

    send --source=[source] --asset=[asset] --quantity=[quantity] --destination=[destination]

Paying dividends on assets
~~~~~~~~~~~~~~~~~~~~~~~~~~

It is possible to pay dividends on an asset using the ``dividend``
function. Dividends are paid in in any ‘dividend\_asset’ to everyone who
holds the asset in proportion to how many units he holds; specifically:
specifically, let [total] equal the total dividends paid out, and
[quantity] be the total amount of asset, then:
``quantity-per-unit = [total]/[quantity]``

Using in the command line (``dividend``)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The form of every dividend command is:

::

    dividend --source=SOURCE  --asset=[asset] --quantity-per-share=[unit_per_share]

To pay dividends in BTC, you should, for now, just use a regular Bitcoin
client, coupled with the output from ``counterpartyd asset ASSET``,
which will list all of the shareholders (and their holdings) of ASSET.

Use-cases
~~~~~~~~~

Below are just a few of the many uses of assets, and this page will be
updated as new use-cases are constructed.

Tokens
^^^^^^

Suppose Alice intends to issue a series of assets and sell them on
Counterparty’s decentralized exchange, and would like to issue her own
currency, “[token]”, with which these assets can be bought. Alice would
like to monitor the circulated amount of token very closely, while not
sacrificing usability, hence she will make [token] indivisible; thus, if
Alice issues 10 [token] there are 10, and only 10, usable units of
token, whereas if [token] were divisible, there would be 10\ :sup:`8`
usable units of [token]. Alice would like [token] itself to be a
commodity, and hence she will make [token] callable.

This will allow her to buy back [token] after [call\_date] for
[call\_price] and resell it when she wants to issue a new asset which
can be purchased only with [token]. To issue [token], the command line
operation is:

::

    issuance --source=[alices_address] --asset=[token] --quantity=[quantity] --callable --call-date=[call_date] --call-price=[call_price] --description="For more info see alicestoken.com" 

Having sold [token] Alice issues [alices\_asset\_1], which she puts on
the distributed exchange in exchange for [token]:

::

    order --source=[alices_address] --give-asset=[alices_asset_1]--give-quantity=[give_quantity]1 --get-asset=[token] --get-quantity= [get_quantity] --expiration=[expiration]1

Currency peg
^^^^^^^^^^^^

Using the issuance function, it is possible to make a sort of *currency
peg*. Let’s suppose Bob issues the divisible, callable asset BOBUSD. In
the description space, Bob provides a link to a website (bobusd.com)
where explains that he will sell BOBUSD at the exchange rate of XCP per
USD at the time he puts BOBUSD on the market, plus a premium. In
exchange for the premium, Bob will buy back BOBUSD before call date for
the call price, as per their specification in the initial issuance of
BOBUSD.

On bobusd.com, Bob further explains that he will send XCP from
[another\_address] to [bobusd\_address] at a fixed frequency, depending
on how much XCP falls relative to USD. There are several ways Bob could
*prove* he has the private key for [another\_address]. The amount of XCP
at [another\_address] plus [bobusd\_address] theoretically indicates the
minimum *backing* of BOBUSD. If, after [call-date] has passed, Bob wants
to call back some BOBUSD, he can use Counterparty’s ``callback``
function and call back the fraction of BOBUSD that he specifies.

If [user] bought 100 BOBUSD on the decentralized exchange, and would
like to “cash it in” for 100 USD worth of XCP at [time], he would first
send his BOBUSD to [bobs\_address], and in return Bob would send the
appropriate amount of XCP. Bob’s risk is proportional to how far in the
future the call date of BOBUSD is; thus, if BOBUSD were not callable,
Bob’s promise to buy back BOBUSD would be indefinite, and he would be
taking on maximal risk. The risk incurred by buyer’s of BOBUSD is
largely a function of Bob’s trustworthiness or *reputation*. The premium
that Bob can charge will depend on a few things, though most especially
his risk and his reputation. On the buyer’s side, the risk is obvious:
BOBUSD is a satisfactory USD peg to the extent that Bob sends [user] the
appropriate amount of XCP when [user] sends him BOBUSD.

Using the command line
^^^^^^^^^^^^^^^^^^^^^^^^

To issue BOBUSD, the command line operation is:

::

    issuance --source=[bobusd_address] --asset=BOBUSD --quantity=[quantity] --divisible --callable --call-date=[call-date] --call-price=[call_price] --description="For more info see bobusd.com"

If USD/XCP falls, Bob will send XCP from [another\_address] to
[bobusd\_address], for which the command line operation is:

::

    send --source=[another_address] --destination=[bobusd_address] --quantity=[quantity] --asset=XCP

If Bob wants to call back 1% of all BOBUSD, he would run the following
command:
::

    callback --source=[bobs_address] --fraction=.01 --asset=BOBUSD 

If [user] wants to “cash in” 100 BOBUSD for 100 USD when the exchange
rate is 10 USD/XCP, he would first send his BOBUSD to [bobs\_address]:

::

    send source=[users_address] destination=[bobs_address] --quantity=100 --asset=BOBUSD

Bets
----

//to-do

Smart Contracts
---------------
