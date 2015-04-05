CLI Example Usage
=================

The following examples must be preceded by `counterparty-cli`, i.e. the `burn` command would be called with `counterparty-cli burn`. 

Server
------

The `server` command should always be running in the background (or
another console). All other commands will fail if the index of the last
block in the database is less than that of the last block seen by
Bitcoin Core.

Burn
----

The `burn` command currently usable only on testnet because on mainnet
the burn period finished in early 2014.

`burn --source=mtQheFaSfWELRB2MyMBaiWjdDm6ux9Ezns --quantity=0.5`

Send divisible or indivisible assets
----------------------------------------

To send an asset, the command is:

    send --source=[source] --asset=[asset] --quantity=[quantity] --destination=[destination]

    send --source=mtQheFaSfWELRB2MyMBaiWjdDm6ux9Ezns --quantity=3 --asset=BBBC \
    --to=n3BrDB6zDiEPWEE6wLxywFb4Yp9ZY5fHM7

Buy BTC for XCP
----------------------------------------

BTC Pay has been disabled in Counterwallet, but remains available in the
CLI.

To make a trade that involves BTC, the `order` function requires an
extra parameter, and a second step is needed. If [address\_1] is trading
[give\_quantity]1 of BTC in exchange for [get\_quantity]1 of [asset],
the command is:

    order --source=[address_1] --give-asset=BTC --give-quantity=[give_quantity]1 --get-asset=[get_asset]1 --get-quantity=[get_quantity]1 --fee-provided=[fee_provided] --expiration=[expiration]1

If [address\_2] is trading [give\_quantity]2 of [asset] in exchange BTC,
the command is:

    order --source=[address_2] --give-asset=[asset] --give-quantity=[give_quantity]2 --get-asset=BTC --get-quantity=[get_quantity]2 --fee-required=[fee_required] --expiration=[expiration]2

[asset] is debited immediately from [address\_2] and is held in escrow.
[address\_1] then must complete the trade using `btcpay` before 10
blocks have passed (or the lesser of the two `expiration` periods has
passed, if the latter is less than 10 blocks from the time of match).
The command for a `btcpay` is:

    btcpay –order-match-id=[txhash1]+[txhash2]

    order --source=mtQheFaSfWELRB2MyMBaiWjdDm6ux9Ezns --get-quantity=10 --get-asset=BTC \
    --give-quantity=20 --give-asset=XCP --expiration=10 --fee_required=0.001

Buy BBBC for BTC
----------------------------------------

BTC Pay has been disabled in Counterwallet, but remains available in the
CLI.

    order --source=mtQheFaSfWELRB2MyMBaiWjdDm6ux9Ezns --get-quantity=10 \
    --get-asset=BBBC --give-quantity=20 --give-asset=BTC --expiration=10 \
    --fee_provided=0.001

Buy XCP for BBBC
----------------------------------------

Assets can be trade on the decentralized exchange using the `order`
function. For Sally to receive [get\_quantity]1 of [get\_asset]1 in
exchange for [give\_quantity]1 of [give\_asset]1, the command is the
following:

    order --source=[sallys_address] --give-asset=[give_asset]1 --give-quantity=[give_quantity]1 --get-asset=[get_asset]1 --get-quantity=[get_quantity]1 --expiration=EXPIRATION

In order for Alice to receive [get\_quantity]2 of [give\_asset]2 in
exchange for [give\_quantity]2 of [get\_asset]2, the command is:

    order --source=[address_2] --give-asset=[get_asset]2 --give-quantity=[give_quantity]2 --get-asset=[get_asset]2 --get-quantity=[get_quantity]2 --expiration=expiration2

    order --source=mtQheFaSfWELRB2MyMBaiWjdDm6ux9Ezns --get-quantity=10 \
    --get-asset=XCP --give-quantity=20 --give-asset=BBBC --expiration=10
BTCPay
----------------------------------------

BTC Pay has been disabled in Counterwallet, but remains available in the
CLI.

    btcpay --source=mtQheFaSfWELRB2MyMBaiWjdDm6ux9Ezns \
    --order-match-id=092f15d36786136c4d868c33356ec3c9b5a0c77de54ed0e96a8dbdd8af160c23

Order Match ID can be obtained with the `pending` command.

-   Issue

Assets can be divisible or indivisible (the smallest unit is 1).

`issuance --source=mtQheFaSfWELRB2MyMBaiWjdDm6ux9Ezns --quantity=100 --asset='BBBC'`

`issuance --source=mtQheFaSfWELRB2MyMBaiWjdDm6ux9Ezns --quantity=100 --asset='BBBQ' --divisible`

To issue the most basic asset the command is:

    issuance --source=[address]--asset=[asset] --quantity=[quantity]  --description=""

Having run this command, [address] will have issued [quantity] of
[asset]. Since neither `callable` nor `divisible` is an argument of
`issue`, [asset] is indivisible and not callable.

To issue BOBUSD, the command line operation is:

    issuance --source=[bobusd_address] --asset=BOBUSD --quantity=[quantity] --divisible --callable --call-date=[call-date] --call-price=[call_price] --description="For more info see bobusd.com"

If USD/XCP falls, Bob will send XCP from [another\_address] to
[bobusd\_address], for which the command line operation is:

    send --source=[another_address] --destination=[bobusd_address] --quantity=[quantity] --asset=XCP


If [user] wants to “cash in” 100 BOBUSD for 100 USD when the exchange
rate is 10 USD/XCP, he would first send his BOBUSD to [bobs\_address]:

    send source=[users_address] destination=[bobs_address] --quantity=100 --asset=BOBUSD

Broadcast
----------------------------------------

    broadcast --source=mtQheFaSfWELRB2MyMBaiWjdDm6ux9Ezns --text="Bitcoin price feed" \
    --value=825.22 --fee-multiplier=0.001

**Note:** for some users counterpartyd has trouble parsing spaces in the
`--text` argument. One workaround is to add an additional set of quotes.
For example, `--text='"Bitcoin price feed"'`. This may not work on
Windows due to Python/Windows issues unrelated to Counterparty. Another 
situation where double quotes may be required on Windows is filtering
(e.g. `--filter "source" "=" "mtQheFaSfWELRB2MyMBaiWjdDm6ux9Ezns"`).

Bet (Equal/Not Equal)
----------------------------------------

Example: Bet on Super Bowl Feed. Denver vs. Seattle. Feed value of 1
means Seattle Wins. Feed value of 2 means Denver Wins. This command
places a 1 XCP bet on the Super Bowl Feed for Seattle to win, paying out
2 to 1. The bet will expire in 100 blocks and the settlement value of
the bet is based on the first feed update after the deadline timestamp
of February 3, 2014 1:39 PM US Eastern Standard Time (UTC-0500).

    bet --source=mtQheFaSfWELRB2MyMBaiWjdDm6ux9Ezns \
    --feed-address=n3BrDB6zDiEPWEE6wLxywFb4Yp9ZY5fH --bet-type=Equal \
    --deadline=2014-02-03T13:39:00-0500 --wager=1 --counterwager=2 \
    --target-value=1 --expiration=100


Cancel
----------------------------------------

    cancel --source=mtQheFaSfWELRB2MyMBaiWjdDm6ux9Ezns \
    --offer-hash=092f15d36786136c4d868c33356ec3c9b5a0c77de54ed0e96a8dbdd8af160c23

Dividend
----------------------------------------

The form of every dividend command is:

    dividend --source=SOURCE  --asset=[asset] --quantity-per-share=[unit_per_share]

To pay dividends in BTC, you should, for now, just use a regular Bitcoin
client, coupled with the output from `counterpartyd asset ASSET`, which
will list all of the shareholders (and their holdings) of ASSET.

    dividend --source=mtQheFaSfWELRB2MyMBaiWjdDm6ux9Ezns --quantity-per-share=1 \
    --asset=MULTIPOOLSTOCK

Market
----------------------------------------

The `market` action prints out tables of open orders, open bets, feeds,
and order matches currently awaiting Bitcoin payments from one of your
addresses. It is capable of filtering orders by assets to be bought and
sold.

Examples:

To filter the market to only show offers to sell (give) BTC:

    market --give-asset=BTC

To filter the market to only show offers to buy (get) BTC:

    market --get-asset=BTC

To filter the market to only show offers to sell BTC for XCP:

    market --give-asset=BTC --get-asset=XCP

Asset
----------------------------------------

The `asset` action displays the basic properties of a given asset.

To make [asset] callable and divisible, the command is:

    issuance --source=[address]--asset=[asset] --quantity=[quantity] --divisible --callable --call-date=[call_date] --call-price=[call_price] --description [asset_description]

To lock an asset, the command is:

    issuance --source=[source] --asset=[asset] --description=""

Address
----------------------------------------

The `address` action displays the details of all transactions involving
the Counterparty address which is its argument.

Input and Output
----------------------------------------

-   Quantities of divisible assets are written to eight decimal places.
-   Quantities of indivisible assets are written as integers.
-   All other quantities, i.e. prices, odds, leverages, feed values and
    target values, fee multipliers, are represented internally as
    fractions, but printed to four decimal places.
