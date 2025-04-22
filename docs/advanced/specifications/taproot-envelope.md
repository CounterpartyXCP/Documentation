# Taproot Envelope

The new `taproot` encoding allows embedding Counterparty data in transaction witnesses. It uses an envelope script similar to Ordinals.
Main Advantages:
- Ability to embed up to 400Kb of data
- Benefit from reduced transaction fees (witnesses being 4 times cheaper than the rest of the transaction)
Main Disadvantages:
- The need to broadcast two transactions: a Commit transaction and a Reveal transaction
- The difficulty of signing the second Reveal transaction
This document explains how to use the new encoding and how to sign the Reveal transaction.

## Composition

To compose a transaction with the new format, you must use the parameter `encoding=taproot`.
When this encoding is used, the Composer returns two additional fields:
- `reveal_rawtransaction` which contains the unsigned Reveal transaction in hex format
- `envelope_script` the envelope script necessary to sign the `reveal_rawtransaction`

### Compatibility with Ordinals

Counterparty uses two different envelope script formats:

- A first format optimized for size and not compatible with Ordinals
- A second format totally compatible with Ordinals inscriptions

The second format is automatically used with the following transactions:

- Issuance
- Fairminter
- Broadcast

For issuances and fairminter, the `description` parameter is used as the content of the Ordinals inscription. For broadcasts, it's the `text` parameter that is used.

These 3 transactions accept a new parameter `mime_type`. By default, this parameter is equal to `text/plain`. If the MIME type designates a binary file (for example, a PNG image), the content of `description` or `text` must be in hexadecimal format.

It is possible to prevent the automatic use of the format compatible with Ordinals by using the parameter `inscription=false`.

## Signature

The first transaction is signed in the classic way, you can use the fields `lock_scripts` and `inputs_values` to sign it without using an external service (Electrs or Bitcoin Core).

To sign the second transaction, you must follow these steps:

1. Retrieve the amount and script_pubkey of the input of the Reveal transaction. For this, you need to retrieve the info of the first output of the Commit transaction.
2. Retrieve the public key and private key of the source address that signed the Commit transaction.
3. Calculate the parity of the Commit address corresponding to the script_pubkey retrieved in step 1. You can also use the public key and envelope script to calculate this parity.
4. Build the Control Block using the public key, the envelope script, and the parity.
5. Sign the input of the Reveal transaction, whose script_pubkey and amount were retrieved in the first step, with the private key.
6. Add the signature, envelope script, and control block to the witnesses of the first input of the Reveal transaction.

## Examples

### Python

```python
def signe_taproot_reveal_tx(source_private_key, envelope_script_hex, reveal_rawtransaction):
    source_pubkey = source_private_key.get_public_key()
    commit_address = source_pubkey.get_taproot_address([[envelope_script]])
    tx_in = TxInput("F" * 64, 0)
    # use source address as output
    reveal_tx = Transaction.from_raw(reveal_rawtransaction)
    # sign the input containing the inscription script
    envelope_script = Script.from_raw(envelope_script_hex)
    sig = private_key.sign_taproot_input(
        reveal_tx,
        0,
        [commit_address.to_script_pub_key()],
        [config.DEFAULT_SEGWIT_DUST_SIZE],
        script_path=True,
        tapleaf_script=envelope_script,
        tweak=True,
    )
    # generate the control block
    control_block = ControlBlock(
        source_pubkey,
        scripts=[envelope_script],
        index=0,
        is_odd=commit_address.is_odd(),
    )
    # add the witness to the transaction
    reveal_tx.witnesses.append(
        TxWitnessInput([sig, envelope_script.to_hex(), control_block.to_hex()])
    )
    return reveal_tx, outputs_value
```

### JavaScript

```javascript

async function signTaprootRevealTx(sourcePrivateKey, envelopeScriptHex, revealRawtransaction) {
  // Import necessary Bitcoin libraries
  const bitcoin = require('bitcoinjs-lib');
  const { networks, Psbt, script, crypto, payments } = bitcoin;
  const ecc = require('tiny-secp256k1');
  bitcoin.initEccLib(ecc);
  
  // Get the public key from the private key
  const sourcePubkey = bitcoin.ECPair.fromPrivateKey(sourcePrivateKey).publicKey;
  
  // Parse the envelope script
  const envelopeScript = Buffer.from(envelopeScriptHex, 'hex');
  
  // Create the taproot tree with the envelope script
  const scriptTree = {
    output: envelopeScript,
    version: 0xc0, // Tapscript version
  };
  
  // Create the Taproot output with the script tree
  const commitAddress = payments.p2tr({
    internalPubkey: sourcePubkey.slice(1, 33), // Remove the prefix byte
    scriptTree,
    network: networks.bitcoin
  });
  
  // Get the script path control block
  const controlBlock = Buffer.concat([
    Buffer.from([commitAddress.witness[0] & 1 ? 0xc1 : 0xc0]), // Control byte with parity
    sourcePubkey.slice(1, 33) // Internal pubkey (x-only)
  ]);
  
  // Parse the reveal transaction
  let revealTx = bitcoin.Transaction.fromHex(revealRawtransaction);
  
  // Create a new PSBT
  const psbt = new Psbt({ network: networks.bitcoin });
  
  // Add the input with the taproot script path spend
  psbt.addInput({
    hash: revealTx.ins[0].hash,
    index: revealTx.ins[0].index,
    witnessUtxo: {
      script: commitAddress.output,
      value: 546, // SEGWIT_DUST_SIZE
    },
    tapLeafScript: [
      {
        leafVersion: 0xc0,
        script: envelopeScript,
        controlBlock: controlBlock
      }
    ]
  });
  
  // Add the output from the reveal transaction
  for (const out of revealTx.outs) {
    psbt.addOutput({
      script: out.script,
      value: out.value
    });
  }
  
  // Create a signer from the private key
  const signer = bitcoin.ECPair.fromPrivateKey(sourcePrivateKey);
  
  // Sign the input
  psbt.signInput(0, signer);
  
  // Finalize the input
  psbt.finalizeInput(0);
  
  // Extract the transaction
  const signedRevealTx = psbt.extractTransaction().toHex();
  
  return {
    signedRevealTx,
    outputsValue: revealTx.outs.map(out => out.value)
  };
}
```