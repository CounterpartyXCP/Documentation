# Bitcoin Core with ``addrindex`` Patch

Bitcoin Core is used by Counterparty to interact with the Bitcoin blockchain.  However, vanilla Bitcoin Core is insufficient---instead, a version patched to enable an 'address index' is required.


## Download

Depending on your OS and other preferences, download one of the binaries or source code from the link below. Optionally you can verify the file's checksum and author's PGP signature. These binaries are built deterministically.

[https://github.com/btcdrak/bitcoin/releases](https://github.com/btcdrak/bitcoin/releases) 


## Installation

### Windows Installer

Unlike the Linux binaries, the Windows packages are installers. Uninstall any older version and download and install a 32-bit or 64-bit version. A 32-bit version consumes slightly less memory and is recommended for regular desktop use.

* 32-bit: `C:\Program Files (x86)\Bitcoin`
* 64-bit: `C:\Program Files\Bitcoin`

`bitcoind.exe` can be found in the `daemon` subdirectory. This path can be manually added to the system PATH variable.

### Linux Binaries

The Linux binaries are precompiled executables + dependencies, and they're deployed by decompressing them into the desired location. Once that is done, they can be executed directly like so. 

        ./bitcoin-*/bin/bitcoind -help

You may want to do one or more of the following optional steps:
* Move the binaries around.
* Edit your `PATH` variable to allow you to execute the binaries (`bitcoin-cli`, `bitcoind`, `bitcoin-qt`) without specifying their path.


## Configuration

Your Bitcoin Core configuration file should match this:

    rpcuser=bitcoinrpc
    rpcpassword=<password>
    server=1
    daemon=1
    rpctimeout=300
    txindex=1
    addrindex=1

* Choose a **secure password**.
* By default, on Windows, this file is located at `%APPDATA%\Bitcoin\bitcoin.conf`.
* By default, on Linux, this file is located at `~/.bitcoin/bitcoin.conf`, and the permissions of the file should be set with `chmod 600 ~/.bitcoin/bitcoin.conf`.

## Usage

To run with the standard GUI interface, start Bitcoin Core (`./bitcoin-qt` on Linux), and to run the daemon, execute `bitcoind`. A full list of options can be obtained like this:
* Bitcoin Core: go to `Help > Command-line options` or execute `./bitcoin-qt -help`
* bitcoind: run `./bitcoind --help` (`bitcoind.exe -help` on Windows)

Use `bitcoin-cli` to interact with Bitcoin Core.

### Usage on Testnet 

For testnet use, add `testnet=1` to a separate copy of the above configuration file or run bitcoind with `-testnet` from a script or the console. Examples:
* `./bitcoind -testnet` - start bitcoind on testnet using the default configuration file (blockchain data would be stored in the default data path under `testnet3` subdirectory)
* `bitcoind.exe -testnet -datadir=E:\testing\testnet-blockchain` - use the default configuration file, run on testnet, but place blockchain data in the specified data directory
* `bitcoin-qt.exe -conf=E:\testing\testnet.conf` - start Bitcoin Core GUI and service using a custom configuration file (which presumably cointains `testnet=1` and other custom options that justify the creation of a testnet-specific configuration file)

To interact with a testnet instance of Bitcoin Core, use `bitcoin-cli` with the same `testnet` or `conf` options that were used to start it.

## Reindex

If this is the first time you are running Bitcoin Core with `addrindex` on this computer and you have a full (non-pruned) copy of existing blockchain of the same or lower version as Bitcoin Core addrindex that you plan to use, after you've enabled addrindex and txindex in your new bitcoin.conf, you'll need to launch `bitcoind` (once only) as follows:

    bitcoind -reindex

Add `-testnet` to reindex testnet blockchain. This will have `bitcoind` complete a one-time reindexing of the local blockchain. Windows users can do the same, or simply run Bitcoin-Core (`Start > Programs > Bitcoin Core > Bitcoin Core`) which will prompt them to reindex their blockchain if necessary. 

Even on a fast machine, reindexing of the entire mainnet blockchain takes hours. If the existing instance of Bitcoin has a wallet file, make a backup copy to be on the safe side. Once reindexing is done and you restart Bitcoin Core, you should see it load the two indexes.

```
$ cat /blockchain/bitcoin/debug*log | grep index
2016-10-21 13:00:15 init message: Loading block index...
2016-10-21 13:00:15 Opening LevelDB in /home/user/.bitcoin/blocks/index
2016-10-21 13:00:17 Using obfuscation key for /blockchain/bitcoin/blocks/index: 0000000000000000
2016-10-21 13:00:52 LoadBlockIndexDB: transaction index enabled
2016-10-21 13:00:52 LoadBlockIndexDB(): address index enabled
```

### Leveraging existing blockchain data from a higher Bitcoin Core version

Existing Bitcoin Core users with blockchain data created by a *higher* version of the official Bitcoin Core may not be able to reuse their blockchain data from a lower version of Bitcoin Core because higher Bitcoin Core releases may have a database (or wallet, if used) format that older Bitcoin Core versions cannot recognize. 

This changes from one Bitcoin Core version to another, so please check Bitcoin Core Release Notes for database (and wallet, if applicable) format changes. The reason this (going from a higher release to a lower release) is common is Bitcoin Core addrindex releases are usually slightly behind the official release, so new Counterparty developers with existing full Bitcoin nodes may need to downgrade their Bitcoin Core if the addrindex version isn't out yet.

In cases where an in-place change is not possible or desired, you can setup a separate Bitcoin Core (with addrindex) instance and add `adddnode=<IP-address-of-newer-version-on-LAN>` to the new instance's bitcoin.conf, so that Bitcoin Core addrindex can quickly sync from your non-addrindex instance.

### Leveraging existing blockchain data from the same version of Bitcoin Core

Assuming you have another compatible but non-addrindex'ed copy of the blockchain on LAN, another way to save time is to copy the blockchain (normally `.dat` and `*.rev` files from the blocks subdirectory, as well as the entire chainstate subdirectory) over to the same directory on your Counterparty Server or Federated Node (default: `$HOME/federatednode/data/bitcoin/`). Then you would have to build addrinex from scratch by starting your new bitcoind once. An easy way to reindex the blockchain on Federated Node is to add `reindex=1` to the bitcoin (or bitcoin testnet) Docker configuration file, start the container, and then remove the line you just added. The addrindex option must remain enabled at all times.

### Removing addrindex

Bitcoin Core addrindex users who want to "go back" to the same or a higher version of Bitcoin Core without addrindex can simply uninstall the former and install the later. `addrindex` and `txindex` can be changed to 0 or removed from the configuration file. If the both are removed, then blockchain index data (see Bitcoin documentation for the details) can be deleted to save disk space, and potentially blockchain pruning (``prune``) can be (re)enabled as well.

Prior to making changes make a backup of your wallet if you have one. Addrindex does not impact the wallet, but a migration to a different Bitcoin Core version may.
