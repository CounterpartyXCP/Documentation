Features
========

Assets
------

Counterparty allows users to *create*, *send*, *trade*, *pay dividends
on* and *callback* assets, all in a decentralized and trustless fashion.
Many of the actions described below can be accomplished in the official
Counterparty Web-based wallet Counterwallet. End users and those without
access to a working `counterpartyd` setup can examine Counterwallet
first.

Counterparty-issued assets (tokens) can have basic or enhanced
([Enhanced Asset Info](/enhanced_asset_info.md) for details)
information.

### Creating assets

Counterparty allows users to *issue assets*. An asset that is created
within the Counterparty protocol is called a *user-created asset*.
User-created assets are just as real as XCP or even BTC. With the asset
issuance function, every user has the ability to contribute something
new to Counterparty’s financial ecosystem. Note that asset names can be
between 4 and up to 13 or 14 characters long (the exact length depends),
and utilize capital letters A through Z only. Due to the asset name
compression method used, asset names may not begin with ‘A’. For more
information, see the Assets section in the Counterparty specification.

### The different kinds of assets

The most basic kind of asset must specify:

-   who is issuing it ([source])
-   the name of the asset ([asset])
-   how much of [asset] is being issued ([quantity])
-   a description of asset ([description])

An asset’s name must comprise only capital Latin letters, be four
characters or more, and not start with an ‘A’. It is possible to issue
more of [asset], but, at any one time, there can only be one address
which issues [asset]. With that said, the Counterparty protocol allows
[source] to transfer issuance rights of [asset]. Moreover, an asset can
also be locked, so that there can be no further issuances of it. (See
the next section for instructions on how to do this with counterpartyd).
A description must always be included, even if [description] is just an
empty string; the syntax of an asset *with no description* is
`description=""`.

Beyond creating the most basic asset, it is also possible to make assets
either *divisible* or *callable*. If an asset is made divisible (or
callable) upon its initial issuance, it must always be divisible (or
callable) with every issuance thereafter. A divisible user-created asset
is, like, Bitcoin and XCP, divisible up to 8 decimal places. A callable
asset is an asset which the issuer can call back (i.e. repurchase) from
its owners at a date (`call-date`) and for a price (`call-price`)
specified at the initial issuance. *0.5 XCP are destroyed every time a
new asset is issued; there must be at least 0.5 XCP at [address] in
order to issue an asset.*

Making trades on the decentralized exchange
===========================================

Counterparty allows for *peer-to-peer asset exchange*: users can trade
assets with no middleman and no counterparty risk. The platform upon
which trading is done is Counterparty’s *decentralized exchange*. In
what follows trading on the decentralized exchange will be detailed and
explained by means of examples. For the purposes of the following
use-cases:

-   “ordern” denotes the *nth* order in time, “[give\_asset]n” denotes
    the asset being given in ordern, etc.
-   Sally’s creates order1 and Alice creates order2
-   `[give_asset]2=[get_asset]1`

Creating an order
=================

At its most basic level, a trade on Counterparty’s decentralized
exchange consists of two *orders*, which are *matched* by the protocol.
When Sally is constructing her order, she must specify:

-   her address ([source]1)
-   the asset she will give ([give\_asset]1)
-   the quantity of [give\_asset]1 she will give ([give\_quantity]1)
-   the asset she will get ([get\_asset]1)
-   the quantity of [get\_asset]1 she will get ([get\_quantity])
-   how long before her order expires ([expiration]1)

The Counterparty protocol escrow service
========================================

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
=================

`[give_quantity]1/[get_quantity]1` is the ‘’ratio’‘in which Sally will
exchange [give\_asset]1 for [get\_asset]1, and is denoted by ratio1. In
order for two orders to be matched, [ratio]1 must always be’‘greater
than or equal’’ to the inverse of [ratio]2, Thus, if, for example
`[ratio]2 ([give_quantity]1 + 1)/[get_quantity]1` would be high enough
ratio to match Sally’s bet, but if
`ratio2=([quantity_2] -1)/[quantity_2]` it would not. Having been
matched, the exchange is always made at [ratio]1. Further, when when an
order is matched, the exchange is always settled as much as it can be.


A straightforward case
======================

Suppose that Alice places order2 before [expiration]1 which matches
order1 perfectly: `[give_quantity]2=[get_quantity]1`
`[get_quantity]2=[give_quantity]1`. Once Alice has made her order, the
protocol debits [quantity\_2] of [asset\_2] from her address, and, since
her order satisfies Sally’s, Alice’s order funds are sent to Alice, and
Sally’s order funds are sent to Alice. This completes the trade between
Alice and Sally.

Matching an order: partially fulfilling an order
================================================

For the following example, let [give\_quantity]1=10 and
[get\_quantity]1=20, and that neither [give\_asset]1 nor [get\_asset]1
is BTC. Suppose that Alice wants to match Sally’s order, does not want
all 10 of [give\_asset]1; rather, she only wants 8.

Since the `ratio1=10/20=1/2`, Alice must `ratio2 >= 2/1`, to match
Sally’s order. In other words Alice must offer ‘’at least’‘16 of
[asset\_2] to get 8 of [asset\_1] from Sally’s order. Let’s say Alice
constructs order2 such that `[give_quantity]2=18` and hence
`ratio2=18/8 > 2/1`. The order will be settled at [ratio]1: for every
unit of [give\_asset]1 that Sally gives Alice, she will get two units of
[get\_asset]1. Moreover, since every trade is settled as much and
`[give_quantity]2=18` Sally will receive’‘18’’ [get\_asset]1 in exchange
for 9 [give\_asset 1.

Trading BTC on the decentralized exchange
=========================================

Suppose Sally makes an order to trade [asset] in exchange for BTC, and
Alice makes an order to trade BTC in exchange for [asset]. Upon placing
order1, Sally’s account is immediately debited, as usual, and, once
Alice has placed order2, it is matched with order1. However, her BTC is
not debited from her account, and the protocol will not send her Sally’s
XCP until Alice sends her BTC using Counterparty’s `btcpay` function. If
Alice sends the BTC using `btcpay` in ‘’fewer than 10 blocks’’, the
protocol will send her the XCP and thereby complete the transaction,
otherwise, the trade expires, and the protocol will re-credit Sally’s
address with [give\_asset].

Sending assets (`send`)
=======================

To send an asset in Counterparty, one must specify:

-   who is sending the asset ([source])
-   what asset [source] is sending ([asset])
-   how much of [asset] [source] is sending ([quantity])
-   to whom [source] is sending [quantity] of asset ([destination])

Paying dividends on assets
==========================

It is possible to pay dividends on an asset using the `dividend`
function. Dividends are paid in in any ‘dividend\_asset’ to everyone who
holds the asset in proportion to how many units he holds; specifically:
specifically, let [total] equal the total dividends paid out, and
[quantity] be the total amount of asset, then:
`quantity-per-unit = [total]/[quantity]`

Use-cases
=========

Below are just a few of the many uses of assets, and this page will be
updated as new use-cases are constructed.

Tokens
======

Suppose Alice intends to issue a series of assets and sell them on
Counterparty’s decentralized exchange, and would like to issue her own
currency, “[token]”, with which these assets can be bought. Alice would
like to monitor the circulated amount of token very closely, while not
sacrificing usability, hence she will make [token] indivisible; thus, if
Alice issues 10 [token] there are 10, and only 10, usable units of
token, whereas if [token] were divisible, there would be 10\^8\^ usable
units of [token]. Alice would like [token] itself to be a commodity, and
hence she will make [token] callable.

This will allow her to buy back [token] after [call\_date] for
[call\_price] and resell it when she wants to issue a new asset which
can be purchased only with [token].


Currency peg
============

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
to call back some BOBUSD, he can use Counterparty’s `callback` function
and call back the fraction of BOBUSD that he specifies.

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

# Broadcasts

Counterparty allows for ''peer-to-peer betting'': users construct bets on broadcasts, the protocol itself matches various bets, and then, depending on the outcome of the bet, sends the bet funds to the appropriate users. 

Bets are made in XCP, and a user cannot bet for more XCP than he has at his address and, having made a bet, the protocol immediately debits his wager from his address. All funds that are part of a bet are held in escrow by the protocol from the beginning. ''In Counterparty, the protocol itself is the escrow service for bets, which eliminates counterparty risk from betting''. In order for there to be a bet-match, there must be three things:

* A ''broadcast'', which is the subject of a bet, and contains the necessary data to resolve the outcome of a bet.
* A party who wishes to use the broadcast to make a bet.
* A counterparty who wishes to take the other side of the bet.

## Making a broadcast

In order to make a bet, there needs to be data upon which to bet; in Counterparty, data is published by users making broadcasts. Anyone can make a broadcast. A series of broadcasts is called a ''feed''; someone who publishes a feed is a called a ''feed-operator''; and the address from which a feed-operator publishes a feed is the ''feed-address''. In order to make a broadcast, it must be specified:

* from which address the broadcast is made (`source`)
* the content of the broadcast (`text`)
* the value that will resolve the bet (`value`)
* what fraction of the bets made on the broadcast go to the feed-operator (`fee-fraction`)

The `text` of a broadcast must be a string and may be up to 52 bytes (52 characters, in case of single-byte character sets). Thus, text beyond 52 bytes must be published off-chain. A feed-operator may change the text of his feed at any time, simply by publishing a broadcast from the same source address, but with a different text. 

The `value` should correspond to the `text` of the broadcast. If, for example, the text specifies that the broadcast is publishing the price of gold in USD per ounce, then the `value` published should be that price at the time specified by the broadcast. 

The `fee-fraction` (the fraction of a bet that goes to feed-operator) is expressed in decimal form: thus `fee-fraction=.01` means that 1% of all bets on a feed go to the feed-operator. The fee-fraction can be changed (updated) but it does not apply retroactively. A feed-operator may also lock his feed simply by publishing a broadcast where `text="LOCK"` or `text="lock"`. 

If a feed is locked while there are open bets or unsettled bet matches that refer to it, then they will automatically expire, and the funds will automatically be sent back to the appropriate addresses. Once a feed has been locked by the feed-operator, broadcasts can no longer be published from that address. If a feed-operator would like to publish a broadcast that ''cannot'' decide a bet, he can set `value` equal to -1.

### Broadcasts for binary bets

Since the text of a broadcast may be only up to 52 bytes, any text beyond 52 bytes must be published off-chain; one may, for example, use the text space of a broadcast to provide a link to a website, where further information can be provided. If, however, a feed-operator would like to publish all of his text within the 52 bytes available, he will likely have to use a shorthand. Suppose, for example, a feed-operator wants to publish the following text:

	text="Will the price of gold rise by 12:00 AM UTC, March1? 1=yes, 2=no"

As this string is 64 characters, it will not fit in the space provided, and so the feed-operator might use the following short-hand:

	text="Price of gold, 12AM UTC March1. 1=inc 2=dec/const"

Above "inc" means "increase", "dec" means "decrease", and "const" means "constant". The feed-operator can specify off-chain what his short-hand notation means. The text of a broadcast may be changed at any time. Thus, using the example above suppose that 12:00 AM, March 1 passes, and
the feed-operator wants to publish the results of the broadcast, he might change the text to the following:

	text="12:00AM March 1. Gold price decreased!"

Changing the text does not resolve the bet, the feed-operator must publish a value:

	text="12:00AM March 1. Gold price decreased!" value=2

Note that the feed-operator could have left the text unedited, and merely published a value, and the bet would have been resolved. **Bet resolution depends on, and only on, the value published.**


### Broadcasts without bets

While every bet must be made on a broadcast, not every broadcast can resolve a bet. That is, broadcasts can be used merely to publish information. Suppose, for example, the US presidential election had just been completed, someone could publish the following broadcast:

	text="I just started using Counterwallet. Wow!"

Since this broadcast is merely making an announcement, it should not, naturally, be bet on, but a feed-operator cannot stop users from betting on his broadcasts. Thus in order to ensure that bets are not resolved based on his broadcast, he can construct his broadcast such that `value=-1`.

# Bets

## Making a bet

In order to make a bet, a user must specify:

* his address (`source`)
* what feed he is betting on (`feed-address`)
* what kind of bet he is making (`bet-type`)
* when his bet will be decided (`deadline`)
* how much he is betting (`wager`)
* how much the counterparty must bet (`counterwager`)
* what value he is betting the feed-operator will publish (`target-value`)
* how sensitive his bet will be to movements in the value he is betting on (`leverage`)
* how many blocks a counterparty has to take the other side of the bet (`expiration`)


To parse a `deadline` entered by a user, Counterparty uses Python's default `dateutil.parser`, a very powerful and accepts many different date formats, but it does not accept, for example, Unix time. For a list of date formats that `dateutil.parser` accepts, see [this page](http://labix.org/python-dateutil). In order for `dateutil.parser` to parse a deadline, `deadline` must be a string. 

In Counterparty, the unit of leverage is 5040. This means that leverage has a granularity of 1/5040 in Counterparty. Thus, an unlevered bet is one where `leverage=5040`; a bet that is levered 2x is one where `leverage=10080`. For more about leverage, see the section titled Adjusting the parameters of a CFD.

## Matching a bet

By making a bet, a user also provides the conditions that must be fulfilled for a counterparty to take the other side of his bet. In this section we will specify those conditions. `[wager]1/[counterwager]1` is the ''ratio'' for a bet that a user stipulates, and is denoted by ratio<sub>1</sub>. In order for two bets to be matched, [ratio]<sub>1</sub> must always be ''greater than or equal to'' the inverse of [ratio]<sub>2</sub>.

Suppose `wager1=10` and `counterwager1=20`, then `ratio1=10/20=1/2`. If `wager2=22` and `counterwager2=10`, then `ratio2=22/10=2.2/1, and the inverse of ratio2=1/2.2`. Thus, in this case, bet<sub>1</sub> and bet<sub>2</sub> have the appropriate ratios to be matched. If, on the other hand, `wager2=18` and `counterwager2=10`, then the inverse of ratio<sub>2</sub>=18/10=1.8/1, which is less than ratio<sub>1</sub>, and hence the bet<sub>2</sub> cannot match bet<sub>1</sub>. Beyond the `bet-type` and ratio conditions just mentioned, in order for two bets to be matched, they must have the same:

* `feed-address`
* `target-value`
* `deadline`
* `leverage`


Smart Contracts
---------------
