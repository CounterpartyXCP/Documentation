Command-line Usage
=================

The following examples are abridged for parsimony (meaning: actions are
normally preceded by `counterparty-client`, i.e. the `burn` command would be
called with `counterparty-client burn`).

`counterparty-server` should always be running in the background (or
another console). All other commands will fail if the index of the last
block in the database is less than that of the last block seen by
Bitcoin Core.

Burn
----
*Destroy BTC to earn XCP, during an initial period of time*

The `burn` command is currently usable only on testnet because on mainnet
the burn period finished in early 2014.

* --source = the source address
* --quantity = quantity of BTC to be burned
* --fee = the exact BTC fee to be paid to miners

<!-- _)(*&_)#$ markdown bull -->

    burn --source=mtQheFaSfWELRB2MyMBaiWjdDm6ux9Ezns --quantity=0.5


Send
----------------------------------------
*Create and broadcast a `send` message*

* --source = the source address
* --destination = the destination address
* --quantity = the quantity of ASSET to send
* --asset = the ASSET of which you would like to send QUANTITY
* --fee = the exact BTC fee to be paid to miners

<!-- _)(*&_)#$ markdown bull -->

    send --source=mtQheFaSfWELRB2MyMBaiWjdDm6ux9Ezns --quantity=3 \
    --asset=BBBC --destination=n3BrDB6zDiEPWEE6wLxywFb4Yp9ZY5fHM7


Order
----------------------------------------
*Create and broadcast an `order` message*

* --source = the source address
* --get-quantity = the quantity of GET_ASSET that the source would like to receive
* --get-asset = the asset that you would like to buy
* --give-quantity = the quantity of GIVE_ASSET that the source is willing to give
* --give-asset = the asset that the source would like to sell
* --expiration = the number of blocks for which the order should be valid
* --fee-fraction-required = the miners’ fee required for an order to match 
* --fee = the exact BTC fee to be paid to miners

To make a trade that involves BTC, the `order` function requires an
extra parameter, and a second step (`btcpay`) is needed. If [address_1] is trading
[give_quantity_1] of BTC in exchange for [get_quantity_1] of [asset].


    order --source=[address_1] --give-asset=BTC --give-quantity=[give_quantity_1] \
    --get-asset=[asset] --get-quantity=[get_quantity_1] --fee-provided=[fee_provided] \
    --expiration=[expiration_1]

If [address_2] is trading [give_quantity_2] of [asset] for [get_quantity_2] of BTC:


    order --source=[address_2] --give-asset=[asset] --give-quantity=[give_quantity_2] \
    --get-asset=BTC --get-quantity=[get_quantity_2] --fee-required=[fee_required] \
    --expiration=[expiration_2]


[asset] is debited immediately from [address_2] and is held in the Counterparty 
protocol's escrow. [address_1] then must complete the trade using `btcpay` before 10
blocks have passed (or the lesser of the two `expiration` periods has passed, 
if the latter is less than 10 blocks from the time of match). After the payment 
transaction has received enough confirmations, the asset will be automatically 
released to the BTC seller by the Counterparty protocol.

The command for a `btcpay` is:


    btcpay --source=[source_address] -–order-match-id=[txhash1]+[txhash2]


    order --source=mtQheFaSfWELRB2MyMBaiWjdDm6ux9Ezns --get-quantity=10 \
    --get-asset=BTC --give-quantity=20 --give-asset=XCP --expiration=10 \
    --fee_required=0.0002


    order --source=mtQheFaSfWELRB2MyMBaiWjdDm6ux9Ezns --get-quantity=10 \
    --get-asset=BBBC --give-quantity=20 --give-asset=BTC --expiration=10 \
    --fee_provided=0.0002

For orders that do not involve BTC buy or sell, `BTCpay` is not required. 
For Sally to receive [get_quantity_1] of [get_asset_1] in exchange for 
[give_quantity_1] of [give_asset_1], the command is the following:


    order --source=[sallys_address] --give-asset=[give_asset_1] \
    --give-quantity=[give_quantity_1] --get-asset=[get_asset_1] \
    --get-quantity=[get_quantity_1] --expiration=expiration_1

In order for Alice to receive [get_quantity_2] of Sally's [give_asset_1] 
in exchange for [give_quantity_2] of [get_asset_2], the command is:


    order --source=[alices_address] --give-asset=[give_asset_2] \
    --give-quantity=[give_quantity_2] --get-asset=[get_asset_2] \
    --get-quantity=[get_quantity_2] --expiration=expiration_2

For example, Alice wants to sell 20 BBBC for 10 XCP within (expiration) 
144 bitcoin blocks (approximately 144 * 10 min = 24 hours):


    order --source=mtQheFaSfWELRB2MyMBaiWjdDm6ux9Ezns --get-quantity=10 \
    --get-asset=XCP --give-quantity=20 --give-asset=BBBC --expiration=144

Note that orders can be partially matched.    
    
BTCPay
----------------------------------------
*Create and broadcast a `BTCpay` message, to settle an Order Match for which you owe*

BTC Pay has been disabled in Counterwallet, but remains available in the
CLI (and API).

* --source = the source address
* --order-match-id = the concatenation of the hashes of the two transactions which compose the order match
* --fee = the exact BTC fee to be paid to miners

<!-- _)(*&_)#$ markdown bull -->

    btcpay --source=mtQheFaSfWELRB2MyMBaiWjdDm6ux9Ezns \
    --order-match-id=092f15d36786136c4d868c33356ec3c9b5a0c77de54ed0e96a8dbdd8af160c23

Order Match ID can be obtained with the `pending` command. The source of BTC sell 
has 6 blocks (of time after his offer has been matched) to send BTC to fund his 
side of transaction. Use the `pending` command to display own DEx order matches that
require BTCpay.

Issuance
------------------------
*Issue a new asset, issue more of an existing asset or transfer the ownership of an asset.*

* --source = the source address
* --transfer-destination = for transfer of ownership of asset issuance rights
* --quantity = the quantity of ASSET to be issued
* --asset = the name of the asset to be issued (if it’s available)
* --divisible = whether or not the asset is divisible (must agree with previous issuances)
* --description = a description of the asset (set to ‘LOCK’ to lock against further issuances with non‐zero quantitys)
* --fee = the exact fee to be paid to miners

Assets can be divisible or indivisible (the smallest unit is 1).


    issuance --source=[source] --quantity=[quantity] --asset=[asset]


    issuance --source=mtQheFaSfWELRB2MyMBaiWjdDm6ux9Ezns --quantity=100 \
    --asset='BBBQ' --divisible
    

Destroy
------------
*Destroy a quantity of a Counterparty asset*

* --source = the source address
* --asset = the ASSET of which you would like to destroy QUANTITY
* --quantity = the quantity of ASSET to destroy
* --tag = tag
* --fee = the exact BTC fee to be paid to miners


Broadcast
----------------------------------------

*Broadcast textual and numerical information to the network.*

* --source = the source address
* --text = the textual part of the broadcast (set to ‘LOCK’ to lock feed)
* --value = numerical value of the broadcast
* --fee-fraction = the fraction of bets on this feed that go to its operator
* --fee = the exact fee to be paid to miners

<!-- _)(*&_)#$ markdown bull -->

    broadcast --source=mtQheFaSfWELRB2MyMBaiWjdDm6ux9Ezns --text="Bitcoin price feed" \
    --value=825.22


**Note:** for some users counterparty-cli has trouble parsing spaces in the
`--text` argument. One workaround is to add an additional set of quotes.
For example, `--text='"Bitcoin price feed"'`. This may not work on
Windows due to Python/Windows issues unrelated to Counterparty. Another 
situation where double quotes may be required on Windows is filtering
(e.g. `--filter "source" "=" "mtQheFaSfWELRB2MyMBaiWjdDm6ux9Ezns"`).


Bet (Equal/Not Equal)
----------------------------------------
*Offer to make a bet on the value of a feed*

* --source = the source address
* --feed-address = the address which publishes the feed to bet on
* --bet-type = choices: {Equal,NotEqual}
* --deadline = the date and time at which the bet should be decided/settled
* --wager = the quantity of XCP to wager
* --counterwager = the minimum quantity of XCP to be wagered by the user to bet against you, if he were to accept the whole thing
* --target-value = target value for Equal/NotEqual bet
* --leverage = leverage, as a fraction of 5040
* --expiration = the number of blocks for which the bet should be valid
* --fee = the exact BTC fee to be paid to miners


Bet on Super Bowl Feed. Denver vs. Seattle. Feed value of 1
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
*Cancel an open order or bet you created*

* --source = the source address
* --offer-hash = the transaction hash of the order or bet
* --fee = the exact BTC fee to be paid to miners

<!-- _)(*&_)#$ markdown bull -->

    cancel --source=mtQheFaSfWELRB2MyMBaiWjdDm6ux9Ezns \
    --offer-hash=092f15d36786136c4d868c33356ec3c9b5a0c77de54ed0e96a8dbdd8af160c23


Dividend
----------------------------------------
*Pay dividends to the holders of an asset (in proportion to their stake in it)*

* --source = the source address
* --quantity-per-unit = the quantity of XCP to be paid per whole unit held of ASSET
* --asset = the asset to which pay dividends
* --dividend-asset = asset in which to pay the dividends
* --fee = the exact BTC fee to be paid to miners

To pay dividends in BTC, you should, for now, just use a regular Bitcoin
client, coupled with the output from `counterparty-cli asset ASSET`, which
will list all of the shareholders (and their holdings) of ASSET.


    dividend --source=mtQheFaSfWELRB2MyMBaiWjdDm6ux9Ezns --quantity-per-share=1 \
    --asset=MULTIPOOLSTOCK


Asset
----------------------------------------
*The `asset` action displays the basic properties of a given asset.*

    asset=[asset]

To lock an asset, the command is:


    issuance --source=[source] --asset=[asset] --description="LOCK"


Balances
----------------
*The `balances` action displays the balances of an address.*


    balances --address=mtQheFaSfWELRB2MyMBaiWjdDm6ux9Ezns


Wallet
-----------
*The `wallet` action lists the addresses in your backend wallet along with their balances in all assets.*


Pending
-----------
*The `pending` action lists pending order matches awaiting payment from you.*


Getrows
---------

*The `getrows` action gets rows from a Counterparty table.*

* --table = table name
* --filter = filters to get specific rows
* --filter-op = operator uses to combine filters
* --order-by = field used to order results
* --order-dir = direction used to order results
* --start-block = return only rows with block_index greater than start-block
* --end-block = return only rows with block_index lower than end-block
* --status = return only rows with the specified status
* --limit = number of rows to return
* --offset = number of rows to skip

<!-- _)(*&_)#$ markdown bull -->

    getrows --table balances --filter 'address' '=' 'muQjaj46wghHprjSjpgU7D55JxKyK5dJtZ'

    getrows --table balances --filter 'address' '=' 'muQjaj46wghHprjSjpgU7D55JxKyK5dJtZ' \
    --filter 'asset' '=' 'BBBQ'
    

GetInfo
---------
*The `getinfo` action gets the current state of the server.*


Market
---------------------
*Fill the screen with an always up-to-date summary of the market*

The market action prints out tables of open orders, open bets, feeds, and order matches currently awaiting Bitcoin payments from one of the user's addresses. It is capable of filtering orders by assets to be bought and sold.

To filter the market to only show offers to sell (give) BTC:


    market --give-asset=BTC

To filter the market to only show offers to buy (get) BTC:


    market --get-asset=BTC

To filter the market to only show offers to sell BTC for XCP:


    market --give-asset=BTC --get-asset=XCP


Input and Output
----------------------------------------

-   Quantities of divisible assets are written to eight decimal places.
-   Quantities of indivisible assets are written as integers.
-   All other quantities, i.e. prices, odds, leverages, feed values and
    target values, fee multipliers, are represented internally as
    fractions, but printed to four decimal places.
