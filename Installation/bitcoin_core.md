# Bitcoin Core with ``addrindex`` patch

Bitcoin Core is used by Counterparty to interact with the Bitcoin blockchain.  However, vanilla Bitcoin Core is insufficient---instead, a version patched to enable an 'address index' is required.


## Download

Depending on your OS and other preferences, download one of the binaries or source code from the link below. Optionally you can verify the file's checksum and author's PGP signature. These binaries are built deterministically.

[https://github.com/btcdrak/bitcoin/releases](https://github.com/btcdrak/bitcoin/releases) 


## Installation


### Windows Installer

Unline the Linux binaries, the Windows packages are installers. Uninstall any older version and download and install a 32-bit or 64-bit version. A 32-bit version consumes slightly less memory resources and is recommended for regular desktop use.

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

### Windows

Type Windows Key-R and enter ``cmd.exe`` to open a Windows command prompt. Type the following:

    cd %APPDATA%\Bitcoin
    notepad bitcoin.conf  

Say 'Yes' to when Notepad asks if you want to create a new file, then paste in the content of a sample configuration file given below.

On Linux
-----------

As the user which will run the `bitcoind` daemon, create `~/.bitcoin` and create a text file in that directory named `bitcoin.conf`. Populate it with content similar to a sample configuration file below. Ensure that the file has the correct ownership and access permissions (`chmod 600 ~/.bitcoin/bitcoin.conf`).

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
* For testnet use, add `testnet=1` to the configuration file.


## Reindex

If this is not the first time you are running Bitcoin Core (with `addrindex` or `txindex`) on this computer,
you'll need to launch ``bitcoind`` (once only) as follows:

    bitcoind -reindex

This will have `bitcoind` complete a one-time reindexing of the local blockchain. Windows users can do the same, or simply run Bitcoin-Core (`Start > Programs > Bitcoin Core > Bitcoin Core`) which will prompt them to reindex their blockchain if necessary.

Even on a fast machine, reindexing may take several hours.
