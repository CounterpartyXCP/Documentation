# Be Able to Lock Descriptions

## Motivation

From a collectors point of view, it is often important to be sure that all characteristics of an asset are immutable to establish the permanency of the object being traded. For this reason there is a strong demand from the community to add the possibility to lock the description of an asset. This feature is easy to implement, without any side effects, and without any consequences for existing assets.

## Design

To lock an asset, there are currently two possibilities: perform an `issuance` with the description equal to "lock" or directly pass the parameter `lock=True`. When an Asset is locked, however, it is still possible to modify the description.

1. Since there are two ways to lock an asset, the idea is to now use one of the two methods to specifically lock the description:
    1. If `description=lock`, it means that the description should be locked.
    2. If `lock=True`, we lock only the quantity (as it is done today).
2. A `description_locked` field will be added to the `issuances` table.
3. The `issuances.validate` function will be modified to check that if `description_locked` is equal to `True`, the description must be necessarily equal to `None`.
4. A protocol change `lockable_description` will be added in the `protocol_changes.json` file.

## API Changes

No API changes, except for the documentation to indicate that `description=lock` causes description only to be locked.

## Database Changes

A `description_locked` field will be added to the `issuances` table.