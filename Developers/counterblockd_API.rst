counterblockd
=================

``counterblockd`` provides additional services to Counterwallet beyond those offered in the API provided by counterpartyd. It features a full-fledged JSON RPC-based API, which services Counterwallet, as well as any 3rd party services which wish to use it. ``counterblockd`` has an extensible architecture, and developers may write custom plugins for it, which are loaded dynamically and allow them to extend counterblockd with new parsing functionality, write gateways to other currencies or services, and much more.

counterblockd provides a more high-level data processing, and an API that
layers on top of counterpartyd’s API.  `counterblockd` generates and allows
querying of data such as market and price information, trade operations, asset
history, and more. It is used extensively by Counterwallet itself, and is
appropriate for use by applications that require additional API-based
functionality beyond the scope of what counterpartyd provides. 

`counterblockd` also provides a proxy-based interface to all counterpartyd API
methods, via the `proxy\_to\_counterpartyd` API call. This call is used in the
Federated Node setup so that `counterpartyd` does not have to be directly
exposed, and to allow `counterblockd` to cache counterpartyd API responses.

Such services include:

- Realtime data streaming via socket.io
- An extended API for Counterwallet-specific actions like wallet preferences storage and retrieval
- API includes functionality for retieving processed time-series data suitable for display and manipulation (useful for distributed exchange price data, and more)

`counterblockd Release Documentation <https://github.com/CounterpartyXCP/counterblockd/releases>`_

Table of Contents
--------------------------

.. contents:: **Table of Contents**


Interacting with the API
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. warning::

    This API documentation is INCOMPLETE. It contains errors, omissions, etc., and could change drastically at any time.

    
Connecting to the API
^^^^^^^^^^^^^^^^^^^^^^^

By default, ``counterblockd`` will listen on port ``4001`` for API
requests. API requests are made via a HTTP POST request to ``/api/``, with JSON-encoded
data passed as the POST body. For more information on JSON RPC, please see the `JSON RPC specification <http://json-rpc.org/wiki/specification>`__.


Terms & Conventions
^^^^^^^^^^^^^^^^^^^^^^^

**Return Types**

* `[ ]` indicates a list of one or more items, the structure will be detailed inside the brackets if regular.
* `{ }` indicates a hash/object with the keys indicated
* `'id'` means a key named id.
* `<id>` means the key is based on some parameter. This will usually be based on the inputs to the function (for example a search parameter)
* `('key')` means an optional key that may or may not be present in the output. Usually configured by a parameter.


.. _walletid:

**wallet IDs**

An individual Counterwallet user needs a way to identify themselves to ``counterblockd`` for things like storing
and retrieving their wallet preferences data, and more.

For this purpose, we define the concept of a wallet ID, which is simply the user's Counterwallet 12-word password,
double-hashed with SHA256 and converted to base 64.


.. _read_api:

Read API Function Reference
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Asset Functions
^^^^^^^^^^^^^^^

**get_asset_extended_info(asset)**

   :param asset: Asset
   :return: Information on the asset or False if no extended info exists
   :rtype: {}

**get_asset_history(asset, reverse=False**

    Returns a list of changes for the specified asset, from its inception to the current time.

    :param asset: The asset to retrieve a history on
    :param reverse: By default, the history is returned in the order of oldest to newest. Set this parameter to True to return items in the order of newest to oldest.

    :return: Changes are returned as a list of dicts, with each dict having the following format:
                * type: One of 'created', 'issued_more', 'changed_description', 'locked', 'transferred', 'called_back'
                * 'at_block': The block number this change took effect
                * 'at_block_time': The block time this change took effect

                * IF type = 'created': Has the following fields, as specified when the asset was initially created:
                  * owner, description, divisible, locked, total_issued, total_issued_normalized
                * IF type = 'issued_more':
                  * 'additional': The additional quantity issued (raw)
                  * 'additional_normalized': The additional quantity issued (normalized)
                  * 'total_issued': The total issuance after this change (raw)
                  * 'total_issued_normalized': The total issuance after this change (normalized)
                * IF type = 'changed_description':
                  * 'prev_description': The old description
                  * 'new_description': The new description
                * IF type = 'locked': NO EXTRA FIELDS
                * IF type = 'transferred':
                  * 'prev_owner': The address the asset was transferred from
                  * 'new_owner': The address the asset was transferred to
                * IF type = 'called_back':
                  * 'percentage': The percentage of the asset called back (between 0 and 100)

**get_asset_pair_market_info(asset1=None, asset2=None, limit=50):**


   *deprecated: 1.5*
      Use `get_market_details/get_market_info`

   Given two arbitrary assets, returns the base asset and the quote asset.

   :param asset1: An asset
   :param asset2: An asset
   :param limit: Max # of records to return
   :return: Market info for the given pair
   :rtype: {'24h_vol_in_btc', 'open_orders_count', 'lowest_ask', 'base_asset', 'completed_trades_count', '24h_pct_change', 'vol_quote', 'highest_bid', '24h_vol_in_xcp', 'vol_base', 'last_updated', 'quote_asset'}

**get_balance_history(asset, addresses, normalize=True, start_ts=None, end_ts=None)**

  Retrieves the ordered balance history for a given address (or list of addresses) and asset pair, within the specified date range

  :param normalize: If set to True, return quantities that (if the asset is divisible) have been divided by 100M (satoshi).
  :return: A list of tuples, with the first entry of each tuple being the block time (epoch TS), and the second being the new balance at that block time.
  :rtype: [(<block time>, <balance>)]

**get_base_quote_asset(asset1, asset2)**

  Given two arbitrary assets, returns the base asset and the quote asset.

  *deprecated: 1.5*
    Use `get_market_info/get_market_details`

  :param asset1: An asset
  :param asset2: An asset
  :return Array:
  :rtype: {'base_asset', 'quote_asset', 'pair_name'}

**get_escrowed_balance(addresses)**

  :param list addresses: List of addresses to check
  :return: An array of assets held in escrow
  :rtype: {<address of escrowee>: {<asset>:<amount>}}

**get_market_cap_history(start_ts=None, end_ts=None)**

  :param start_ts: Unix timestamp
  :param end_ts: Unix timestamp
  :return: Array
  :rtype: {'base_currency':[{'data':[ts,market_cap], 'name'}]}

**get_market_info(assets)**

  :param list assets: Assets to check
  :return: Array
  :rtype: {'24h_hlc_in_btc', 'extended_description', 'extended_pgpsig', 'aggregated_price_as_btc', 'price_in_btc', '24h_summary':{'vol', 'count'}, 'market_cap_in_btc', 'asset', 'price_as_xcp', '7d_history_in_btc':[[ts, price]], '24h_vol_price_change_in_xcp', 'price_in_xcp', 'extended_website', '24h_vol_price_change_in_btc', 'aggregated_price_as_xcp', 'market_cap_in_xcp', '7d_history_in_xcp':[[ts, price]], 'aggregated_price_in_btc', 'aggregated_price_in_xcp', 'price_as_btc', 'total_supply', '24h_ohlc_xcp', 'extended_image'}

**get_market_info_leaderboard(limit=100)**

  :param limit: Number of results to return
  :return: Array
  :rtype: {base_currency:[{
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

**get_market_details(asset1, asset2, min_fee_provided=0.95, max_fee_required=0.95)**

  Return detailed information on a market.

  :rtype: {'base_asset',
    'progression',
    'supply',
    'trend',
    'price_24h',
    'price',
    'sell_orders': [{'fee_required', 'amount', 'total', 'type', 'price'}],
    'quote_asset_divisible',
    'buy_orders': [{'amount', 'total', 'type', 'price', 'fee_provided'}],
    'last_trades': [{'status', 'match_id', 'countersource', 'source', 'price', 'block_index', 'amount', 'block_time', 'total', 'type'}],
    'base_asset_infos',
    'base_asset_divisible',
    'quote_asset'}


**get_markets_list()**

  Returns available markets

  :rtype: [{'market_cap', 'base_asset', 'progression', 'supply', 'trend', 'price_24h', 'price', ' quote_divisibility', 'pos', 'volume', 'with_image', 'base_divisibility', 'quote_asset'}]

**get_market_price_history(asset1, asset2, start_ts=None, end_ts=None, as_dict=False)**

   Return block-by-block aggregated market history data for the specified asset pair, within the specified date range.

   :param asset1: An asset
   :param asset2: An asset                            .
   :param start_ts: Unix timestamp
   :param end_ts: Unix timestamp
   :param as_dict: Return as list of list or list of dicts
   :return: List of lists or dicts
   :rtype: [{'block_time', 'block_index', 'open', 'high', 'low', 'close', 'vol', 'count'}]

**get_market_orders(asset1, asset2, addresses=[], min_fee_provided=0.95, max_fee_required=0.95)**

  Returns orders for the search parameters

  :rtype: [{'completion', 'tx_hash', 'fee_provided', 'block_index', 'price', 'tx_index', 'source', 'amount', 'block_time', 'total', 'type'}]


**get_market_price_summary(asset1, asset2, with_last_trades=0)**

  *deprecated: 1.5*
    Use `get_market_price_history`

  :param asset1: An asset
  :param asset2: An asset
  :param with_last_trades: Include last trades
  :return: Array
  :rtype: {'quote_asset', 'base_asset', 'market_price',('last_trades')}

**get_market_trades(asset1, asset2, addresses=[], limit=100)**

  Returns completed trades for the search parameters

  :rtype: [{'status', 'match_id', 'countersource', 'block_index', 'price', 'source', 'amount', 'block_time', 'total', 'type'}]

**get_normalized_balances(addresses)**

  This call augments counterpartyd's get_balances with a normalized_quantity field. It also will include any owned assets for an address, even if their balance is zero. NOTE: Does not retrieve BTC balance. Use get_address_info for that.

  :param list addresses: List of addresses to check
  :return: List
  :rtype: [{'address', 'asset', 'quantity', 'normalized_quantity', 'owner'}]

**get_order_book_buysell(buy_asset, sell_asset, pct_fee_provided=None, pct_fee_required=None)**

   *deprecated: 1.5*
      Use counterpartyd's `get_orders`


   :param buy_asset: Asset
   :param sell_asset: Asset
   :param pct_fee_provided: A minimum fee level in satoshis
   :param pct_fee_required: A minimum fee level in satoshis
   :return: Object
   :rtype: {'base_bid_book':[{'count', 'depth', 'unit_price', 'quantity'}],
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

**get_order_book_simple(asset1, asset2, min_pct_fee_provided=None, max_pct_fee_required=None)**

    *deprecated: 1.5*
      Use counterpartyd's `get_orders`

    Easier to call version when you want all orders involving the two assets.

    :param asset1: Asset
    :param asset2: Asset
    :param pct_fee_provided: A minimum fee level in satoshis
    :param pct_fee_required: A minimum fee level in satoshis
    :return: Object
    :rtype: {'base_bid_book':[{'count', 'depth', 'unit_price', 'quantity'}],
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

**get_owned_assets(addresses)**

  Returns the assets owned by the addresses

  :param addresses: An array of addresses.
  :return: Information on owned assets
  :rtype: [{'_change_type', 'locked', 'description', '_at_block', 'divisible', 'total_issued_normalized', '_at_block_time', 'asset', 'total_issued', 'owner', history:[]]

**get_users_pairs(addresses=[], max_pairs=12)**

  Return pairs held by the addresses.

  :rtype: [{'base_asset', 'progression', 'trend', 'price_24h', 'price', 'quote_asset'}]

Betting Functions
^^^^^^^^^^^^^^^^^

**get_bets(bet_type, feed_address, deadline, target_value=None, leverage=5040)**

  Returns bets with non-zero remaining counterwager for the specified search terms.

  :param bet_type: 0, 1, 2 or 3
  :param feed_address: An address
  :param deadline: Unix timestamp
  :rtype: [{'tx_hash'
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

**get_user_bets(addresses=[], status="open")**

  :param addresses: List of addresses
  :param status: "open", "filled","expired","cancelled","dropped", or "invalid"
  :rtype: [{'tx_hash'
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

**get_feed(address_or_url='')**

  :param address_or_url: Feed URL or Bitcoin Address
  :rtype: {'broadcasts':[{'status', 'tx_hash', 'locked', 'timestamp', 'source', 'text', 'tx_index', 'value', 'block_index', 'fee_fraction_int'}], 'counters':{'bets':[]}

**get_feeds_by_source(addresses=[])**

  :param addresses: Address list
  :rtype: {<address>:{'errors':[], 'locked', 'info_url', 'info_data':{}, 'fetch_info_retry', 'source', 'info_status', 'fee_fraction_int', 'last_broadcast':{}}}

**parse_base64_feed(base64_feed):**

  Takes a base64-encoded feed and decodes it.

  :rtype: [{'tx_hash'
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

Debugging/Server Functions
^^^^^^^^^^^^^^^^^^^^^^^^^^

**create_support_case(name, from_email, problem, screenshot=None, addtl_info='')**

   create an email with the information received

   :param screenshot: The base64 text of the screenshot itself, prefixed with data=image/png
   :param addtl_info: A JSON-encoded string of a dict with additional information to include in the support request

**get_chat_handle(wallet_id)**

  :rtype: {'handle', 'is_op', 'last_updated', 'banned_until'}

**get_chat_history(start_ts=None, end_ts=None, handle=None, limit=1000)**

   *deprecated: 1.5*

**get_num_users_online()**

  :return: The current number of users attached to the server's chat feed
            :rtype: Int

**get_reflected_host_info()**

  Allows the requesting host to get some info about itself, such as its IP. Used for troubleshooting.

  :return: Client host info
  :rtype: {'ip', 'cookie', 'country'}

**is_chat_handle_in_use(handle)**

  *deprecated: 1.5*
  
  :rtype: Boolean

**is_ready()**

    Used by the client to check if the server is alive, caught up, and ready to accept requests.
    If the server is NOT caught up, a 525 error will be returned actually before hitting this point. Thus,
    if we actually return data from this function, it should always be true. (may change this behaviour later)

    :rtype: Boolean



Blockchain Functions
^^^^^^^^^^^^^^^^^^^^

**get_chain_address_info(addresses, with_uxtos=True, with_last_txn_hashes=4)**

  Get info for one or more addresses

  :parameter list addresses: Address to query
  :parameter boolean with_uxtos: Include Unspent
  :parameter int with_last_txn_hashes: Include n recent confirmed transactions
  :return: Address info
  :rtype: [{'addr', 'info',('uxto'),('last_txns'),('block_height')}]


**get_chain_block_height()**

  *deprecated: 1.5*
    Use `get_chain_address_info`

  :return: The height of the block chain

**get_chain_txns_status**

  :param list txn_hashes: A list of one or more txn hashes
  :return: Transaction information
  :rtype: [{'tx_hash', 'blockhash', 'confirmations', 'blocktime'}]

**get_pubkey_for_address(address)**

  Returns None if the address has made 0 transactions (as we wouldn't be able to get the public key)

  :returns: String or None



Message Functions
^^^^^^^^^^^^^^^^^

**get_last_n_messages(count=100)**

  Return latest messaages

  :param int count: Number of messages to return. Must be < 1000 if specified.
  :return: A list of messages
  :rtype: [{'raw_tx_type', ... other fields vary per tx type}]

**get_messagefeed_messages_by_index(message_indexes)**

  Alias for counterpartyd get_messages_by_index

  :param list message_indexs: Message IDs to fetch
  :return: A list of messages

Transaction Functions
^^^^^^^^^^^^^^^^^^^^^

**get_raw_transactions(address, start_ts=None, end_ts=None, limit=500):**

      Gets raw transactions for a particular address

      :param address: A single address string
      :param start_ts: The starting date & time. Should be a unix epoch object. If passed as None, defaults to 60 days before the end_date
      :param end_ts: The ending date & time. Should be a unix epoch object. If passed as None, defaults to the current date & time
      :param limit: the maximum number of transactions to return; defaults to ten thousand
      :return: Returns the data, ordered from newest txn to oldest. If any limit is applied, it will cut back from the oldest results
      :rtype: {id: {status, tx_hash, _divisible, _tx_index, block_index, _category, destination, tx_index, _block_time, source, asset, _command, quantity}}

**get_trade_history(asset1=None, asset2=None, start_ts=None, end_ts=None, limit=50)**

    Gets last N of trades within a specific date range (normally, for a specified asset pair, but this can be left blank to get any/all trades).

    :param asset1: An asset
    :param asset2: An asset
    :param start_ts: Unix timestamp
    :param end_ts: Unix timestamp
    :param limit: Number of trades to return
    :return: Array of length `n`
    :rtype: [{'base_quantity',
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

**get_transaction_stats(start_ts=None, end_ts=None)**

   This function returns the number of transactions in each 24 hour clock within the given time range, or the last 360 days if no time range is given.

   :param start_ts: Unix timestamp
   :param end_ts: Unix timestamp
   :return: The number of transactions in each time interval.
   :rtype: [[`unix timestamp *in milliseconds* (e.g. 1000 * a typical unix timestamp)`, `transaction count`]]


Wallet Functions
^^^^^^^^^^^^^^^^


**get_preferences(wallet_id, for_login=False, network=None)**

   Gets stored wallet preferences

   :param network: only required if for_login is specified. One of: 'mainnet' or 'testnet'
   :returns: True if no error
   :rtype: Boolean



**get_wallet_stats(start_ts=None, end_ts=None):**

   If timestamps omitted, queries the last 360 days.

   :param start_ts: Unix timestamp
   :param end_ts: Unix timestamp
   :return: Wallet information
   :rtype: {'wallet_stats':[id: {'data': [{}], 'name'}], 'num_wallets_testnet', 'num_wallets_mainnet', 'num_wallets_unknown'}

**is_wallet_online(wallet_id)**

  :rtype: Boolean


Armory/UTC Functions
^^^^^^^^^^^^^^^^^^^^

**create_armory_utx(unsigned_tx_hex, public_key_hex)**

   :returns: The signed tx hash
   :rtype: String

**convert_armory_signedtx_to_raw_hex(signed_tx_ascii)**

   :returns: The raw hash as hex
   :rtype: String

Action/Write API Function Reference
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


**cancel_btc_open_order(wallet_id, order_tx_hash)**

    *deprecated: 1.5*


**proxy_to_counterpartyd(method='', params={})**

  :param method: Method name to call in counterpartyd.
  :param params: Array of function parameters.
  :returns: The method response from counterpartyd

  Relays a request to the counterpartyd server, with the given method and params, and returns the result. See the `counterpartyd API documentation <http://counterpartyd.readthedocs.org/en/latest/API.html>`_ for available methods.

**record_btc_open_order(wallet_id, order_tx_hash)**

  Records an association between a wallet ID and order TX ID for a trade where BTC is being SOLD, to allow
  buyers to see which sellers of the BTC are "online" (which can lead to a better result as a BTCpay will be required
  to complete any trades where BTC is involved, and the seller (or at least their wallet) must be online for this to happen.

**store_chat_handle(wallet_id, handle)**

**store_preferences(wallet_id, preferences)**

   Stores the preferences for a given wallet ID.

   :param string wallet_id: The wallet ID to store the preferences for.
             :param object preferences: A wallet-preferences-object_
   :return: ``true`` if the storage was successful, ``false`` otherwise.



Objects
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The API calls documented can return any one of these objects.


.. _wallet-preferences-object:

Wallet Preferences Object
^^^^^^^^^^^^^^^^^^^^^^^^^^

An object that stores the Counterwallet preferences for the given wallet ID.

* **num_addresses_used** (*integer*): The number of addresses utilized in the user's wallet (this
  determines how many addresses we will deterministally generate when the user logs in).
* **address_aliases** (*list*): A list of zero or objects, with each object having an ``address`` string property,
  being the Bitcoin base56 address, and an ``alias`` string property, being the textual alias (i.e. nickname)
  for this address. Using aliases helps make the wallet more user-friendly.



API Changes
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This section documents any changes to the ``counterblockd`` API, for version numbers where there were API-level modifications.

1.5
^^^^^^^^^^^^^^^^^^^^^^^^^^


**Summary:** Deprecated several redundant/unused functions for removal in a future version. Any code calling these functions should be re-written. Refer to the documentation of the individual functions for replacements.

* ``cancel_btc_open_order``
* ``get_asset_pair_market_info``
* ``get_base_quote_asset``
* ``get_chain_block_height``
* ``get_chat_history``
* ``get_market_price_summary``
* ``get_order_book_buysell``
* ``get_order_book_simple``
* ``is_chat_handle_in_use``
