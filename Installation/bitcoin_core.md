# Bitcoin Core with ``addrindex`` Patch

Bitcoin Core is used by Counterparty to interact with the Bitcoin blockchain.  However, vanilla Bitcoin Core is insufficient---instead, a version patched to enable an 'address index' is required.


## Download

Depending on your OS and other preferences, download one of the binaries or source code from the link below. Optionally you can verify the file's checksum and author's PGP signature. These binaries are built deterministically.

[https://github.com/btcdrak/bitcoin/releases](https://github.com/btcdrak/bitcoin/releases) 


## Installation

### Windows Installer

Unlike the Linux binaries, the Windows packages are installers. Uninstall any older version and download and install a 32-bit or 64-bit version. A 32-bit version consumes slightly less memory resources and is recommended for regular desktop use.

* 32-bit: `C:\Program Files (x86)\Bitcoin`
* 64-bit: `C:\Program Files\Bitcoin`


### Linux Binaries

The Linux binaries are precompiled executables + dependencies, and they're deployed by decompressing them into the desired location. Once that is done, they can be executed directly like so. 

        ./bitcoin-0.10.0/bin/bitcoind --help

You may want to do one or more of the following optional steps:
* Move the binaries around.
* Edit your `PATH` variable to allow you to execute the binaries (`bitcoin-cli`, `bitcoind`, `bitcoin-qe.exe`) without specifying their path.

*Installer* *TODO*


## Configuration

Your Bitcoin Core configuration file should match this:

    rpcuser=bitcoinrpc
    rpcpassword=<password>
    server=1
    daemon=1
    rpcthreads=1000
    rpctimeout=300
    txindex=1
    addrindex=1

* Choose a **secure password**.
* By default, on Windows, this file is located at `%APPDATA%\Bitcoin\bitcoin.conf`.
* By default, on Linux, this file is located at `~/.bitcoin/bitcoin.conf`, and the permissions of the file should be set with `chmod 600 ~/.bitcoin/bitcoin.conf`.


## Reindex

If this is not the first time you are running Bitcoin Core (with `addrindex` or `txindex`) on this computer,
you'll need to launch ``bitcoind`` (once only) as follows:

    bitcoind -reindex

This will have `bitcoind` complete a one-time reindexing of the local blockchain. Windows users can do the same, or simply run Bitcoin-Core (`Start > Programs > Bitcoin Core > Bitcoin Core`) which will prompt them to reindex their blockchain if necessary.

Even on a fast machine, reindexing may take several hours.
