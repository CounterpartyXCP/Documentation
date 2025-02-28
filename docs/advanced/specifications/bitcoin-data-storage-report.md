 # Bitcoin Data Storage Methods: Efficiency Analysis

## Executive Summary

This report analyzes the efficiency of four different methods for storing data on the Bitcoin blockchain: OP_RETURN, MULTISIG, P2TR, and P2SH. We measured transaction sizes in both bytes and vbytes across various data sizes ranging from 10 bytes to 350KB. The analysis reveals that for small data (≤64 bytes), OP_RETURN is most efficient, while for larger data sizes, P2TR offers superior efficiency thanks to the witness discount. MULTISIG becomes impractical for large data storage due to its linear scaling with data size.

## Transaction Types and Data Storage Methods

We examined four Bitcoin transaction types for storing data:

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

4. **BECH32, P2TR** (two transactions)
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
| 350KB      | N/A        N/A         | 627391     627391      | 358743     89836      | 358685     358631      |

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
| 350KB      | N/A          | 1.75         | 0.25         | 1.00         |

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
| 350KB      | P2TR                 | 0.25                     |

## Key Findings and Analysis

### 1. Small Data (≤64 bytes)
- **OP_RETURN** provides the most efficient storage for very small data.
- Single transaction approach has lower overhead compared to two-transaction methods.
- At 64 bytes, P2TR becomes marginally more efficient than OP_RETURN.

### 2. Medium Data (>64 bytes to ~1KB)
- **P2TR** becomes increasingly efficient compared to other methods.
- Benefits from witness discount despite requiring two transactions.
- OP_RETURN becomes unavailable beyond 80 bytes due to protocol limitations.

### 3. Large Data (>1KB)
- **P2TR** shows exceptional efficiency for large data storage.
- At 350KB, P2TR requires only 0.25 vBytes per byte of data.
- The witness discount provides significant benefits for large data storage.
- MULTISIG becomes highly inefficient, requiring 5,600 outputs for 350KB (627,391 vBytes).

### 4. Method Comparison
- **P2TR vs P2SH**: P2TR is consistently more efficient than P2SH across all data sizes due to witness discount.
- **MULTISIG**: Shows reasonable efficiency for small data but scales poorly with size.
- **OP_RETURN**: Simple but limited to 80 bytes by protocol rules.

## Recommendations

1. **For data ≤64 bytes:**
   - Use **OP_RETURN** for simplicity and efficiency.
   - Single transaction approach minimizes complexity.

2. **For data >64 bytes:**
   - Use **P2TR** (Ordinal-style inscription) for optimal efficiency.
   - Particularly valuable for larger data sets where efficiency gains are substantial.

3. **Avoid for large data storage:**
   - **MULTISIG** becomes extremely inefficient for large data.
   - For 350KB, requires 5,600 outputs and over 627K vBytes.

## Technical Implementation Details

### OP_RETURN
Data is directly inserted into an OP_RETURN output, limited to 80 bytes by protocol rules.

### MULTISIG (P2MS 1-of-3)
Data is embedded in multisig outputs, with each output storing up to 64 bytes. Multiple outputs can be used for larger data.

### P2TR (Ordinal-style)
Uses a two-transaction approach:
1. Create a P2TR output
2. Spend it revealing data in the witness using `OP_FALSE OP_IF <data> OP_ENDIF`

Benefits from the witness discount (75% discount in vByte calculation).

### P2SH
Similar two-transaction approach to P2TR:
1. Create a P2SH output
2. Spend it revealing data in the scriptsig using `OP_FALSE OP_IF <data> OP_ENDIF`

Does not benefit from witness discount, making it less efficient than P2TR.

---

## Appendix: Transaction Structures

### LEGACY, OP_RETURN
```
- one legacy input
- one OP_RETURN output
- one legacy change output
```

### LEGACY, MULTISIG
```
- one legacy input
- N multisig outputs
- one legacy change output
```

### BECH32, P2SH
```
transaction 1:
- one bech32 input
- one P2SH output
- one bech32 change output

transaction 2:
- one P2SH input
- one OP_RETURN output
```

### BECH32, P2TR
```
transaction 1:
- one bech32 input
- one P2TR output
- one bech32 change output

transaction 2:
- one P2TR input
- one OP_RETURN output
```

## Methodology Details

Our analysis used the following assumptions:
- For OP_RETURN, data is simply included in the output, limited to 80 bytes.
- For MULTISIG, data is stored in 1-of-3 multisig outputs with 64 bytes per output.
- For P2TR, data uses an ordinal-style inscription in the witness of the second transaction.
- For P2SH, data is stored in the scriptsig of the second transaction using the same pattern as P2TR.

The transaction sizes were calculated by accounting for all components of the transactions, including inputs, outputs, witnesses, and scriptsig data. For two-transaction methods (P2TR and P2SH), both transactions' sizes were combined for the total size calculation.
