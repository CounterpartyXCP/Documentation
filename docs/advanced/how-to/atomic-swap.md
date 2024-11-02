# Atomic Swap with UTXO Support

With the new `attach` and `detach` functionalities which allow you to attach and detach assets from a UTXO, it is now possible to do Atomic Swaps like Ordinals.

This guide details the different steps from opening a sell order to executing the buy order using Bitcoin Core for examples.

# Step 1: Generation of a PSBT by the seller

After attaching assets to the UTXO `$UTXO_TXID:$UTXO_VOUT`, the seller `$SELLER_ADDRESS` can decide to sell them at the price `$PRICE_BTC`. To do this, he must first prepare a “sale order” in the form of a signed PSBT:

Creation of the PSBT `$SELLER_PSBT`

```bash
$ bitcoin-cli createpsbt '[{"txid":"$UTXO_TXID", "vout":"$UTXO_VOUT"}]' \
'[{"$SELLER_ADDRESS": "$PRICE_BTC"}]'
```

Signature of PSBT

```bash
$ bitcoin-cli walletprocesspsbt $SELLER_PSBT
```

# Step 2: Dissemination of the PSBT

The seller can then share the PSBT in the way that seems most appropriate to him.

# Step 3: Generation of a PSBT by the buyer

Once collected by a potential buyer, he creates a PSBT with the inputs of the sum necessary to pay for the assets and an output for the exchange.

After having determined the list of UTXOs with the `listunspent` command, calculated the exchange `$CHANGE` and the fees, the buyer `$BUYER_ADDRESS`can create his PSBT `$BUYER_PSBT`:

```bash
$ bitcoin-cli createpsbt '[{"txid":"$UTXO1_TXID", "vout":"$UTXO2_VOUT"}, …]' \
'[{"$BUYER_ADDRESS": "$CHANGE"}]'
```

# Step 4: Joining the PSBTs of the seller and the buyer

We must now join the two PSBTs into a single PSBT `$PSBT_FINAL` with the `joinpsbts` function.

**Attention**: the `joinpsbts` function mixes the inputs and outputs randomly, you must therefore repeat the operation until the first output belongs to the buyer. Indeed, it is always the first non-OP_RETURN output which is the destination of the atomic swap.

```bash
$ bitcoin-cli joinpsbts '["$BUYER_PSBT", "$SELLER_PSBT"]'
```

# Step 5: Signature, finalization and broadcast of the transaction

Signature of `$PSBT_FINAL`

```bash
$ bitcoin-cli walletprocesspsbt $PSBT_FINAL
```

Then finalizing `$SIGNED_PSBT_FINAL`

```bash
$ bitcoin-cli finalizepsbt $SIGNED_PSBT_FINAL
```

And finally broadcast of the transaction

```bash
$ bitcoin-cli sendrawtransaction $RAWTRANSACTION
```

# Include a Counterparty transaction

It is possible to include a Counterparty transaction inside the transaction used to finalize the atomic swap. For this it is enough:

1. use the composition API with the `return_data_only` argument
2. Add the `CNTRPTY` prefix
3. Encrypt with ARC4 using the `txid` of the first input of the transaction
4. Use the `$DATA` obtained in “Step 3: Generation of a PSBT by the buyer”
    
    ```bash
    $ bitcoin-cli createpsbt '[{"txid":"$UTXO1_TXID", "vout":"$UTXO2_VOUT"}, …]' \
    '[{"$BUYER_ADDRESS": "$CHANGE"}, {"data": "$DATA"}]'
    ```
    
5. In “Step 4: Joining the PSBTs of the seller and the buyer” ensure that:
    1. The first input belongs to the buyer
    2. The first output is the OP_RETURN
    3. The second output is to the buyer

**Attention**: this only works with an OP_RETURN, the size of `$DATA` must therefore not exceed 80 bytes.