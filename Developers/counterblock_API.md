#counterblock API

For an overview of `counterblock`, see [here](http://counterparty.io/docs/platform_architecture/).
`counterblock` release information is available from [this link](https://github.com/CounterpartyXCP/counterblock/releases>)

**Warning:** *This API documentation is INCOMPLETE. It contains errors, omissions, etc., and could change drastically at any time.*

##Table of Contents
[TOC]

###Connecting to the API

By default, ``counterblock`` will listen on port ``4001`` for API
requests. API requests are made via a HTTP POST request to ``/api/``, with JSON-encoded
data passed as the POST body. For more information on JSON RPC, please see the [JSON RPC specification](http://json-rpc.org/wiki/specification).


###Terms & Conventions

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


###API Reference

The API calls below are categorized based on the `counterblock` module/plug-in they appear in.


####assets Module API

**get_normalized_balances(addresses)**

This call augments counterparty's get_balances with a normalized_quantity field. It also will include any owned assets for an address, even if their balance is zero. NOTE: Does not retrieve BTC balance. Use get_address_info for that.

- **param addresses:** The addresses to retrieve balances on
- **return:** Balances are returned as a list of dicts, with each dict having the following structure:
  - address: The address with the asset balance
  - asset: The asset (e.g. "XCP")
  - owner: Set to True if this address is the owner of the asset
  - quantity: The quantity in satoshi
  - normalized_quantity: The quantity, as a human readable number 

**get_escrowed_balance(addresses)**

Gets a list of address balances that are escrowed away by the protocol (either due to an open trade or bet).

- **param list addresses:** List of addresses to check
- **return:** An array of assets held in escrow
- **rtype:** `{<address of escrowee>:{<asset>:<amount>}}`

**get_base_quote_asset(asset1, asset2)**

Given two arbitrary assets, returns the base asset and the quote asset.

*deprecated: 1.5*
Use `get_market_info/get_market_details`

- **param asset1:** An asset
- **param asset2:** An asset
- **return:** Array
- **rtype:** `{'base_asset', 'quote_asset', 'pair_name'}`


###API Changes

This section documents any changes to the ``counterblock`` API, for version numbers where there were API-level modifications.

####1.5


**Summary:** Deprecated several redundant/unused functions for removal in a future version. Any code calling these functions should be re-written. Refer to the documentation of the individual functions for replacements.

- ``cancel_btc_open_order``
- ``get_asset_pair_market_info``
- ``get_base_quote_asset``
- ``get_chain_block_height``
- ``get_chat_history``
- ``get_market_price_summary``
- ``get_order_book_buysell``
- ``get_order_book_simple``
- ``is_chat_handle_in_use``
