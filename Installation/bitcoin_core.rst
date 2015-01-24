Bitcoin Core with ``addrindex`` patch
-------------------------------------------------------

Bitcoind is the Bitcoin reference client. In the context of
Counterparty, bitcoind is used by the various components to retrieve
block and transaction data (to allow for Counterparty transaction
processing), as well as broadcast transactions to the network.


Bitcoin Core 0.9.2 on Windows 7 and 2012
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Counterpartyd supports this version of Bitcoin Core (0.9.2 jmcorgan with
addrindex patch)

To build from source, download Bitcoin Core 0.9.2 patched with
jmcorgan’s addrindex patch and compile binaries by following any working
tutorial for Bitcoin Core 0.9.2.

Prebuilt Windows binaries can be found 3rd party sites such as `this
one <https://github.com/rippler/btc-jmcorgan-addrindex-v0.9.2.0-fca268c-beta>`_. The same site has a `simple install guide <https://github.com/rippler/btc-jmcorgan-addrindex-v0.9.2.0-fca268c-beta/blob/master/counterpartyd-ubuntu-14.04-lts-install.md>`_ that may be useful in
addition to the :doc:`official Counterpartyd install guide </build_from_source.rst>`.

Bitcoin Core 0.10.0 on Windows 7 and 2012
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Counterpartyd does not yet support this version, but can work with it.
More `here`_.

To build from source, download Bitcoin Core 0.10.0 patched with
jmcorgan’s addrindex patch and compile binaries by following any working
tutorial for Bitcoin Core 0.10.0.

Prebuilt Windows binaries of Bitcoin Core 0.10.0 with addrinex patch can
be found 3rd party sites such as `this`_ (deterministic Github
build), and `this <https://github.com/rippler/bitcoin-core-0.10.0-addrindex/blob/master/README.md>`__
(personal build with how-to docs).

.. _this one: https://github.com/rippler/btc-jmcorgan-addrindex-v0.9.2.0-fca268c-beta
.. _simple install guide: https://github.com/rippler/btc-jmcorgan-addrindex-v0.9.2.0-fca268c-beta/blob/master/counterpartyd-ubuntu-14.04-lts-install.md
.. _official Counterpartyd install guide: http://counterparty.io/docs/build-system/build-from-source/
.. _here: https://github.com/rippler/bitcoin-core-0.10.0-addrindex
.. _this: https://github.com/btcdrak/bitcoin/releases/tag/addrindex-0.10.0



Setting up bitcoind
====================

On Windows
-----------

*Installer* *TODO*

Once installed, type Windows Key-R and enter ``cmd.exe`` to open a Windows command prompt. Type the following::

    cd %APPDATA%\Bitcoin
    notepad bitcoin.conf  

Say 'Yes' to when Notepad asks if you want to create a new file, then paste in the text below::

    rpcuser=rpc
    rpcpassword=1234
    server=1
    daemon=1
    rpcthreads=1000
    rpctimeout=300
    txindex=1
    addrindex=1

**NOTE**:

- You should change the RPC password above to something secure.
   
Once this is done, you have two options:

- Close Bitcoin-QT and run ``bitcoind.exe`` directly.


Reindex
---------

If this is not the first time you are running Bitcoin Core on this computer,
you'll probably need to launch ``bitcoind`` as follows:

    bitcoind --reindex

    
This will start up bitcoin to do a one-time reindexing of the blockchain on
disk.
