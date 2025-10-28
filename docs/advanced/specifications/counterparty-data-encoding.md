# Data encoding

#### Overview
- **Assumptions**: All protocol changes are enabled. Prefix is `CNTRPRTY`.
- **Coverage**: OP_RETURN and Taproot encoding only.
- **Message envelope**: `[message_type_id] || payload`
  - With short IDs enabled: 1 byte if 0 < ID < 256; otherwise 4 bytes big‑endian.

### OP_RETURN encoding (legacy and non‑segwit data)
- **Where**: a single `OP_RETURN <PUSHDATA>` output.
- **ARC4 key**: the first input txid (vin[0].txid) as standard hex decoded to bytes.
- **Encoding** (compose): `ARC4(key, (PREFIX || message))`
- **Decoding**:
  1) If `opreturn_push_bytes` is exactly `CNTRPRTY` (literal, not encrypted): this is a Taproot commit marker; actual data is in the reveal transaction witness (see below).
  2) Else compute `plain = ARC4(key, opreturn_push_bytes)`.
  3) If `plain` starts with `PREFIX (CNTRPRTY)`, then `message = plain[8:]`.

### Taproot witness encoding (commit + reveal)
- Two‑tx flow:
  - **Commit tx**: sends to a P2TR address whose script tree includes the envelope script (no OP_RETURN here).
  - **Reveal tx**: spends the commit UTXO; includes an `OP_RETURN` output with literal `CNTRPRTY` and carries the envelope script in the witness.

- Two envelope styles are supported in the witness script:
  - **Ordinals “xcp” envelope (preferred when a contract carries content)**
    - Script form:
      - `OP_FALSE OP_IF "ord" 0x07 "xcp" 0x01 <mime_type> 0x05 <CBOR metadata chunks...> (OP_0|OP_FALSE|empty) <content chunks...> OP_ENDIF <xonly_pubkey> OP_CHECKSIG`
    - Extraction:
      - Concatenate all CBOR metadata chunks; decode to a CBOR array.
      - The first element is `message_type_id` (uint). Remove it. Append `mime_type` (text) and optional `content` (raw bytes) to the array.
      - Re‑encode the modified array as CBOR and prefix with one byte `message_type_id` → final `message` bytes.
    - When used: the composer emits this style only if `inscription=true` and the message type is one of issuance (standard/subasset, including LR variants), broadcast or fairminter, and the provided content is non‑empty; otherwise it falls back to the generic envelope.
  - **Generic inscription envelope**
    - Script form: `OP_FALSE OP_IF <data chunks...> OP_ENDIF <xonly_pubkey> OP_CHECKSIG`
    - Extraction: concatenate all pushed chunks between `OP_IF` and `OP_ENDIF` → final `message` bytes.

### Message IDs and payload formats (taproot_support enabled)
All payloads below are CBOR arrays unless noted.

- **Enhanced send** (`ID = 2`)
  - `[asset_id:uint64, quantity:int, short_address_bytes:21, memo:bytes]`

- **Sweep** (`ID = 4`)
  - `[short_address_bytes:21, flags:uint8, memo:bytes]`

- **Issuance (standard)** (`IDs = 20, 22` accepted)
  - `[asset_id:uint64, quantity:int, divisible:bool, lock:bool, reset:bool, mime_type:text, description:bytes|null]`

- **Issuance (subasset)** (`IDs = 21, 23` accepted)
  - `[asset_id:uint64, quantity:int, divisible:int(0|1), lock:int(0|1), reset:int(0|1), compacted_subasset_length:int, compacted_subasset_longname:bytes, mime_type:text, description:bytes|null]`

- **Broadcast** (`ID = 30`)
  - `[timestamp:int, value:float, fee_fraction_int:uint32, mime_type:text, text:bytes]`

- **Fairminter (v2)** (`ID = 90`)
  - `[asset_id:uint64, asset_parent_id:uint64(0 if none), price:int, quantity_by_price:int, max_mint_per_tx:int, max_mint_per_address:int, hard_cap:int, premint_quantity:int, start_block:int, end_block:int, soft_cap:int, soft_cap_deadline_block:int, minted_asset_commission_int:int(1e8), burn_payment:bool, lock_description:bool, lock_quantity:bool, divisible:bool, mime_type:text, description:bytes]`

- **Fairmint (v2)** (`ID = 91`)
  - `[asset_id:uint64, quantity:int]`

- **Attach** (`ID = 101`) — not CBOR
  - Payload is UTF‑8 string: `"asset|quantity|destination_vout"` (destination_vout may be empty).

- **Detach (bulk from UTXO)** (`ID = 102`) — not CBOR
  - Payload is either a UTF‑8 destination address or the single byte `0x30` (string "0") meaning no explicit destination (credit back to the UTXO’s address per asset balance).

- **Order** (`ID = 10`) — legacy struct
  - Binary struct `>QQQQHQ` = `[give_id:uint64, give_quantity:int64, get_id:uint64, get_quantity:int64, expiration:uint16, fee_required:int64]`

- **BTC Pay** (`ID = 11`) — legacy struct
  - Binary struct `>32s32s` = `[tx0_hash:32 bytes, tx1_hash:32 bytes]` (order_match_id is derived from these)

- **Dispenser** (`ID = 12`) — legacy struct + optional packed addresses
  - Binary struct `>QQQQB` = `[asset_id:uint64, give_quantity:int64, escrow_quantity:int64, satoshirate:int64, status:uint8]`
  - Optionally followed by `action_address` (21‑byte packed address) and optionally `oracle_address` (21‑byte packed address) depending on status and protocol flags.

- **Dispense** (`ID = 13`) — minimal
  - Payload bytes: `0x00` (a single zero byte), BTC amount is carried in the Bitcoin output; matching against dispenser state determines asset quantity dispensed.

- **Dividend** (`ID = 50`) — legacy struct
  - If `new_dividend_format` active: `>QQQ` = `[quantity_per_unit:int64, asset_id:uint64, dividend_asset_id:uint64]`
  - Else: `>QQ` = `[quantity_per_unit:int64, asset_id:uint64]` and `dividend_asset = XCP`.

- **Cancel** (`ID = 70`) — legacy struct
  - `>32s` = `[offer_hash_bytes:32]` where offer can be an order or a bet.

- **Destroy** (`ID = 110`) — legacy struct with trailing tag
  - `>QQ` = `[asset_id:uint64, quantity:int64]` followed by an optional tag (bytes, up to 34, truncated).

- **MPMA send** (`ID = 3`) — custom binary bitstream (not CBOR)
  - **Purpose**: batch multiple sends across one or more assets with compact addressing.
  - **Top‑level layout**: `[LUT] || [BITSTREAM]`
  - **LUT (address lookup table)**:
    - `num_addresses:uint16 (big‑endian)` then `num_addresses × short_address` (21 bytes each), where short_address is `address.pack_legacy(addr)`.
    - `nbits = ceil(log2(num_addresses))` (if `num_addresses == 1`, then `nbits = 0`).
  - **BITSTREAM**:
    - `global_memo_present:1`
      - If 1: `global_memo_is_hex:1`, `global_memo_len:6`, `global_memo:len bytes` (UTF‑8 if not hex; raw bytes if hex).
    - Zero or more send‑groups, each prefixed by a `1` bit; terminated by a single `0` bit; then zero padding to the next byte boundary.
    - Send‑group payload:
      - `asset_id:uint64 (big‑endian)`
      - `recipients_minus_one:nbits` (omitted if `nbits==0`, implying exactly 1 recipient)
      - For each recipient (count = `recipients_minus_one + 1`, or 1 when `nbits==0`):
        - `lut_index:nbits` (omitted if `nbits==0`, implied 0)
        - `quantity:uint64 (big‑endian)`
        - `memo_present:1`; if 1 then `memo_is_hex:1`, `memo_len:6`, `memo:memo_len bytes` (UTF‑8 if not hex; raw bytes if hex)
  - **Semantics**:
    - Destinations are referenced by LUT indices; the LUT lists unique destinations sorted lexicographically.
    - Assets are grouped by `asset_id`; groups are typically emitted in lexicographic order of asset names at compose time (order is not required for decoding).
    - A global memo (if present) is applied to recipients that do not carry a per‑recipient memo.
    - Only legacy short‑encodable destinations are supported (no Taproot/P2TR).
  - **Decoding**: `_decode_mpma_send_decode` implements the above and yields `{asset_name: [(addr, quantity[, memo_bytes])...]}`.

Notes:
- Where a field is `bytes` and represents human text, the composer uses the declared `mime_type` to pack/unpack. Your parser can treat it as raw bytes and, if desired, decode using `mime_type`.
- `short_address_bytes` is a fixed 21‑byte packed address format used by Counterparty (pack/unpack is outside this spec).

### Converting asset_id ↔ asset name

**Rules (all protocol changes enabled)**:
- `0 → BTC`, `1 → XCP`
- If `asset_id ≥ 26^12 + 1`: numeric asset → `"A" + str(asset_id)`
- Else if `asset_id ≥ 26^3`: alphabetic base-26 using digits A..Z (1-based, like Excel columns)
- Names starting with `"A"` are numeric and map directly to their `asset_id`; other names map via base-26

### Decoding short_address_bytes (variable length) to full address

**Format (all protocol changes enabled)**:

#### Generalized tags
Use all remaining bytes after the prefix:

- **`0x01` + hash** (typically 20 bytes) → P2PKH (Base58Check)
- **`0x02` + hash** (typically 20 bytes) → P2SH (Base58Check)
- **`0x03` + 1-byte witness version + witness program** → Bech32/Bech32m
  - Version 0 + 20 bytes → P2WPKH (22 bytes total)
  - Version 0 + 32 bytes → P2WSH (34 bytes total)
  - Version 1 + 32 bytes → P2TR/Taproot (34 bytes total)

#### Segwit marker (`0x80..0x8F`)
First byte = `0x80 + witness_version`, followed by complete witness program:

- `0x80` + 20 bytes → P2WPKH (21 bytes total)
- `0x80` + 32 bytes → P2WSH (33 bytes total)
- `0x81` + 32 bytes → P2TR (33 bytes total)

#### Legacy Base58Check
First byte = version byte, followed by hash:

- P2PKH mainnet: `0x00` + 20 bytes (21 bytes total)
- P2PKH testnet: `0x6f` + 20 bytes (21 bytes total)
- P2SH mainnet: `0x05` + 20 bytes (21 bytes total)
- P2SH testnet: `0xc4` + 20 bytes (21 bytes total)

#### Decoder rule (safe universally)
1. If first byte ∈ {`0x01`, `0x02`, `0x03`}: decode via generalized tags (accept variable length)
2. Else if first byte ∈ `0x80..0x8F`: decode as segwit marker
3. Otherwise: decode as Base58Check (legacy)

**Key principle**: Use all remaining bytes after the prefix, regardless of length. This automatically supports current and future address formats.

### Parsing algorithm (TypeScript outline)
```ts
function parseCounterparty(tx: BitcoinTx): ParsedMessage | null {
  // 1) Try OP_RETURN
  const opret = findSingleOpReturn(tx);
  if (opret) {
    if (bytesEq(opret.pushdata, ascii("CNTRPRTY"))) return { kind: "taproot_commit" };
    const key = hexToBytes(tx.vin[0].txid); // first input txid
    const plain = rc4(key, opret.pushdata);
    if (startsWith(plain, ascii("CNTRPRTY"))) {
      const message = plain.slice(8);
      return decodeMessage(message);
    }
  }

  // 2) Try Taproot witness revelation
  const w = getFirstWitnessWithScript(tx);
  if (!w) return null;
  const script = hexToBytes(w.scriptHex);
  const message = extractFromEnvelope(script); // ord/xcp or generic
  return decodeMessage(message);
}

function decodeMessage(message: Uint8Array): ParsedMessage {
  const { id, rest } = readMessageTypeId(message); // 1 byte unless 0 → 4 bytes
  switch (id) {
    case 2:  return decodeEnhancedSend(rest);
    case 4:  return decodeSweep(rest);
    case 20:
    case 22: return decodeIssuance(rest);
    case 21:
    case 23: return decodeIssuanceSubasset(rest);
    case 30: return decodeBroadcast(rest);
    case 90: return decodeFairminter(rest);
    case 91: return decodeFairmint(rest);
    case 101: return decodeAttachPipe(rest);
    default: return { id, raw: rest };
  }
}
```

### Segwit examples (schema‑level)
- **Commit transaction output**
  - P2TR output to `taproot_address([[envelope_script]])` (no OP_RETURN)
- **Reveal transaction output[0]**
  - `OP_RETURN 0x08 "434e545250525459"`  // literal `CNTRPRTY`
- **Reveal transaction witness (generic envelope)**
  - Witness stack: `[<schnorr_sig>, <script>, <control_block>]`
  - `<script>`: `OP_FALSE OP_IF <( type_id || cbor_payload ) chunked ≤520B> OP_ENDIF <xonly_pubkey> OP_CHECKSIG`
- **Reveal transaction witness (ord/xcp envelope)**
  - `<script>`: `OP_FALSE OP_IF "ord" 0x07 "xcp" 0x01 <mime> 0x05 <cbor_meta_chunks> OP_0 <content_chunks> OP_ENDIF <xonly_pubkey> OP_CHECKSIG`


