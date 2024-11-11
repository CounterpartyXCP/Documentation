# Fair Minting

# Motivation

**Fair Minting** is a process whereby users are able to “mint” tokens in a decentralized manner. One user initiates a minter (either with or without a “premint”), and others are able to trigger it to mint tokens for themselves. Fair Minting was likely inspired by the original Counterparty **Proof-of-Burn** mechanism, by which users sent BTC to an unspendable address and XCP tokens were generated for them.

More recently, **BRC-20** introduced a variant of the Fair Minting model that has recently been adopted by many fungible token protocols including SRC-20 on Bitcoin Stamps. In this system, users are able to mint "for free" paying only a miner fee: the term “fair mint” refers to the fact that the creator of the minting system is not enriched in the process and that the minting process is decentralized

In 2023, Joe Looney introduced the [**”XCP-20”** Fair Mint model](https://xcp20.wtf/) by setting up a **dispenser on a burn address**; its name is a tongue-in-cheek reference to BRC-20. Buyers, largely unaware that Counterparty existed—and this was not new in any way—sent massive amounts of Bitcoin to the burn address and received tokens in return. In this way, tokens got distributed, but the deployer was not directly enriched.


# Design

The primary goal is to create a native mechanism for Fair Minting so that a burn address isn’t used. Additionally native support allows for multiple extensions of the core Fair Minting system.

1. Miner Fees Only, with a Max Mint per Transaction
2. XCP Fee with a Price per Unit Token (Distributed to Issuer)
3. XCP Fee with a Price per Unit (Burned)
4. A “soft cap” mechanism, establishing a minimum amount of the token to be issued, optionally by a particular block height. (Before `soft_cap_deadline_block` payment will be escrowed trustlessly.)
5. A commission in the new token sent to the creator of the mint for each mint operation (proportional to the quantity minted)
6. A “Start Block” and “End Block”


The Fair Minting system allows users to issue assets through a fair and controlled minting process. It involves two primary entities: Fairminters and Fairmints.

- **Fairminter**: Represents the rules and constraints under which an asset can be minted.
- **Fairmint**: Represents an individual minting event tied to a specific fairminter.

- Fair Minters can be added to existing assets as long as those assets do not have locked quantities.
- The `premint` quantity will be credited to the issuer at the `start_block`.
- If an asset can be reset it can also be Fair Minted, but fair minting itself would not first effect an asset reset.
- Outside the fair minting period the `hard_cap` has no effect. To lock the quantity you have to use the parameter `lock_quantity=true` or use an issuance after the minting period.
- For the duration of the mint period, the state of description lock and quantity lock cannot be changed.
- In the Fair Minting system, creating a fairminter additionally triggers the creation of an issuance for the referenced asset. If the asset does not exist then it will be created.

- `minted_asset_commision` must be between `0` and `1`
- `price` and `max_mint_per_tx` *cannot both* be `0`
- `end_block` must be greater than `start_block`
- `soft_cap` must be less than `hard_cap`
- `soft_cap` and `soft_cap_deadline_block` must be set together
- `soft_cap_deadline_block` must be less than `end_block` and greater than `start_block`
- If the asset exists
    - It must *not* currently have an `open` fairminter
    - It must *not* be locked
    - The asset `issuer` must match the fairminter's `source`
    - If the asset's description is locked then the fairminter's description must be `""` or match the existing description
    - The existing supply plus `premint_quantity` must not exceed the `hard_cap`
    - `divisible` must match the existing `divisible`
- If the asset does not exist
    - If `asset_parent` is a provided argument then the asset it references must exist
    - If `asset` is not a numeric asset then the `source`s balance must be sufficient to pay a `0.5 XCP` fee
    - `asset` and `asset_parent` must respect the named asset format
- If `asset` does not exist one will be created
- `premint_quantity` of asset will be credited to the `source` if there is no soft cap and the status is open otherwise it will be held in escrow
- If there is a fee the `source` will be debited that amount
- An `open` fairminter must exist for `asset`
- If `Fairminter.price` is `0` `quantity` must be supplied as `0` or omitted. `Fairminter.max_mint_per_tx` is used instead
- `quantity` must be greater than `0`
- `quantity` cannot exceed `Fairminter.max_mint_per_tx` if set
- The existing supply plus `quantity` cannot exceed `Farminter.hard_cap` if set
- `Fairmint.source` must have a sufficient balance to cover the cost
- If the soft cap has *not* been reached both the XCP and asset amounts will be escrowed
- If the hard cap is hit
    - quantity and description are locked
    - soft cap is implicitly hit and payouts are made if they have not been already
- If `Fairminter.burn_payment` is `True` then the XCP used to mint the asset will be destroyed; otherwise it will be sent to `Fairminter.source`
- The `Fairmint.source` will be credited with `quantity` of the asset.
- When the `end_block` is reached, the fairminter closes.
- If `lock_quantity=True`, the issuances table records the final issuance event with locked=True.


# API

- Get All Fair Minters: `/v2/fairminters`
- Get Fair Minter By Tx Hash: `/v2/fairminters/<tx_hash>`
- Get Fair Minter By Asset: `/v2/assets/<asset>/fairminter`
- Get Fair Minters By Address: `/v2/addresses/<address>/fairminters`
- Get Mints By Fair Minter: `/v2/fairminters/<tx_hash>/mints`
- Get Mints By Asset: `/v2/assets/<asset>/mints`
- Get Mints By Address: `/v2/addresses/<address>/mints`

## Fairminter

A fairminter defines the rules under which an asset is minted. This table stores configuration details such as price, supply limits, soft/hard caps, and minting constraints.

`tx_hash`: *TEXT* - Hash of the transaction that created the fairminter.

`tx_index`: *INTEGER* - Index of the transaction.

`block_index`: *INTEGER* - Index of the block containing the transaction.

`source`: *TEXT* - Address of the fairminter creator.

`asset`: *TEXT* - The asset to be minted.

`asset_parent`: *TEXT* - Parent asset of the asset.

`asset_longname`: *TEXT* - Full name of the asset (parent + asset name).

`description`: *TEXT* - Description of the asset.

`price`: *INTEGER* - Price per unit of the asset, in XCP Satoshis.

`quantity_by_price`: *INTEGER* - Units of the asset minted per price unit.

`hard_cap`: *INTEGER* - Maximum supply that can be minted (asset limit).

`burn_payment`: *BOOL* - If True, payment is burned instead of credited to the issuer.

`max_mint_per_tx`: *INTEGER* - Maximum amount of assets that can be minted per transaction.

`premint_quantity`: *INTEGER* - Quantity pre-minted when the Fairminter opens.

`start_block`: *INTEGER* - Block index when the minting becomes open.

`end_block`: *INTEGER* - Block index when the minting ends.

`minted_asset_commission_int`: *INTEGER* - Commission percentage (in millionths) to the issuer for each mint.

`soft_cap`: *INTEGER* - Minimum quantity that needs to be minted for the Fairminter to succeed.

`soft_cap_deadline_block`: *INTEGER* - Block index when the soft cap must be reached.

`lock_description`: *BOOL* - If True, locks the description of the asset.

`lock_quantity`: *BOOL* - If True, locks the quantity minted after the Fairminter closes.

`divisible`: *BOOL* - If True, the asset can be divided into fractions.

`pre_minted`: *BOOL* - Indicates if the premint quantity has already been issued.

`status`: *TEXT* - Current status of the fairminter (pending, open, or closed).


## Fairmint

A fairmint records an individual minting event under a fairminter. This includes the amount minted, the payment made, and the commission, if any, awarded to the issuer.

`tx_hash`: *TEXT* - Hash of the transaction that created the mint.

`tx_index`: *INTEGER* - Transaction index.

`block_index`: *INTEGER* - Index of the block containing the transaction.

`source`: *TEXT* - Address of the user who performed the mint.

`fairminter_tx_hash`: *TEXT* - Transaction hash of the associated fairminter.

`asset`: *TEXT* - The asset being minted.

`earn_quantity`: *INTEGER* - Quantity of the asset earned by the minter.

`paid_quantity`: *INTEGER* - Amount of XCP paid by the minter.

`commission`: *INTEGER* - Commission awarded to the issuer.

`status`: *TEXT* - Status of the mint (valid or invalid).
