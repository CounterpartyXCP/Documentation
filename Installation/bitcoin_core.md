Bitcoin Core with ``addrindex`` patch
-------------------------------------------------------

Bitcoin Core is used by Counterparty to interact with the Bitcoin blockchain.
However, vanilla Bitcoin Core is insufficient---instead, a version patched to
enable an 'address index' is required.


Download
========

Depending on your OS and other preferences, download one of the binaries or source code from the link below. Optionally you can verify the file's checksum and author's PGP signature. These binaries are built deterministically.

[https://github.com/btcdrak/bitcoin/releases](https://github.com/btcdrak/bitcoin/releases) 

Installation
============

##Linux

The Linux binaries are precompiled executables and their dependencies and they're deployed by decompressing them into a desired location (e.g. `$HOME`). Once that is done, they can be executed directly like so. 

        ./bitcoin-0.10.0/bin/bitcoind --help

According to your preferences, you may want to do one or more of the following optional steps:
* Move the binaries to a another location
* Edit your `PATH` variable to allow you to execute the binaries (`bitcoin-cli`, `bitcoind`, `bitcoin-qe.exe`) without specifying their path
* Create custom data directories and your own startup scripts if that makes sense in your environment

##Windows

Unline the Linux binaries, the Windows packages are installers. Uninstall any older version and download and install a 32-bit or 64-bit version. A 32-bit version consumes slightly less memory resources and is recommended for regular desktop use.

* 32-bit: `C:\Program Files (x86)\Bitcoin`
* 64-bit: `C:\Program Files\Bitcoin`

##Installation from Source

It is also possible to download source code and build Bitcoin Core using your preferred method. There are no special build considerations for Counterparty.  

The Counterparty Build System [contains](https://github.com/CounterpartyXCP/federatednode_build/blob/master/setup_federated_node.py#L107) steps used to build Bitcoin Core 0.10 addrindex from source and Linux users can use those steps to build their copy from source.

*Installer* *TODO*

Configuration
====================

On Windows
-----------

Type Windows Key-R and enter ``cmd.exe`` to open a Windows command prompt. Type the following:

    cd %APPDATA%\Bitcoin
    notepad bitcoin.conf  

Say 'Yes' to when Notepad asks if you want to create a new file, then paste in the content of a sample configuration file given below.

On Linux
-----------

As the user you will run `bitcoind` daemon, create a directory (e.g. `~/.bitcoin`) and in that directory use your favorite text editor to create a file named `bitcoin.conf`. Populate it with content similar to a sample configuration file below. 
Save the file and ensure it has correct ownership and access permissions (`chmod 600 ~/.bitcoin/bitcoin.conf`).

*Configuration* *TODO*

### Sample Configuration File for bitcoin.conf (Linux and Windows)

    rpcuser=bitcoinrpc
    rpcpassword=
    server=1
    daemon=1
    rpcthreads=1000
    rpctimeout=300
    txindex=1
    addrindex=1

**NOTE**:

* Choose a **secure** password!
* For testnet use, add `testnet=1` to `bitcoin.conf` used on testnet and choose a different secure password.


Reindex
=======

If this is not the first time you are running Bitcoin Core (with addrindex) on this computer,
you'll probably need to launch ``bitcoind`` as follows:

    bitcoind -reindex

This will start up `bitcoind` to do a one-time reindexing of the blockchain on disk. Windows users can do the same, or simply run Bitcoin-Core (`Start > Programs > Bitcoin Core > Bitcoin Core`) which will prompt them to reindex their blockchain if it detects the config file has `addrindex` enabled but there is no addrindex built for the blockchain.

On a fast desktop reindexing takes at least several hours. To shorten planned downtime, Web sites can reindex the blockchain prior to migration and move or copy blockchain and indexes in time for upgrade. Please refer to Bitcoin Core documentation for details on blockchain data migration.
