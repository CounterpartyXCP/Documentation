# Taproot Envelope

The new `taproot` encoding allows embedding Counterparty data in transaction witnesses. It uses an envelope script similar to Ordinals.
Main Advantages:
- Ability to embed up to 400Kb of data
- Benefit from reduced transaction fees (witnesses being 4 times cheaper than the rest of the transaction)
Main Disadvantages:
- The need to broadcast two transactions: a Commit transaction and a Reveal transaction
- The difficulty of signing the second Reveal transaction
The Counterparty API makes this entire process smooth and easy by directly returning a Reveal transaction signed with a random key.

## Composition

To compose a transaction with the new format, you must use the parameter `encoding=taproot`.
When this encoding is used, the Composer returns an additional field:
- `signed_reveal_rawtransaction` which contains the signed Reveal transaction in hex format

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

To use the format compatible with Ordinals, you need to pass the parameter `inscription=true`.

## Signature

The first transaction is signed in the classic way, you can use the fields `lock_scripts` and `inputs_values` to sign it without using an external service (Electrs or Bitcoin Core).

The second transaction is already signed, you just need to broadcast it after the first one.
