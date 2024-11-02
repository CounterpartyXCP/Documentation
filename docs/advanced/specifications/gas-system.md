# Gas System

# Motivation

When Counterparty was first created, the XCP fees for various transactions were hard-coded to low, constant values (e.g. 0.5 XCP for issuing a named asset). This system was chosen for its simplicity, but it creates significant friction when onboarding users to the Counterparty ecosystem (esp. since it is so hard to acquire XCP) and yet the fees are so low that they have little economic significance for market participants. A proper XCP fee system should be proportional to network traffic and transaction complexity without creating any unnecessary barriers to entry for users of the network. This protocol change will institute just such a system for the new [UTXO Support](https://www.notion.so/UTXO-Support-7f70fdd934f94e6086716ed33d189e2f?pvs=21) feature by dynamically calculating the fees required to send assets from an address to a UTXO and from a UTXO to an address based on network congestion for this type of transaction.

# Design

Fees are calculated based on the number of such transactions in the last difficulty period (2016 blocks) based on the average number of transactions per block in that period.

```python
def calculate_fee(x, a, b, base_fee, k):
    """
    Calculate the fee based on the number of transactions per block,
    ensuring continuity at the transition point.
    
    Parameters:
    x (float): Number of transactions per period
    a (float): Lower threshold (fee is zero below this)
    b (float): Upper threshold (transition point to exponential growth)
    base_fee (float): Base fee amount
    k (float): Sigmoid steepness factor
    
    Returns:
    float: Calculated fee
    """
    def sigmoid(t):
        return 1 / (1 + math.exp(-k * (t - 0.5)))
    
    if x <= a:
        return 0
    elif x <= b:
        return base_fee * sigmoid((x - a) / (b - a))
    else:
        # Calculate sigmoid value and derivative at x = b
        sigmoid_at_b = sigmoid(1)
        sigmoid_derivative_at_b = k * sigmoid_at_b * (1 - sigmoid_at_b)
        
        # Calculate parameters for the exponential part
        m = sigmoid_derivative_at_b * (b - a) / base_fee
        c = math.log(m)
        
        # Exponential function that matches sigmoid at x = b
        return base_fee * sigmoid_at_b * math.exp(c * ((x - b) / (b - a)))
```

The different parameters (`a`, `b`, `k`, `base_fee`) will be stored in `protocol_changes.json`.

Here is what the price evolution looks like as a function of the number of transactions using this function (a sigmoid to an exponential). (Parameters are not final.)

![sigmoid.png](/img/sigmoid.png)

# API Changes

- New Routes
    - Get Estimated XCP Fees: `/v2/addresses/<address>/send/compose/estimatexcpfees`

# Database Changes

To facilitate the calculation of fees, a new table `transaction_count` will be added. For each valid transaction a counter stored in this table will be incremented. This table will contain the following fields:

1. **transaction_type** (for now `send_from_address_to_utxo` or `send_from_utxo_to_address`)
2. **difficulty_period** (transaction block index modulo 2016)
3. **count**