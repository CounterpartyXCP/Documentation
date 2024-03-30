---
title: Exchange Integration
---

## Handling Deposits using Separate Addresses

- Create a XCP holding address (or several primary XCP holding addresses). The address will hold deposited XCP funds for all users using the exchange.

- Create a regular Bitcoin address for each user wanting to deposit XCP using the API of the Bitcoin Core instance that `counterparty-server` is connecting to.

- Poll for deposits using `get_sends`, filtering for `asset==XCP`, `destination==deposit_address` and `block_index<=current_block_index-number_of_desired_confirmations`. Record the quantity of the send transaction and the transaction's `txid`.

- 'Prime' the deposit address by sending it 0.0005 BTC.

- For deposit, send the quantity deposited to the holding address using the `do_send` with the flag `unconfirmed=True` (so you don't have to wait for the priming to confirm). Record the `txid` of this transaction.

- When the second send is confirmed (poll `get_sends` again), credit the user’s account balance.


## Handling Deposits using Memo Transactions

- Create a XCP deposit address. The address will hold deposited XCP funds for all users using the exchange.

- 'Prime' the deposit address by sending it small amount of BTC.

- Make the deposit address require a memo by broadcasting `OPTIONS 1` from that address.  The value and fee_fraction can be 0.

- When a user wishes to deposit to your exchange, generate a unique hexadecimal invoice ID for the deposit and convey that to the user.  The user must send counterparty assets into the address along with the matching invoice ID in the memo field.  If the user fails to include a memo, the send will be rejected by the network and the user's address will retain the assets they sent.

- Poll for deposits using `get_sends`, filtering for `asset==XCP`, `destination==deposit_address` and `block_index<={current_block_index-number_of_desired_confirmations}` and `memo_hex=={invoice_id}`. Record the quantity of the send transaction and the transaction's `txid`.

- When the send is confirmed with 2 confirmations (poll `get_sends` again), credit the user’s account balance.

- Memo transactions are available as of block 489956

## Handling Withdrawals (Single Send)

- Prime the holding address if its current balance is below 0.0005 BTC.

- Send the funds to the user-provided address with `create_send` (Counterparty API).

## Batching Withdrawals (Multi-Peer-Multi-Asset Send)

- Prime the holding address if its current balance is below 0.0005 BTC.

- Generate first MPMA transaction by making a `create_send` (Counterparty API) call and specify as many assets and recipient addresses as you would like.

- Sign and Broadcast first MPMA transaction and note `txid`

- Generate second MPMA transaction by making identical `create_send` (Counterparty API) call as before, except also specify `p2sh_pretx_txid` param and give `txid` of first MPMA transaction

- Sign and Broadcast second MPMA transaction

## Best practices

- For deposits, wait for at least two confirmations on the send to the desposit address and one confirmation for the send to the holding address.

- Keep the private key for the holding address secret and safe.

- Keep the bulk of your exchange's funds in cold storage.

- Set a maximum XCP and BTC withdrawal amount, both per day and per event.

- Use a segwit address for memo deposits and MPMA/Batched withdrawals to keep transaction costs minimal.
