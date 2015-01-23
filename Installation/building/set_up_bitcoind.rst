Setting up bitcoind
====================

``counterpartyd`` communicates with the Bitcoin reference client (``bitcoind``). Normally, you'll run ``bitcoind``
on the same computer as your instance of ``counterpartyd`` runs on. However, you can also use a ``bitcoind`` instance
sitting on a different server entirely.

**NOTE:** This section sets up ``counterpartyd`` to run on mainnet, which means that when using it, **you will be working with real XCP**.
If you would like to run on testnet instead, please see the section entitled **Running counterpartyd on testnet** in 
:doc:`Additional Topics </additional_topics.rst>`.


On Windows
-----------

If you haven't already, go to `the bitcoind download page <http://bitcoin.org/en/download>`__
and grab the installer for Windows. Install it with the default options.

Once installed, type Windows Key-R and enter ``cmd.exe`` to open a Windows command prompt. Type the following::

    cd %APPDATA%\Bitcoin
    notepad bitcoin.conf  

Say Yes to when Notepad asks if you want to create a new file, then paste in the text below::

    rpcuser=rpc
    rpcpassword=1234
    server=1
    daemon=1
    rpcthreads=1000
    rpctimeout=300
    txindex=1
    addrindex=1

**NOTE**:

- If you want ``bitcoind`` to be on testnet, not mainnet, see the section entitled
  **Running counterpartyd on testnet** in :doc:`Additional Topics </additional_topics.rst>`.
- You should change the RPC password above to something more secure.
    
Once done, press CTRL-S to save, and close Notepad.  The config file will be saved here::

    ``%AppData%\Roaming\Counterparty\counterpartyd\counterpartyd.conf``

New Blockchain Download
^^^^^^^^^^^^^^^^^^^^^^^^

Next, if you haven't ever run Bitcoin on this machine (i.e. no blockchain has been downloaded),
you can just launch ``bitcoind`` or ``bitcoin-qt`` and wait for the blockchain to finish downloading.

Already have Blockchain
^^^^^^^^^^^^^^^^^^^^^^^^

If you have already downloaded the blockchain on your computer (e.g. you're already using the Bitcoin client) **and** 
you did not have the configuration parameter ``txindex=1`` enabled, you will probably need to open up a command prompt
window, change to the Bitcoin program directory (e.g. ``C:\Program Files (x86)\Bitcoin\``) and run::

    bitcoin-qt.exe --reindex
    
or::

    daemon\bitcoind.exe --reindex
    
This will start up bitcoin to do a one time reindexing of the blockchain on disk. The reason this is is because we 
added the ``txindex=1`` configuration parameter above to the bitcoin config file, which means that it will need to
run through the blockchain again to generate the necessary indexes, which may take a few hours. After doing
this once, you shouldn't have to do it again.   

Next steps
^^^^^^^^^^^

Once this is done, you have two options:

- Close Bitcoin-QT and run ``bitcoind.exe`` directly. You can run it on startup by adding to your
  Startup program group in Windows, or using something like `NSSM <http://nssm.cc/usage>`__.
- You can simply restart Bitcoin-QT (for the configuration changes to take effect) and use that. This is
  fine for development/test setups, but not normally suitable for production systems. (You can have
  Bitcoin-QT start up automatically by clicking on Settings, then Options and checking the
  box titled "Start Bitcoin on system startup".)


On Ubuntu Linux
----------------

If not already installed (or running on a different machine), do the following
to install it (on Ubuntu, other distros will have similar instructions)::

    sudo apt-get install software-properties-common python-software-properties
    sudo add-apt-repository ppa:bitcoin/bitcoin
    sudo apt-get update
    sudo apt-get install bitcoind
    mkdir -p ~/.bitcoin/
    echo -e "rpcuser=rpc\nrpcpassword=rpcpw1234\nserver=1\ndaemon=1\ntxindex=1" > ~/.bitcoin/bitcoin.conf

Please then edit the ``~/.bitcoin/bitcoin.conf`` file and set the file to the same contents specified above in 
bitcoin.conf example for Windows.

New Blockchain Download
^^^^^^^^^^^^^^^^^^^^^^^^

Next, if you haven't ever run ``bitcoin-qt``/``bitcoind`` on this machine (i.e. no blockchain has been downloaded),
you can just start ``bitcoind``::

    bitcoind

In either of the above cases, the bitcoin server should now be started. The blockchain will begin to download automatically. You must let it finish 
downloading entirely before going to the next step. You can check the status of this by running::

     bitcoind getinfo | grep blocks

When done, the block count returned by this command will match the value given from
`this page <http://blockexplorer.com/q/getblockcount>`__.

Already have Blockchain
^^^^^^^^^^^^^^^^^^^^^^^^

If you *have* already downloaded the blockchain before you modified your config and you did not have ``txindex=1`` 
enabled, you'll probably need to launch ``bitcoind`` as follows:

    bitcoind --reindex

    
This will start up bitcoin to do a one time reindexing of the blockchain on disk. The reason this is is because we added the
``txindex=1`` configuration parameter above to the bitcoin config file, which means that it will need to
run through the blockchain again to generate the necessary indexes, which may take a few hours. After doing
this once, you shouldn't have to do it again.

If you had the blockchain index parameter always turned on before, reindexing should not be necessary.

Next steps
^^^^^^^^^^^

At this point you should be good to go from a ``bitcoind`` perspective.
For automatic startup of ``bitcoind`` on system boot, `this page <https://bitcointalk.org/index.php?topic=25518.0>`__
provides some good tips.
