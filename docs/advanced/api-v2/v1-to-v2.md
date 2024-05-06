---
title: API v2 Migration Guide
---

The main differences between the new v2 API and the deprecated v1 API are:

- The new API is RESTful instead of RPC-based.
- All requests use the `GET` method and so may be made easily from any browser.
- The new API has fewer filters, but is optimized for the new log-structure database architecture.

The v2 API also has HTTP Basic Authentication disabled by default.

The following is a table of equivalent endpoints to help you easily migrate to the new version:

## Table of Equivalences between API v1 and v2

### Get Ledger State

| API v1 | API v2 |
| ------ | ------ |
| `get_assets` | `/assets` <br /> `/assets/<asset>` <br /> `/events/ASSET_CREATION` <br /> `/blocks/<int:block_index>/events/ASSET_CREATION` |
| `get_balances` | `/assets/<asset>/balances` <br /> `/addresses/<address>/balances` <br /> `/addresses/<address>/balances/<asset>` <br/> `/assets/<asset>/balances/<address>` |
| `get_credits` | `/blocks/<int:block_index>/credits` <br /> `/addresses/<address>/credits` <br /> `/assets/<asset>/credits` <br /> `/events/CREDIT` <br /> `/blocks/<int:block_index>/events/CREDIT` |
| `get_debits` | `/blocks/<int:block_index>/debits` <br /> `/addresses/<address>/debits` <br /> `/assets/<asset>/debits` <br />  `/events/DEBIT` <br /> `/blocks/<int:block_index>/events/DEBIT` |
| `get_bets` | `/addresses/<feed_address>/bets` <br /> `/bets/<tx_hash>` <br /> `/events/OPEN_BET` <br /> `/blocks/<int:block_index>/events/OPEN_BET` |
| `get_bet_matches` | `/bets/<tx_hash>/matches` <br /> `/events/BET_MATCH` <br /> `/blocks/<int:block_index>/events/BET_MATCH` |
| `get_broadcasts` | `/addresses/<feed_address>/broadcasts` <br /> `/events/BROADCAST` <br /> `/blocks/<int:block_index>/events/BROADCAST` |
| `get_btcpays` | `/orders/<tx_hash>/btcpays` <br /> `/events/BTC_PAY` <br /> `/blocks/<int:block_index>/events/BTC_PAY` |
| `get_burns` |  `/addresses/<address>/burns` <br /> `/burns` <br /> `/events/BURN` <br /> `/blocks/<int:block_index>/events/BURN` |
| `get_cancels` | `/blocks/<int:block_index>/cancels` <br /> `/events/CANCEL_BET` <br /> `/blocks/<int:block_index>/events/CANCEL_BET` <br /> `/events/CANCEL_ORDER` <br /> `/blocks/<int:block_index>/events/CANCEL_ORDER` <br /> `/events/CANCEL_RPS` <br /> `/blocks/<int:block_index>/events/CANCEL_RPS` |
| `get_destructions` | `/blocks/<int:block_index>/destructions` <br /> `/events/ASSET_DESTRUCTION` <br /> `/blocks/<int:block_index>/events/ASSET_DESTRUCTION` |
| `get_dividends` | `/assets/<asset>/dividends` <br /> `/events/ASSET_DIVIDEND` <br /> `/blocks/<int:block_index>/events/ASSET_DIVIDEND` |
| `get_issuances` | `/blocks/<int:block_index>/issuances` <br /> `/assets/<asset>/issuances` <br /> `/events/ASSET_ISSUANCE` <br /> `/blocks/<int:block_index>/events/ASSET_ISSUANCE` |
| `get_orders` | `/assets/<asset>/orders` <br /> `/orders/<tx_hash>` <br /> `/events/OPEN_ORDER` <br /> `/blocks/<int:block_index>/events/OPEN_ORDER` |
| `get_order_matches` | `/orders/<tx_hash>/matches` <br /> `/events/ORDER_MATCH` <br /> `/blocks/<int:block_index>/events/ORDER_MATCH` |
| `get_sends` | `/blocks/<int:block_index>/sends` <br /> `/assets/<asset>/sends` <br /> `/addresses/<address>/sends` <br /> `/addresses/<address>/receives` <br /> `/addresses/<address>/sends/<asset>` <br /> `/addresses/<address>/receives/<asset>` <br /> `/events/SEND` <br /> `/blocks/<int:block_index>/events/SEND` <br /> `/events/MPMA_SEND` <br /> `/blocks/<int:block_index>/events/MPMA_SEND` <br /> `/events/ENHANCED_SEND` <br /> `/blocks/<int:block_index>/events/ENHANCED_SEND` |
| `get_bet_expirations` | `/blocks/<int:block_index>/expirations` <br /> `/events/BET_EXPIRATION` <br /> `/blocks/<int:block_index>/events/BET_EXPIRATION` |
| `get_order_expirations` | `/blocks/<int:block_index>/expirations` <br /> `/events/ORDER_EXPIRATION` <br /> `/blocks/<int:block_index>/events/ORDER_EXPIRATION` |
| `get_bet_match_expirations` | `/blocks/<int:block_index>/expirations` <br /> `/events/BET_MATCH_EXPIRATION` <br /> `/blocks/<int:block_index>/events/BET_MATCH_EXPIRATION` |
| `get_order_match_expirations` | `/blocks/<int:block_index>/expirations` <br /> `/events/ORDER_MATCH_EXPIRATION` <br /> `/blocks/<int:block_index>/events/ORDER_MATCH_EXPIRATION` |
| `get_bet_match_resolutions` | `/bets/<tx_hash>/resolutions` <br /> `/events/BET_MATCH_RESOLUTON` <br /> `/blocks/<int:block_index>/events/BET_MATCH_RESOLUTON` |
| `get_rps` | `/events/OPEN_RPS` <br /> `/blocks/<int:block_index>/events/OPEN_RPS` |
| `get_rpsresolves` | `/events/RPS_RESOLVE` <br /> `/blocks/<int:block_index>/events/RPS_RESOLVE` |
| `get_rps_matches` | `/events/RPS_MATCH` <br /> `/blocks/<int:block_index>/events/RPS_MATCH` |
| `get_rps_expirations` | `/blocks/<int:block_index>/expirations` <br /> `/events/RPS_EXPIRATION` <br /> `/blocks/<int:block_index>/events/RPS_EXPIRATION` |
| `get_rps_match_expirations` | `/blocks/<int:block_index>/expirations` <br /> `/events/RPS_MATCH_EXPIRATION` <br /> `/blocks/<int:block_index>/events/RPS_MATCH_EXPIRATION` |
| `get_sweeps` | `/addresses/<address>/sweeps`<br /> `/blocks/<int:block_index>/sweeps` <br /> `/events/SWEEP` <br /> `/blocks/<int:block_index>/events/SWEEP` |
| `get_dispensers` | `/assets/<asset>/dispensers` <br /> `/asset/<asset>/dispensers/<address>` <br /> `/addresses/<address>/dispensers` <br /> `/addresses/<address>/dispensers/<asset>` <br /> `/dispensers/<tx_hash>` <br /> `/events/OPEN_DISPENSER` <br /> `/blocks/<int:block_index>/events/OPEN_DISPENSER` |
| `get_dispenses` | `/blocks/<int:block_index>/dispenses` <br /> `/dispensers/<tx_hash>/dispenses` <br /> `/events/DISPENSE` <br /> `/blocks/<int:block_index>/events/DISPENSE` |
| `get_transactions` | `/blocks/<int:block_index>/transactions` <br /> `/transactions/<tx_hash>` <br /> `/events/NEW_TRANSACTION` <br /> `/blocks/<int:block_index>/events/NEW_TRANSACTION` |
| `get_messages` | `/blocks/<int:block_index>/events` <br /> `/blocks/<int:block_index>/events/<event>` <br /> `/events/<event>` |
| `get_messages_by_index` | `/events/<int:event_index>` |
| `get_supply` | `/assets/<asset>` |
| `get_xcp_supply` | `/assets/XCP` |
| `get_asset_info` | `/assets/<asset>` |
| `get_block_info` | `/blocks/<int:block_index>` <br /> `/blocks/<int:block_index>/events`  |
| `get_blocks`| `/blocks` |
| `get_asset_names` | `/assets` |
| `get_asset_longnames` | `/assets` |
| `get_holder_count` | `/assets/<asset>` |
| `get_holders` | `/assets/<asset>/holders` |
| `get_dispenser_info` | `/dispensers/<tx_hash>` |
| `get_mempool` | `/mempool/events` <br /> `/mempool/events/<event>` |
| `get_element_counts` | `/blocks/<int:block_index>/events/counts` <br /> `/events/counts` |
| `sql` | NA |

### Compose and Parse Transactions

| API v1 | API v2 |
| ------ | ------ |
| `create_bet` | `/addresses/<address>/compose/bet` |
| `create_broadcast` | `/addresses/<address>/compose/broadcast` |
| `create_btcpay` | `/addresses/<address>/compose/btcpay` |
| `create_burn` | `/addresses/<address>/compose/burn` |
| `create_cancel` | `/addresses/<address>/compose/cancel` |
| `create_destroy` | `/addresses/<address>/compose/destroy` |
| `create_dividend` | `/addresses/<address>/compose/dividend` |
| `create_issuance` | `/addresses/<address>/compose/issuance` |
| `create_order` | `/addresses/<address>/compose/order` |
| `create_send` | `/addresses/<address>/compose/send` |
| `create_rps` | N/A |
| `create_rpsresolve` | N/A |
| `create_sweep` | `/addresses/<address>/compose/sweep` |
| `create_dispenser` | `/addresses/<address>/compose/dispenser` |
| `get_tx_info` | `/transactions/info` |
| `unpack` | `/transactions/unpack` |


### Get Server State

| API v1 | API v2 |
| ------ | ------ |
| `get_running_info` | `/` |
| `/healthz` | `/healthz` |


### Backend Proxy

| API v1 | API v2 |
| ------ | ------ |
| `search_raw_transactions` | `/backend/addresses/<address>/transactions` |
| `get_oldest_tx` | `/backend/addresses/<address>/transactions/oldest` |
| `get_unspent_txouts` | `/backend/addresses/<address>/utxos` |
| `getrawtransaction` | `/backend/transactions/<tx_hash>` |
| `getrawtransaction_batch` | `/backend/transactions` |
| `search_pubkey` | `/backend/addresses/<address>/pubkey` |
| `fee_per_kb` | `/backend/estimatesmartfee` |
