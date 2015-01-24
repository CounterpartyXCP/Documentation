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
