# Taproot Envelope

The new `taproot` encoding allows embedding Counterparty data in transaction witnesses. It uses an envelope script similar to Ordinals.

Main Advantages:

- Ability to embed up to 400Kb of data,
- Benefit from reduced transaction fees (witnesses being 4 times cheaper than the rest of the transaction)

Main Disadvantages:

- The need to broadcast two transactions: a Commit transaction and a Reveal transaction
- The difficulty of signing the second Reveal transaction.

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

## MIME type validation

The set of MIME types accepted in `description` / `text` is validated by the consensus parser. Two regimes coexist:

- **Pre-`extended_mime_types_support`**: validation uses Python's built-in `mimetypes._types_map_default` (~92 stable defaults). Platform-specific entries from `/etc/mime.types` or the Windows registry are NOT loaded.
- **Post-`extended_mime_types_support`**: validation uses a deterministic hard-coded allow-list (`EXTENDED_MIME_TYPES_VALID`) defined in `counterpartycore/lib/utils/helpers.py`. This list MUST be byte-identical across nodes, operating systems and Python builds — `mimetypes.init()` is never called on this path because it would read `/etc/mime.types` (Unix) / the Windows registry and could fork consensus (the set of accepted types varied per node: ~799 on macOS without `/etc/mime.types`, ~1000+ on Ubuntu, ~200 on Alpine).

The post-gate allow-list covers:

- Python's built-in `mimetypes._types_map_default` (~92 types) so the legacy pre-gate behaviour does not regress.
- The textual `application/*` types tracked in `TEXTUAL_APPLICATION_MIME_TYPES`.
- The ordinal-inscription staples (`audio/ogg`, `audio/wav`, `audio/flac`, `image/webp`, `image/apng`, `model/stl`, `model/gltf-binary`, etc.) since the immediate motivation for this protocol change is to permit ord-style inscriptions whose MIME types are not all in Python's built-in defaults.

After the gate activates, two additional accommodations are made for ordinals-style content:

- **MIME parameters are tolerated**: anything after the first `;` is stripped before validation. For instance `audio/ogg;codecs=opus` is normalised to `audio/ogg` for both classification and allow-list lookup.
- **The `+json` structured suffix is treated as textual** (alongside `text/*`, `message/*` and `+xml`), so e.g. `application/ld+json` is classified as text. Types in `TEXTUAL_APPLICATION_MIME_TYPES` are also classified as text.

Anything else (including non-string `mime_type` values produced by malformed CBOR payloads) is classified as `binary`, meaning the content is treated as raw hex.

## Ordinals provenance metadata (CBOR map under tag `0x05`)

In a standard ord-style envelope, the bytes pushed under tag `0x05` form a CBOR **array** whose first element is the Counterparty `message_type_id` (see [Data encoding](./counterparty-data-encoding.md#taproot-witness-encoding-commit--reveal)). To allow the same inscription to also carry ordinals-native provenance metadata (the kind shown on ordinals.com) without doubling the on-chain footprint, a second shape is accepted under the gate `ordinals_metadata_support`:

- The `0x05` payload MAY be a CBOR **map** instead of an array.
- The Counterparty message MUST be the value of the ASCII key `"xcp"` (case-sensitive `Value::Text("xcp")`) and MUST itself be a non-empty CBOR array whose first element is the integer `message_type_id`, identical to the legacy array shape.
- Every other key in the map is ordinals provenance metadata and is **ignored** by the consensus parser. It can carry arbitrary CBOR that ordinals indexers will display.
- Pre-gate, a `0x05` payload that decodes to a CBOR map (rather than an array) is rejected with `Expected CBOR array, found different type`. Post-gate, that same payload is accepted as long as it contains an `"xcp"` array.

When the parser extracts the `"xcp"` array, it strips the first element as `message_type_id`, appends `mime_type` (and the optional content bytes) to the remaining elements, and re-encodes via `serde_cbor::to_vec`. The resulting binary payload is **byte-identical** to what the legacy `[type_id, ...]` array shape would have produced for the same Counterparty message. `serde_cbor::Value::Map` is backed by a `BTreeMap`, so duplicate keys are deduplicated deterministically (last-write-wins) and identical across nodes pinned to the same crate version.

Failure modes (post-gate) of an ord-style map payload:

- `xcp` key missing → `No xcp key found in metadata map`.
- `xcp` value is not a CBOR array → `xcp key in metadata map is not an array`.
- `xcp` value is an empty array → `xcp array in metadata is empty`.

## Signature

The first transaction is signed in the classic way, you can use the fields `lock_scripts` and `inputs_values` to sign it without using an external service (Electrs or Bitcoin Core).

The second transaction is already signed, you just need to broadcast it after the first one.
