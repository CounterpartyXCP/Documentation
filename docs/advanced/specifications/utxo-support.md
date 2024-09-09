# UTXO Support

# Motivations

With Ordinals, a user who does not own an Ordinal cannot create a valid Bitcoin transaction to move an Ordinal that is not in their wallet. This is because the user must possess the UTXO that holds the "sat". Unlike Ordinals, Counterparty as a metaprotcol is entirely detached from Layer-1 consensus rules—this allows Counterparty to be much more versatile and extendable. However, Ordinals, given its large community, offers Counterparty asset owners the opportunity to benefit from greater liquidity and a larger ecosystem generally. For this it is necessary to be able to **attach and detach Counterparty assets to/from UTXOs**. This will allow Counterparty assets to be compliant with the Ordinals trading transactional structure, allowing the large players in the Ordinals ecosystem to seamlessly integrate with Counterparty assets.

# Design

The `balances`, `credits` and `debits` tables, as well as the `ledger.credit()` and `ledger.debit()` functions will be modified to be able to support balances attached to UTXOs.

A new contract `utxo.py` will allow you to attach and detach assets from a UTXO. This new contract will be similar to a classic `send` except that the source and destination will be integrated into the data embedded in the transaction.

The `get_tx_info()` function will be modified to also return inputs with attached assets as well as the first non-OP_RETRUN output.

The inputs and output returned by `get_tx_info()` will be stored in the `utxos_info` field of the `transactions`  table by the `list_tx()` function.

Then the `parse_tx()` function will check that the `utxos_info` field contains entries and if so will pass them to the `utxo.move_assets()` function.

Here is the signature of the `utxo.compose()` function:

```python
def compose(db, source, destination, asset, quantity):
    """
    Compose a UTXO message.
    source: the source address or UTXO
    destination: the destination address or UTXO
    asset: the asset to transfer
    quantity: the quantity to transfer
    """
```

For convenience, two functions, as well as two distinct routes, will be made available:

```python
"/v2/addresses/<address>/compose/attach": transaction.compose_attach,
"/v2/utxos/<utxo>/compose/detach": transaction.compose_detach,
```

## Considerations

1. It is possible to attach and detach an arbitrary number of assets from an address or UTXO, however when a UTXO is used in a transaction, all assets attached to that UTXO are moved to the first UTXO non- `OP_RETURN` output of the transaction.
2. Fees in XCP, calculated using the [new Gas system](https://gist.github.com/adamkrellenstein/7c7cab257cee162233fc2ba6682eb8da), will be paid by the source address for an `attach`.
3. `utxo.move_assets()` is executed before Counterparty contracts. This means that if a UTXO with attached assets is used for a Counterparty transaction, the assets are first moved and then the Counterparty transaction executed.
4. To avoid problems due to (3), a new parameter `exclude_utxos` will be added to all transaction composition functions.
5. For each `attach` and `detach`, a row will be added to the `send` table, triggering the `ATTACH_TO_UTXO` and `DETACH_FROM_UTXO` events respectively.
6. When a UTXO is spent, a row is added to the `send` table for each asset attached to this UTXO, triggering a `UTXO_MOVE` event.
7. When assets are attached to a UTXO, it is impossible to use them for a Counterparty transaction (`order`, `send`, etc.) apart from `detach`.

## API Changes

Three new routes will be added:

```python
"/v2/addresses/<address>/compose/attach": transaction.compose_attach,
"/v2/utxos/<utxo>/compose/detach": transaction.compose_detach,
"/v2/utxos/<utxo>/compose/movetoutxo": transaction.compose_movetoutxo,
```

Balances will now contain an additional `utxo` field.

## Database Changes

A `utxo` field will be added to the `credits`, `debits` and `balances` tables. One of the two fields, `address` or `utxo` will be null. The format of the `utxo` field is `<tx_hash>:<n>` .

A `utxos_info` field will be added to the `transactions` table. This field will contain a list of UTXOs separated by spaces. The last in the list is the first non-`OP_RETURN` output of the transaction, and the previous ones, if present, are the transaction inputs with assets attached. If there is more than one, that means we need to move all the assets of the first(s) UTXO(s) to the last one.