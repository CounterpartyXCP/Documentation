# Fair Minting

# Motivation

**Fair Minting** is a process whereby users are able to “mint” tokens in a decentralized manner. One user initiates the mint (either with or without a “premint”), and then other users are able to trigger it to create tokens for themselves. Fair Minting was likely inspired by the original Counterparty **Proof-of-Burn** mechanism, by which users sent BTC to an unspendable address and XCP tokens were generate for them automatically.

More recently, **BRC-20** introduced a variant of the Fair Mint model that has been adopted by many fungible token protocols recently, including SRC-20 on Bitcoin Stamps. In this system, users are able to mint "for free" by paying only a miner fee: the term “fair mint” refers to the fact that the creator of the minting system is not enriched in the process, and that the minting process is decentralized 

In 2023, Joe Looney introduced the [**”XCP-20”** Fair Mint model](https://xcp20.wtf/) by setting up a **dispenser on a burn address; its name is**  a tongue-in-cheek reference to BRC-20. Buyers, largely unaware that Counterparty existed—and this was not new in any way—sent massive amounts of Bitcoin to the burn address and received tokens in return. In this way, tokens got distributed, but the deployer was not directly enriched.

# Design

It’s desirable to create a native mechanism for Fair Minting so that a burn address isn’t used. In the process, it is also natural to allow for multiple modes of operation that extend the Fair Mint model:

1. Miner Fees Only, with a Max Mint per Transaction
2. XCP Fee with a Price per Unit Token (Distributed to Issuer)
3. XCP Fee with a Price per Unit (Burned)

Additional functionality may be added as well:

- A “soft cap” mechanism, establishing a minimum amount of the token to be issued, optionally by a particular block height. (Before `soft_cap_deadline_block` payment will be escrowed trustlessly.)
- A commission in the new token sent to the creator of the mint for each mint operation (proportional to the quantity minted)
- A “Start Block” and “End Block”

Implementation Notes:

- Fair Mints will be possible by issuers of extant assets as long as those assets do not have locked quantities.
- The `premint` quantity will be credited to the issuer at the `start_block`.
- If an asset can be reset it can also be Fair Minted, but fair minting itself would not first effect an asset reset.
- Outside the fair minting period the `hard_cap` has no effect. To lock the quantity you have to use the parameter `lock_quantity=true` or use an issuance after the minting period.
- For the duration of the mint period, the state of description lock and quantity lock cannot be changed.

# Implementation

It would be possible, to use the `issuances.py` contract and add the fair minting implementation to it. However, this contract is already 1000 lines long and it is preferable not to add complexity to it. New contracts will therefore be implemented but, to ensure maximum compatibility with other assets, the `issuances` and `assets` tables will be used: the creation of a fair minting will result in the creation of a line in the `assets` and `issuances` tables and then each fair mining will result in the creation of a line in the `issuances` table.

There will be two new contracts: `fairminter.py` and `fairmint.py`. These two contracts will respect the usual interface of all other contracts, that is to say the functions `initialise()`, `validate()`, `compose()`, `unpack()` and `parse()`. The first will allow the creation of a "mintable" asset and the second will allow users to "mint" this asset. After the minting period, a minted asset functions just like a locked issuance asset.

## Function Signatures

`compose_fairminter`

| Argument Name | Type | Defaut | Description |
| --- | --- | --- | --- |
| address | str |  | The address with which the transaction is signed and which is the issuer of the mined asset. This address receives the pre-minted assets, payments, and fees. |
| asset | str |  | The name of the asset to be mined. If the asset doesn't exist, it is created. If it exists, it must belong to the issuer (`address`) and not be locked. In any case, the `issuances` are locked for the asset as long as the fair minter is open. |
| asset_parent | str | “” | The name of the parent asset. The asset must exist and belong to the issuer (`address`). If `<asset_parent>.<asset>` doesn't exist, a new numeric asset with a random name is created. If `<asset_parent>.<asset>` exists, it must belong to the issuer (`address`) and not be locked. |
| price | int | 0 | The price for the `quantity_by_price` units of the created asset in XCP-satoshis. |
| quantity_by_price | int | 1 | The amount of assets received by the miner for the price specified with the `price` argument. |
| max_mint_per_tx | int | 0 | If `price` is different from 0, `max_mint_per_tx` designates the maximum quantity a user can mine with one transaction. If `price` is equal to 0, it designates the quantity the user receives with each transaction. |
| hard_cap | int | 0 | The maximum number of assets that must not be exceeded by the fair minter. Any assets created before the fair minter opens are taken into account when verifying the `hard_cap`. |
| premint_quantity | int | 0 | The quantity of assets to be mined at the creation of the fair minter. The pre-mined assets are sent to the issuer (`address`). If a `start_block` and/or a `soft_cap` are defined, the pre-mined assets are escrowed until they are reached. |
| start_block | int | 0 | The block from which users can mine assets. If equal to 0, the fair minter is available immediately after its creation. |
| end_block | int | 0 | The block until which users can mine assets. If equal to 0, the fair minter is only closed if a `soft_cap` is defined and not reached, or if a `hard_cap` is defined and reached. |
| soft_cap | int | 0 | The block until which users can mine assets. If equal to 0, the fair minter is only closed if a soft_cap is defined and not reached, or if a hard_cap is defined and reached. The soft_cap defines the minimum quantity of assets that must be mined, before soft_cap_deadline_block, for the fair minter not to be canceled and closed. Any assets created before the fair minter opens and premint_quantity are not taken into account when verifying the soft cap. As long as the soft cap is not reached, the mined assets, payments, and fees are escrowed. When the soft cap is reached, the assets are sent to the miners, the payments and fees to the issuer (address). If it is not reached, the payments are refunded, the assets destroyed, and the fair minter is closed. |
| soft_cap_deadline_block | int | 0 | The block before which the `soft_cap` must be reached (see `soft_cap`). |
| minted_asset_commission | float | 0 | Commission to be paid in minted asset, a fraction of 1 (i.e., 0.05 is five percent); the commission is deducted from the asset received by the minter and sent to the Fair Minter owner. If a soft cap is defined, the commissions are escrowed until it is reached. |
| burn_payment | bool | False | This parameter allows for the destruction of XCP used to pay for the assets. If a soft cap is defined, the XCP are only destroyed if it is reached; otherwise, they are refunded. |
| lock_description | bool | False | Allows locking the asset description. This operation can also be performed with an `issuance` once the fair minter is closed. |
| lock_quantity | bool | False | Allows locking the asset. This operation can also be performed with an `issuance` once the fair minter is closed. |
| divisible | bool | True | Indicates whether the asset is divisible or not. |
| description | str | “” | The description of the asset. |

`compose_fairmint`

| Argument Name | Type | Defaut | Description |
| --- | --- | --- | --- |
| address | str |  | The address with which the transaction is signed and which receives the minted assets. |
| asset | str |  | The name of the asset to be mined.  |
| quantity | int | 0 | The quantity of assets to mine. If the asset price is greater than 0, `quantity` must also be greater than 0, otherwise the mined quantity will in all cases be equal to the fair minter's `mint_per_tx`. |

## API Changes

- New Routes
    - Get All Fair Minters: `/v2/fairminters`
    - Get Fair Minter By Tx Hash: `/v2/fairminters/<tx_hash>`
    - Get Fair Minter By Asset: `/v2/assets/<asset>/fairminter`
    - Get Fair Minters By Address: `/v2/addresses/<address>/fairminters`
    - Get Mints By Fair Minter: `/v2/fairminters/<tx_hash>/mints`
    - Get Mints By Asset: `/v2/assets/<asset>/mints`
    - Get Mints By Address: `/v2/addresses/<address>/mints`

## Database Changes

- A`fair_minting` field will be added to the `issuances` table. This is the field that will be checked to prevent token issuance other than through fair minting.
- A new table `fairminters` will be created with the following fields:
    
    ```sql
    tx_hash TEXT, -- Fair Minter identifier
    tx_index INTEGER,
    block_index INTEGER,
    source TEXT,
    asset TEXT,
    asset_parent TEXT,
    asset_longname TEXT,
    description TEXT,
    price INTEGER,
    quantity_by_price INTEGER,
    hard_cap INTEGER,
    burn_payment BOOL,
    max_mint_per_tx INTEGER,
    premint_quantity INTEGER,
    start_block INTEGER,
    end_block INTEGER,
    minted_asset_commission_int INTEGER,
    soft_cap INTEGER,
    soft_cap_deadline_block INTEGER,
    lock_description BOOL,
    lock_quantity BOOL,
    divisible BOOL,
    pre_minted BOOL DEFAULT 0,
    status TEXT -- pending, open, closed, invalid: <reasons>
    ```
    
- A new table `fairmints` will be created with the following fields:
    
    ```sql
    tx_hash TEXT PRIMARY KEY, -- Mint identifier
    tx_index INTEGER,
    block_index INTEGER,
    source TEXT,
    fairminter_tx_hash TEXT,
    asset TEXT,
    earn_quantity INTEGER,
    paid_quantity INTEGER,
    commission INTEGER,
    status TEXT -- valid, invalid: <reasons>
    ```
    

For each row in the `fairminters` and `fairmints` table a row will be added to the `issuances` table.
