# Counterparty Exchange Integration

By adding support for Counterparty, your exchange not only gets XCP market support, but support for any other Counterparty asset (such as `Storjcoin X` and `Bitcrystals`).

Technically, the process is rather straightforward. However, as Counterparty is not a fork of Bitcoin Core, adding Counterparty support to your exchange is slightly different from adding support for a cryptocurrency that is, like Litecoin or Dogecoin.  We outline the general process below (for XCP, but the process is identical for all Counterparty assets):

## Basic Setup

- Follow the instructions [here](http://counterparty.io/docs/federated_node/) to set up a full node. You can install the `base` configuration (e.g. `fednode install base master`)

- Alternatively, you can install and configure manually. Those instructions are [here](https://github.com/CounterpartyXCP/counterparty-lib/blob/develop/README.md#manual-installation).

- Once the system is set up, get started working with `counterparty-server`'s [API](/API.md).


## Handling Deposits

- Create a XCP holding address (or several primary XCP holding addresses). The address will hold deposited XCP funds for all users using the exchange.

- Create a regular Bitcoin address for each user wanting to deposit XCP using the API of the Bitcoin Core instance that `counterparty-server` is connecting to.

- Poll for deposits using `get_sends` [API method](/API.md), filtering for `asset==XCP`, `destination==deposit_address` and `block_index<=current_block_index-number_of_desired_confirmations`. Record the quantity of the send transaction and the transaction's `txid`.

- 'Prime' the deposit address by sending it 0.0005 BTC.

- For deposit, send the quantity deposited to the holding address using the `do_send` [API method](/API.md) with the flag `unconfirmed=True` (so you don't have to wait for the priming to confirm). Record the `txid` of this transaction.

- When the second send is confirmed (poll `get_sends` again), credit the user’s account balance.


## Handling Withdrawals

- Prime the holding address if its current balance is below 0.0005 BTC.

- Send the funds to the user-provided address with `do_send`.


## Best practices

- For deposits, wait for at least two confirmations on the send to the desposit address and one confirmation for the send to the holding address.

- Keep the private key for the holding address secret and safe.

- Keep the bulk of your exchange's funds in cold storage.

- Set a maximum XCP and BTC withdrawal amount, both per day and per event.

