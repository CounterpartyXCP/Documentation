 # Counterparty Data Encoding Methods

There are four different methods for storing data on the Bitcoin blockchain: OP_RETURN, MULTISIG, P2TR, and P2SH (deprecated). For small data (≤64 bytes), OP_RETURN is most efficient, while for larger data sizes, P2TR offers superior efficiency thanks to the witness discount. MULTISIG is impractical for large data storage due to its linear scaling with data size.

## TLDR;
1. For data ≤80 bytes, we use **OP_RETURN**, for simplicity. 
2. For data >64 bytes, **P2TR** is the most cost-effective.
3. P2TR is strictly superior to MULTISIG and P2SH at all transaction sizes.

## Transaction Types and Data Storage Methods

1. **LEGACY, OP_RETURN**
   - One legacy input
   - One OP_RETURN output (containing data up to 80 bytes)
   - One legacy change output
   - *Data storage method:* Direct insertion in OP_RETURN output

2. **LEGACY, MULTISIG**
   - One legacy input
   - N multisig outputs (1-of-3, storing 64 bytes per output)
   - One legacy change output
   - *Data storage method:* Data embedded in multisig redeem scripts

3. **BECH32, P2SH** (two transactions)
   - Transaction 1:
     - One bech32 input
     - One P2SH output
     - One bech32 change output
   - Transaction 2:
     - One P2SH input
     - One OP_RETURN output
   - *Data storage method:* Data embedded in P2SH scriptsig using `OP_FALSE OP_IF <data> OP_ENDIF`

4. **BECH32, P2TR** (two transactions; deprecated)
   - Transaction 1:
     - One bech32 input
     - One P2TR output
     - One bech32 change output
   - Transaction 2:
     - One P2TR input
     - One OP_RETURN output
   - *Data storage method:* Ordinal-style inscription in witness data using `OP_FALSE OP_IF <data> OP_ENDIF`

## Transaction Size Comparison

| Size       | OP_RETURN              | MULTISIG               | P2TR                   | P2SH                   |
|------------|------------------------|------------------------|-----------------------|------------------------|
|            | Bytes      vBytes      | Bytes      vBytes      | Bytes      vBytes     | Bytes      vBytes      |
| 10         | 212        212         | 303        303         | 353        239        | 295        241         |
| 16         | 218        218         | 303        303         | 359        240        | 301        247         |
| 32         | 234        234         | 303        303         | 375        244        | 317        263         |
| 64         | 266        266         | 303        303         | 407        252        | 349        295         |
| 80         | 282        282         | 415        415         | 423        256        | 365        311         |
| 128        | N/A        N/A         | 415        415         | 471        268        | 413        359         |
| 256        | N/A        N/A         | 639        639         | 599        300        | 541        487         |
| 1KB        | N/A        N/A         | 1983       1983        | 1367       492        | 1309       1255        |
| 2KB        | N/A        N/A         | 3775       3775        | 2391       748        | 2333       2279        |

## Efficiency Ratio (vBytes per byte of data)

| Size       | OP_RETURN    | MULTISIG     | P2TR         | P2SH         |
|------------|--------------|--------------|--------------|--------------|
| 10         | 21.20        | 30.30        | 23.90        | 24.10        |
| 16         | 13.63        | 18.94        | 15.00        | 15.44        |
| 32         | 7.31         | 9.47         | 7.63         | 8.22         |
| 64         | 4.16         | 4.73         | 3.94         | 4.61         |
| 80         | 3.52         | 5.19         | 3.20         | 3.89         |
| 128        | N/A          | 3.24         | 2.09         | 2.80         |
| 256        | N/A          | 2.50         | 1.17         | 1.90         |
| 1KB        | N/A          | 1.94         | 0.48         | 1.23         |
| 2KB        | N/A          | 1.84         | 0.37         | 1.11         |

## Most Efficient Method by Data Size

| Size       | Optimal Method       | Efficiency (vBytes/byte) |
|------------|----------------------|--------------------------|
| 10         | OP_RETURN            | 21.20                    |
| 16         | OP_RETURN            | 13.63                    |
| 32         | OP_RETURN            | 7.31                     |
| 64         | P2TR                 | 3.94                     |
| 80         | P2TR                 | 3.20                     |
| 128        | P2TR                 | 2.09                     |
| 256        | P2TR                 | 1.17                     |
| 1KB        | P2TR                 | 0.48                     |
| 2KB        | P2TR                 | 0.37                     |