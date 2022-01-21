---
title: Counterblock API
---

For an overview of `counterblock`, see [here](http://counterparty.io/docs/platform_architecture/).

`counterblock` release information is available from [this link](https://github.com/CounterpartyXCP/counterblock/releases).

**Warning:** *This API documentation is INCOMPLETE. It contains errors, omissions, etc., and could change drastically at any time.*


## Connecting to the API

By default, ``counterblock`` will listen on port ``4100`` for API
requests. API requests are made via a HTTP POST request to ``/api/``, with JSON-encoded
data passed as the POST body. For more information on JSON RPC, please see the [JSON RPC specification](http://json-rpc.org/wiki/specification).


## Terms & Conventions

The API calls documented are categorized based on the `counterblock` module/plug-in they appear in. For a list of the various modules with a description of each one, see [the counterblock modules document](modules.md).

**Return Types**

* `[ ]` indicates a list of one or more items, the structure will be detailed inside the brackets if regular.
* `{ }` indicates a hash/object with the keys indicated
* `'id'` means a key named id.
* `<id>` means the key is based on some parameter. This will usually be based on the inputs to the function (for example a search parameter)
* `('key')` means an optional key that may or may not be present in the output. Usually configured by a parameter.


**wallet IDs**

An individual Counterwallet user needs a way to identify themselves to ``counterblock`` for things like storing
and retrieving their wallet preferences data, and more.

For this purpose, we define the concept of a wallet ID, which is simply the user's Counterwallet 12-word password,
double-hashed with SHA256 and converted to base 64.

## core API

These API methods are part of the core `counterblock` code, and not part of a plugin module.

### get_messagefeed_messages_by_index

**get_messagefeed_messages_by_index(message_indexes)**

Alias for counterpartyd get_messages_by_index

- **param list message_indexs:** Message IDs to fetch
- **return:** A list of messages


### get_chain_block_height

**get_chain_block_height()**

*deprecated: 1.5*
Use `get_chain_address_info`

- **return:** The height of the block chain

### get_insight_block_info

**get_insight_block_info(block_hash)**

Get block info for a specific block hash from the backend (insight, bitcoind, etc).

### get_chain_address_info

**get_chain_address_info(addresses, with_uxtos=True, with_last_txn_hashes=4)**

Get info for one or more addresses

- **parameter list addresses:** Address to query
- **parameter boolean with_uxtos:** Include Unspent
- **parameter int with_last_txn_hashes:** Include n recent confirmed transactions
- **return:** Address info
- **rtype:** [{'addr', 'info',('uxto'),('last_txns'),('block_height')}]

### get_chain_txns_status

**get_chain_txns_status**

- **param list txn_hashes:** A list of one or more txn hashes
- **return:** Transaction information
- **rtype:** [{'tx_hash', 'blockhash', 'confirmations', 'blocktime'}]

### get_last_n_messages

**get_last_n_messages(count=100)**

Return latest messaages

- **param int count:** Number of messages to return. Must be < 1000 if specified.
- **return:** A list of messages
- **rtype:** [{'raw_tx_type', ... other fields vary per tx type}]

### get_pubkey_for_address

**get_pubkey_for_address(address)**

Returns None if the address has made 0 transactions (as we wouldn't be able to get the public key)

- **returns:** String or None

### get_script_pub_key

**get_script_pub_key(tx_hash, vout_index)**


**broadcast_tx(signed_tx_hex)**

### get_raw_transactions

**get_raw_transactions(address, start_ts=None, end_ts=None, limit=500):**

Gets raw transactions for a particular address

- **param address:** A single address string
- **param start_ts:** The starting date & time. Should be a unix epoch object. If passed as None, defaults to 60 days before the end_date
- **param end_ts:** The ending date & time. Should be a unix epoch object. If passed as None, defaults to the current date & time
- **param limit:** the maximum number of transactions to return; defaults to ten thousand
- **return:** Returns the data, ordered from newest txn to oldest. If any limit is applied, it will cut back from the oldest results
- **rtype:** {id: {status, tx_hash, _divisible, _tx_index, block_index, _category, destination, tx_index, _block_time, source, asset, _command, quantity}}

####proxy_to_counterpartyd

**proxy_to_counterpartyd(method='', params={})**

- **param method:** Method name to call in counterpartyd.
- **param params:** Array of function parameters.
- **returns:** The method response from counterpartyd

Relays a request to the counterpartyd server, with the given method and params, and returns the result. See the API documentation for available methods.

**NOTE:** This method may be depreciated/removed in the future.


## assets Module API

### get_normalized_balances

**get_normalized_balances(addresses)**

This call augments counterparty's get_balances with a normalized_quantity field. It also will include any owned assets for an address, even if their balance is zero. NOTE: Does not retrieve BTC balance. Use get_address_info for that.

- **param addresses:** The addresses to retrieve balances on
- **return:** Balances are returned as a list of dicts, with each dict having the following structure:
  - address: The address with the asset balance
  - asset: The asset (e.g. "XCP")
  - owner: Set to True if this address is the owner of the asset
  - quantity: The quantity in satoshi
  - normalized_quantity: The quantity, as a human readable number 

### get_escrowed_balances

**get_escrowed_balances(addresses)**

Gets a list of address balances that are escrowed away by the protocol (either due to an open trade or bet).

- **param list addresses:** List of addresses to check
- **return:** An array of assets held in escrow
- **rtype:** `{<address of escrowee>:{<asset>:<amount>}}`

### get_assets_info

**get_assets_info(assetsList)**

Returns information on the specified assets.

- **param assetsList**: A list of one or more asset names.
- **return:** A list of dicts, one dict for each asset provided in `assetsList`:
  - asset: The name of the asset (e.g. "XCP")
  - owner: The address of the current owner of the asset
  - divisible: True if the asset is divisible, False otherwise
  - locked: True if the asset is locked, False otherwise
  - supply: The current supply of the asset
  - description: The asset's current description
  - issuer: The issuing address of the asset

### get_base_quote_asset

**get_base_quote_asset(asset1, asset2)**

Given two arbitrary assets, returns the base asset and the quote asset.

*deprecated: 1.5*
Use `get_market_info/get_market_details`

- **param asset1:** An asset
- **param asset2:** An asset
- **return:** Array
- **rtype:** `{'base_asset', 'quote_asset', 'pair_name'}`

### get_owned_assets

**get_owned_assets(addresses)**

Returns the assets owned by the addresses

- **param addresses:** An array of addresses.
- **return:** Information on owned assets
- **rtype:** [{'_change_type', 'locked', 'description', '_at_block', 'divisible', 'total_issued_normalized', '_at_block_time', 'asset', 'total_issued', 'owner', history:[]]


### get_asset_pair_market_info

**get_asset_pair_market_info(asset1=None, asset2=None, limit=50):**

 *deprecated: 1.5*
    Use `get_market_details/get_market_info`

Given two arbitrary assets, returns the base asset and the quote asset.

- **param asset1:** First asset name
- **param asset2:** Second asset name
- **param limit:** Max # of records to return
- **return:** Market info for the given pair
- **rtype:** {'24h_vol_in_btc', 'open_orders_count', 'lowest_ask', 'base_asset', 'completed_trades_count', '24h_pct_change', 'vol_quote', 'highest_bid', '24h_vol_in_xcp', 'vol_base', 'last_updated', 'quote_asset'}

### get_asset_extended_info
**get_asset_extended_info(asset)**

Returns extended asset data (i.e. that published via an external .json file, as documented [here](http://counterparty.io/docs/enhanced_asset_info/)), if available, for a specific asset.

 - **param asset:** The name of the asset (e.g. "XCP")
 - **return:** Information on the asset or False if no extended info exists. Contains the data as documented in the extended asset info JSON format, among other fields.
 - **rtype:** {}

### get_asset_history
**get_asset_history(asset, reverse=False**

Returns a list of changes for the specified asset, from its inception to the current time.

- **param asset:** The asset to retrieve a history on
- **param reverse:** By default, the history is returned in the order of oldest to newest. Set this parameter to True to return items in the order of newest to oldest.
- **return:** Changes are returned as a list of dicts, with each dict having the following format:
    - type: One of 'created', 'issued_more', 'changed_description', 'locked', 'transferred', 'called_back'
    - 'at_block': The block number this change took effect
    - 'at_block_time': The block time this change took effect
    - IF type = 'created': Has the following fields, as specified when the asset was initially created:
        - owner, description, divisible, locked, total_issued, total_issued_normalized
    - IF type = 'issued_more':
        - 'additional': The additional quantity issued (raw)
        - 'additional_normalized': The additional quantity issued (normalized)
        - 'total_issued': The total issuance after this change (raw)
        - 'total_issued_normalized': The total issuance after this change (normalized)
    - IF type = 'changed_description':
        - 'prev_description': The old description
        - 'new_description': The new description
    - IF type = 'locked': NO EXTRA FIELDS
    - IF type = 'transferred':
        - 'prev_owner': The address the asset was transferred from
        - 'new_owner': The address the asset was transferred to
    - IF type = 'called_back':
        - 'percentage': The percentage of the asset called back (between 0 and 100)

### get_balance_history
**get_balance_history(asset, addresses, normalize=True, start_ts=None, end_ts=None)**

Retrieves the ordered balance history for a given address (or list of addresses) and asset pair, within the specified date range

- **param normalize:** If set to True, return quantities that (if the asset is divisible) have been divided by 100M (satoshi).
- **return:** A list of tuples, with the first entry of each tuple being the block time (epoch TS), and the second being the new balance at that block time.
- **rtype:** `[<block time>, <balance>]`


## dex Module

### get_market_price_summary
**get_market_price_summary(asset1, asset2, with_last_trades=0)**

*deprecated: 1.5*
Use `get_market_price_history`

- **param asset1:** An asset
- **param asset2:** An asset
- **param with_last_trades:** Include last trades
- **return:** Array
- **rtype:** {'quote_asset', 'base_asset', 'market_price',('last_trades')}

### get_market_cap_history
**get_market_cap_history(start_ts=None, end_ts=None)**

- **param start_ts:** Unix timestamp (defaults to 30 days before the end timestamp)
- **param end_ts:** Unix timestamp (defaults to current timestamp)
- **return:** Array
- **rtype:** `{'base_currency':[{'data':[ts,market_cap], 'name'}]}`

### get_market_info
**get_market_info(assets)**

- **param list assets:** Assets to check
- **return:** Array
- **rtype:** {'24h_hlc_in_btc', 'extended_description', 'extended_pgpsig', 'aggregated_price_as_btc', 'price_in_btc', '24h_summary':{'vol', 'count'}, 'market_cap_in_btc', 'asset', 'price_as_xcp', '7d_history_in_btc':[[ts, price]], '24h_vol_price_change_in_xcp', 'price_in_xcp', 'extended_website', '24h_vol_price_change_in_btc', 'aggregated_price_as_xcp', 'market_cap_in_xcp', '7d_history_in_xcp':[[ts, price]], 'aggregated_price_in_btc', 'aggregated_price_in_xcp', 'price_as_btc', 'total_supply', '24h_ohlc_xcp', 'extended_image'}

### get_market_info_leaderboard
**get_market_info_leaderboard(limit=100)**

- **param limit:** Number of results to return
- **return:** Array
- **rtype:** {base_currency:[{
             '24h_ohlc_in_btc',
             'total_supply',
             'aggregated_price_in_btc',
             'price_in_btc',
             '24h_vol_price_change_in_xcp',
             'aggregated_price_in_xcp',
             '24h_summary: {'vol', 'count'},
             'price_in_xcp',
             'price_as_btc',
             'market_cap_in_btc',
             '24h_ohlc_in_xcp',
             '24h_vol_price_change_in_btc',
             'aggregated_price_as_xcp',
             'market_cap_in_xcp',
             'asset',
             'price_as_xcp',
             '7d_history_in_xcp',
             '7d_history_in_btc',
             'aggregated_price_as_btc'}]}


### get_market_price_history
**get_market_price_history(asset1, asset2, start_ts=None, end_ts=None, as_dict=False)**

Return block-by-block aggregated market history data for the specified asset pair, within the specified date range.

- **param asset1:** An asset
- **param asset2:** An asset                            .
- **param start_ts:**  Unix timestamp (defaults to 30 days before the end timestamp) 
- **param end_ts:** Unix timestamp (defaults to current timestamp)
- **param as_dict:** Return as list of list or list of dicts
- **return:** List of lists or dicts
- **rtype:** [{'block_time', 'block_index', 'open', 'high', 'low', 'close', 'vol', 'count'}]


### get_trade_history
**get_trade_history(asset1=None, asset2=None, start_ts=None, end_ts=None, limit=50)**

Gets last N of trades within a specific date range (normally, for a specified asset pair, but this can be left blank to get any/all trades).

- **param asset1:** An asset
- **param asset2:** An asset
- **param start_ts:** Unix timestamp
- **param end_ts:** Unix timestamp
- **param limit:** Number of trades to return
- **return:** Array of length `n`
- **rtype:** [{'base_quantity',
          'message_index',
          'order_match_tx1_index',
          'base_asset',
          'quote_quantity',
          'order_match_tx0_address',
          'unit_price',
          'base_quantity_normalized',
          'block_index',
          'block_time',
          'quote_quantity_normalized',
          'unit_price_inverse',
          'order_match_tx0_index',
          'order_match_id',
          'order_match_tx1_address',
          'quote_asset'}]


### get_order_book_simple
**get_order_book_simple(asset1, asset2, min_pct_fee_provided=None, max_pct_fee_required=None)**

*deprecated: 1.5*
  Use counterparty-server's `get_orders`

Easier to call version when you want all orders involving the two assets.

- **param asset1:** Asset
- **param asset2:** Asset
- **param pct_fee_provided:** A minimum fee level in satoshis
- **param pct_fee_required:** A minimum fee level in satoshis
- **return:** Object
- **rtype:** {'base_bid_book':[{'count', 'depth', 'unit_price', 'quantity'}],
  'bid_depth',
  'raw_orders:[{
  'status',
  'tx_hash',
  'give_quantity',
  '_is_online',
  'fee_provided',
  'source',
  'give_asset',
  'expire_index',
  'fee_required_remaining',
  'block_index',
  'tx_index',
  'give_remaining',
  'block_time',
  'get_asset',
  'expiration',
  'fee_required',
  'get_remaining',
  'get_quantity',
  'fee_provided_remaining'}],
  'bid_ask_median',
  'quote_asset',
  'base_asset',
  'ask_depth',
  'bid_ask_spread',
  'base_ask_book':[{'count', 'depth', 'unit_price', 'quantity'}],
  'id'}


### get_order_book_buysell
**get_order_book_buysell(buy_asset, sell_asset, pct_fee_provided=None, pct_fee_required=None)**

*deprecated: 1.5*
  Use counterparty-server's `get_orders` 


- **param buy_asset:** Asset
- **param sell_asset:** Asset
- **param pct_fee_provided:** A minimum fee level in satoshis
- **param pct_fee_required:** A minimum fee level in satoshis
- **return:** Object
- **rtype:** {'base_bid_book':[{'count', 'depth', 'unit_price', 'quantity'}],
        'bid_depth',
        'raw_orders:[{
        'status',
        'tx_hash',
        'give_quantity',
        '_is_online',
        'fee_provided',
        'source',
        'give_asset',
        'expire_index',
        'fee_required_remaining',
        'block_index',
        'tx_index',
        'give_remaining',
        'block_time',
        'get_asset',
        'expiration',
        'fee_required',
        'get_remaining',
        'get_quantity',
        'fee_provided_remaining'}],
        'bid_ask_median',
        'quote_asset',
        'base_asset',
        'ask_depth',
        'bid_ask_spread',
        'base_ask_book':[{'count', 'depth', 'unit_price', 'quantity'}],
        'id'}


### get_users_pairs
**get_users_pairs(addresses=[], max_pairs=12)**

Return asset pairs held by the addresses.

- **rtype:** [{'base_asset', 'progression', 'trend', 'price_24h', 'price', 'quote_asset'}]

### get_market_orders
**get_market_orders(asset1, asset2, addresses=[], min_fee_provided=0.95, max_fee_required=0.95)**

Returns orders for the search parameters

- **rtype:** [{'completion', 'tx_hash', 'fee_provided', 'block_index', 'price', 'tx_index', 'source', 'amount', 'block_time', 'total', 'type'}]


### get_market_trades
**get_market_trades(asset1, asset2, addresses=[], limit=100)**

Returns completed trades for the search parameters

- **rtype:** [{'status', 'match_id', 'countersource', 'block_index', 'price', 'source', 'amount', 'block_time', 'total', 'type'}]


### get_markets_list
**get_markets_list()**

Returns available markets

- **rtype:** [{'market_cap', 'base_asset', 'progression', 'supply', 'trend', 'price_24h', 'price', ' quote_divisibility', 'pos', 'volume', 'with_image', 'base_divisibility', 'quote_asset'}]


### get_market_details
**get_market_details(asset1, asset2, min_fee_provided=0.95, max_fee_required=0.95)**

Return detailed information on a market.

- **rtype:** {'base_asset','progression','supply', 'trend','price_24h', 'price','sell_orders': [{'fee_required', 'amount', 'total', 'type', 'price'}],'quote_asset_divisible','buy_orders': [{'amount', 'total', 'type', 'price', 'fee_provided'}], 'last_trades': [{'status', 'match_id', 'countersource', 'source', 'price', 'block_index', 'amount', 'block_time', 'total', 'type'}],'base_asset_infos','base_asset_divisible','quote_asset'}


## betting Module

### get_bets
**get_bets(bet_type, feed_address, deadline, target_value=None, leverage=5040)**

Returns bets with non-zero remaining counterwager for the specified search terms.

- **param bet_type:** 0, 1, 2 or 3
- **param feed_address:** An address
- **param deadline:** Unix timestamp
- **rtype:** [{'tx_hash'
'feed_address',
'wager_quantity',
'leverage',
'source',
'expire_index',
'status',
'tx_index',
'block_index',
'counterwager_quantity',
'deadline',
'expiration',
'fee_fraction_int',
'bet_type',
'counterwager_remaining',
'wager_remaining',
'target_value'
}]

### get_user_bets
**get_user_bets(addresses=[], status="open")**

- **param addresses:** List of addresses
- **param status:** "open", "filled","expired","cancelled","dropped", or "invalid"
- **rtype:** [{'tx_hash'
    'feed_address',
    'wager_quantity',
    'leverage',
    'source',
    'expire_index',
    'status',
    'tx_index',
    'block_index',
    'counterwager_quantity',
    'deadline',
    'expiration',
    'fee_fraction_int',
    'bet_type',
    'counterwager_remaining',
    'wager_remaining',
    'target_value'
    }]

### get_feed
**get_feed(address_or_url='')**

- **param address_or_url:** Feed URL or Bitcoin Address
- **rtype:** {'broadcasts':[{'status', 'tx_hash', 'locked', 'timestamp', 'source', 'text', 'tx_index', 'value', 'block_index', 'fee_fraction_int'}], 'counters':{'bets':[]}

### get_feeds_by_source
**get_feeds_by_source(addresses=[])**

- **param addresses:** Address list
- **rtype:** ```{<address>:{'errors':[], 'locked', 'info_url', 'info_data':{}, 'fetch_info_retry', 'source', 'info_status', 'fee_fraction_int', 'last_broadcast':{}}}```

### parse_base64_feed
**parse_base64_feed(base64_feed):**

Takes a base64-encoded feed and decodes it.

- **rtype:** [{'tx_hash'
  'feed_address',
  'wager_quantity',
  'leverage',
  'source',
  'expire_index',
  'status',
  'tx_index',
  'block_index',
  'counterwager_quantity',
  'deadline',
  'expiration',
  'fee_fraction_int',
  'bet_type',
  'counterwager_remaining',
  'wager_remaining',
  'target_value'
  }]


## counterwallet Module

### is_ready
**is_ready()**

Used by the client to check if the server is alive, caught up, and ready to accept requests.
If the server is NOT caught up, a 525 error will be returned actually before hitting this point. Thus,
if we actually return data from this function, it should always be true. (may change this behaviour later)

- **rtype:** Boolean

### get_reflected_host_info
**get_reflected_host_info()**

Allows the requesting host to get some info about itself, such as its IP. Used for troubleshooting.

- **return:** Client host info
- **rtype:** {'ip', 'cookie', 'country'}

### get_wallet_stats
**get_wallet_stats(start_ts=None, end_ts=None):**

If timestamps omitted, queries the last 360 days.

- **param start_ts:** Unix timestamp
- **param end_ts:** Unix timestamp
- **return:** Wallet information
- **rtype:** {'wallet_stats':[id: {'data': [{}], 'name'}], 'num_wallets_testnet', 'num_wallets_mainnet', 'num_wallets_unknown'}

### get_preferences
**get_preferences(wallet_id, for_login=False, network=None)**

Gets stored wallet preferences

- **param network:** only required if for_login is specified. One of: 'mainnet' or 'testnet'
- **returns:** A wallet preferences object:
   - **num_addresses_used** (*integer*): The number of addresses utilized in the user's wallet (this
   determines how many addresses we will deterministally generate when the user logs in).
   - **address_aliases** (*list*): A list of zero or objects, with each object having an ``address`` string property,
   being the Bitcoin base56 address, and an ``alias`` string property, being the textual alias (i.e. nickname)
   for this address. Using aliases helps make the wallet more user-friendly.
- **rtype:** Boolean

### store_preferences
**store_preferences(wallet_id, preferences)**

Stores the preferences for a given wallet ID.

- **param string wallet_id:** The wallet ID to store the preferences for.
- **param object preferences:** A wallet preferences object (see above)
- **return:** ``true`` if the storage was successful, ``false`` otherwise.

### create_armory_utx
**create_armory_utx(unsigned_tx_hex, public_key_hex)**

Used to create an offline Armory transaction for signing in Armory.

- **returns:** The signed tx hash
- **rtype:** String

### convert_armory_signedtx_to_raw_hex
**convert_armory_signedtx_to_raw_hex(signed_tx_ascii)**

Used to convert a signed armory transaction to a hex-encoded raw transaction suitable for broadcasting on the Bitcoin network.

- **returns:** The raw hash as hex
- **rtype:** String

### create_support_case
**create_support_case(name, from_email, problem, screenshot=None, addtl_info='')**

create an email with the information received

- **param screenshot:** The base64 text of the screenshot itself, prefixed with data=image/png
- **param addtl_info:** A JSON-encoded string of a dict with additional information to include in the support request


## counterwallet_iofeeds Module

### get_num_users_online
**get_num_users_online()**

- **return:** The current number of users attached to the server's chat feed
        :rtype: Int

*deprecated: 1.6.3*

### is_chat_handle_in_use
**is_chat_handle_in_use(handle)**

*deprecated: 1.6.3*

- **rtype:** Boolean

### get_chat_handle
**get_chat_handle(wallet_id)**

- **rtype:** {'handle', 'is_op', 'last_updated', 'banned_until'}

*deprecated: 1.6.3*

### store_chat_handle
**store_chat_handle(wallet_id, handle)**

*deprecated: 1.6.3*

### get_chat_history
**get_chat_history(start_ts=None, end_ts=None, handle=None, limit=1000)**

*deprecated: 1.6.3*

### is_wallet_online
**is_wallet_online(wallet_id)**

- **rtype:** Boolean

## transaction_stats Module

### get_transaction_stats
**get_transaction_stats(start_ts=None, end_ts=None)**

This function returns the number of transactions in each 24 hour clock within the given time range, or the last 360 days if no time range is given.

- **param start_ts:** Unix timestamp
- **param end_ts:** Unix timestamp
- **return:** The number of transactions in each time interval.
- **rtype:** [[`unix timestamp *in milliseconds* (e.g. 1000 * a typical unix timestamp)`, `transaction count`]]



## API Changes

This section documents any changes to the ``counterblock`` API, for version numbers where there were API-level modifications.

### 1.2.0

Removed the following API calls:

- ``record_btc_open_order``
- ``cancel_btc_open_order``

Since BTC trading was removed from Counterwallet months ago, these calls are not necessary.

### 1.1.0

Deprecated several redundant/unused functions for removal in a future version. Any code calling these functions should be re-written. Refer to the documentation of the individual functions for replacements.

- ``cancel_btc_open_order``
- ``get_asset_pair_market_info``
- ``get_base_quote_asset``
- ``get_chain_block_height``
- ``get_chat_history``
- ``get_market_price_summary``
- ``get_order_book_buysell``
- ``get_order_book_simple``
- ``is_chat_handle_in_use``
