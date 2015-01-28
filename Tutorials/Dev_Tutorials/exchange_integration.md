# Counterparty Exchange Integration

As Counterparty is not a fork of Bitcoin Core, adding Counterparty support to your exchange is slightly different from adding support for an altcoin.  We outline the general process below (for XCP, but the process is identical for all Counterparty assets):

## Basic Setup
------------------

- Install, configure [counterparty-cli](/../../CLI/counterparty-cli.md) normally (including a patched Bitcoin Core).

- Bootstrap and start the server:
	`$ counterparty-server bootstrap`
	`$ counterparty-server start`


# Working with the API
------------------------------------

See the [API documentation](/API.md).

## Handling Deposits

- Create a single primary XCP holding address, or several primary XCP holding addresses. The address(es) will hold deposited XCP funds for all users using the exchange.
- When a user wants to deposit XCP, create a normal Bitcoin address for them (using the API of the bitcoind instance that counterparty-server is connecting to).
- Poll for deposits using `get_sends` [API method](/API.md), filtering for `asset==XCP`, `destination==deposit_address` and `block_index<=current_block_index-number_of_desired_confirmations`. For each incoming send transaction, record the quantity of the send and the txid.
- 'Prime' the deposit address by sending it .0005 BTC.
- Send the deposited XCP to the holding address. For each unique txid from a deposit, send the quantity deposited to the holding address using the `do_send` [API method](/API.md) with the flag `unconfirmed=True` (so you don't have to wait for the priming to confirm). Save the txid of this second send transaction.
- When the second send is confirmed (poll `get_sends` again) you may credit the user’s account balance on your exchange.

## Handling Withdrawals

- Prime the holding address if necessary, then send the funds to the
   user-provided address with `do_send`.


Best practices
------------------

- For deposits, wait for at least two confirmations on the send to the desposit address and one confirmation to the holding address.
- Keep the private key for the holding address secret and safe.
- Keep the bulk of your exchange's funds off-line in cold storage.
- Limit the max XCP and BTC withdrawal (both per day and per event).


# Improving performance
------------------------------------

- Add the options `api-num-threads=100` and `api-request-queue-size=500` to your server configuration.
