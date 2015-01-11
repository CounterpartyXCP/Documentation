Installation (Automatic)
========================

Build counterpartyd
-------------------

.. note::

  
  If you'd like to set up your own self-contained, full fledged Counterparty server (which is an Ubuntu Linux system that runs counterpartyd, counterblockd, and more), and/or want to run a Counterwallet server, follow the instructions :ref:`federated-node` instead.
  

**Windows and Ubuntu Linux Users:** Follow the steps below to set up and run counterpartyd:

1. :ref:`setup-bitcoind`
2. :ref:`build-from-source`
3. :ref:`insight`

These instructions make use of a build script that takes care of all setup necessary to set up counterpartyd from source on your system. Beyond this, the Additional Topics document contains useful information around operating counterpartyd, once installed.

**Non Windows/Ubuntu Linux Users:** If you are running an OS other than Windows or Ubuntu Linux, at this point you will need to follow the manual installation instructions here.

.. _setup-bitcoind:

Setting up bitcoind
~~~~~~~~~~~~~~~~~~~

**counterpartyd** communicates with the Bitcoin reference client (**bitcoind**). Normally, you’ll run bitcoind on the same computer as your instance of **counterpartyd** runs on. However, you can also use a **bitcoind** instance sitting on a different server entirely.

.. note::

  This section sets up counterpartyd to run on mainnet, which means that when using it, you will be working with real XCP. If you would like to run on testnet instead, please see the section entitled Running counterpartyd on testnet in Additional Topics.


On Windows
^^^^^^^^^^

If you haven’t already, go to the bitcoind download page and grab the installer for Windows. Install it with the default options.

Once installed, type Windows Key-R and enter cmd.exe to open a Windows command prompt. Type the following:

::

  cd %APPDATA%\Bitcoin
  notepad bitcoin.conf

Say Yes to when Notepad asks if you want to create a new file, then paste in the text below:

::

  rpcuser=rpc
  rpcpassword=1234
  server=1
  daemon=1
  rpcthreads=100
  rpctimeout=300
  txindex=1
  
.. note::

  - If you want bitcoind to be on testnet, not mainnet, see the section entitled Running counterpartyd on testnet in Additional Topics.
  - You should change the RPC password above to something more secure.


Once done, press CTRL-S to save, and close Notepad. The config file will be saved here:

::

  %AppData%\Roaming\Counterparty\counterpartyd\counterpartyd.conf


New Blockchain Download
''''''''''''''''''''''''''''''

Next, if you haven’t ever run Bitcoin on this machine (i.e. no blockchain has been downloaded), you can just launch **bitcoind** or **bitcoin-qt** and wait for the blockchain to finish downloading.

Already have Blockchain
''''''''''''''''''''''''''''''

If you have already downloaded the blockchain on your computer (e.g. you’re already using the Bitcoin client) **and** you did not have the configuration parameter **txindex=1** enabled, you will probably need to open up a command prompt window, change to the Bitcoin program directory (e.g. **C:\Program Files (x86)\Bitcoin\**) and run:

::

  bitcoin-qt.exe --reindex

or:

::

  daemon\bitcoind.exe --reindex

This will start up bitcoin to do a one time reindexing of the blockchain on disk. The reason this is is because we added the **txindex=1** configuration parameter above to the bitcoin config file, which means that it will need to run through the blockchain again to generate the necessary indexes, which may take a few hours. After doing this once, you shouldn’t have to do it again.

Next steps
''''''''''''''''''''''''''''''

Once this is done, you have two options:

- Close Bitcoin-QT and run **bitcoind.exe** directly. You can run it on startup by adding to your Startup program group in Windows, or using something like NSSM.
- You can simply restart Bitcoin-QT (for the configuration changes to take effect) and use that. This is fine for development/test setups, but not normally suitable for production systems. (You can have Bitcoin-QT start up automatically by clicking on Settings, then Options and checking the box titled “Start Bitcoin on system startup”.)

On Ubuntu Linux
^^^^^^^^^^^^^^^^^^^^

If not already installed (or running on a different machine), do the following to install it (on Ubuntu, other distros will have similar instructions):

::

  sudo apt-get install software-properties-common python-software-properties
  sudo add-apt-repository ppa:bitcoin/bitcoin
  sudo apt-get update
  sudo apt-get install bitcoind
  mkdir -p ~/.bitcoin/
  echo -e "rpcuser=rpc\nrpcpassword=rpcpw1234\nserver=1\ndaemon=1\ntxindex=1" > ~/.bitcoin/bitcoin.conf
  
Please then edit the **~/.bitcoin/bitcoin.conf** file and set the file to the same contents specified above in bitcoin.conf example for Windows.

New Blockchain Download
''''''''''''''''''''''''''''''

Next, if you haven’t ever run **bitcoin-qt/bitcoind** on this machine (i.e. no blockchain has been downloaded), you can just start **bitcoind**:

::

  bitcoind

In either of the above cases, the bitcoin server should now be started. The blockchain will begin to download automatically. You must let it finish downloading entirely before going to the next step. You can check the status of this by running:

::

  bitcoind getinfo | grep blocks

When done, the block count returned by this command will match the value given from this page.

Already have Blockchain
''''''''''''''''''''''''''''''

If you have already downloaded the blockchain before you modified your config and you did not have **txindex=1** enabled, you’ll probably need to launch bitcoind as follows:

::

  bitcoind –reindex

This will start up bitcoin to do a one time reindexing of the blockchain on disk. The reason this is is because we added the **txindex=1** configuration parameter above to the bitcoin config file, which means that it will need to run through the blockchain again to generate the necessary indexes, which may take a few hours. After doing this once, you shouldn’t have to do it again.

If you had the blockchain index parameter always turned on before, reindexing should not be necessary.

Next steps
''''''''''''''''''''''''''''''

At this point you should be good to go from a bitcoind perspective. For automatic startup of bitcoind on system boot, this page provides some good tips.

.. _build-from-source:

Building & Running from Source
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. note::

  Please make sure you’ve followed the instructions in the :ref:`setup-bitcoind` section before moving through this section.

This section provides information about how to install and run counterpartyd from source, using this counterpartyd build system (as an alternative to setting it up manually).

On Windows
^^^^^^^^^^^^^^^^^^^^

Prerequisites
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. note::

  These instructions cover building counterpartyd as 32-bit. This will work with both 32-bit and 64-bit versions of Windows, and is the simplier and recommended approach. (We also have documentation on how to build for 64-bit Windows 7 here.)

Minimally required to build counterpartyd from source is the following:

- Python 3.4.1 – grab the 32-bit version - Install to the default C:\Python34 location
- Python Win32 extensions – grab the 32-bit version - Ensure you run this setup program as administrator, or you will get an error about missing DLL files while installing counterpartyd
- APSW for Windows – grab the 32-bit version
- Pycrypto for Windows – grab the 32-bit version
- Visual C++ 2008 Redistributables (if not already installed) – grab it here
- OpenSSL for Windows – grab the 32-bit version
- Git for Windows - Use the default installer options (except, select “Use Git from the Windows Command Prompt” on the appropriate screen)

Installing
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. note::

  Our install script (setup.py) requires administrator access to run (so that it can create a counterpartyd.bat file in your Windows directory). To allow for this, you must launch a command prompt as administrator. To do this under Windows 7, go to Start -> All Programs -> Accessories, then right click on Command Prompt and select “Run as administrator”. More information on this is available from this link (method 1 or 2 works fine).

After launching a DOS command window using the instructions in the note above, type the following commands:

::

  cd C:\
  git clone https://github.com/CounterpartyXCP/counterpartyd_build
  cd counterpartyd_build
  C:\Python34\python.exe setup.py --with-bootstrap-db
  
Some notes:

- The above steps will check out the build scripts to C:\counterpartyd_build, and run the setup.py script, which will check out the newest version of counterpartyd itself from git, create a virtual environment with the required dependencies, and do other necessary tasks to integrate it into the system.
- If you want to configure counterpartyd for testnet as well, add the --with-testnet switch to the setup.py command as well.
- If you want to generate your own counterpartyd database from scratch, don’t use the --with-bootstrap-db switch.
- If you chose to start counterpartyd at startup automatically, the setup script will also create a shortcut to counterpartyd in your Startup group.
- Upon the successful completion of this script, you can now run counterpartyd using the steps below.

Running counterpartyd built from Source
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Counterpartyd does not require elevated (“administrator”) privileges to be executed and operated. After installing, open a command window and run counterpartyd in the foreground via:

::

  counterpartyd server

You can then open up another command window and run any of counterpartyd’s other functions, for example:

::

  counterpartyd send --source=12WQTnVbzhJRswra4TvGxq1RyhUkmiVXXmClick to send altcoins to this BTC address --destination=1QGZ4sCpvCgRizL5v4NniaKdZKzxBtVN3qClick to send altcoins to this BTC address  --asset=XCP --quantity=5

For more examples, see doc:`developer-guide`.

To run the counterpartyd testsuite (not yet completed for Windows):

::

  counterpartyd tests

Updating to the newest source
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

As the code is enhanced and improved on Github, you can refresh your local copy of the repositories like so (assuming Python 3.4):

::

  cd C:\counterpartyd_build
  C:\Python34\python.exe setup.py update

If, upon running counterpartyd, you get a missing dependency or some other error, you can always rerun setup.py, which will regenerate your dependencies listing to the libraries and versions as listed in pip-requirements.txt:

::

  cd C:\counterpartyd_build
  C:\Python34\python.exe setup.py

In case of a problem, refer to the list of requirements in pip-requirements.txt above and update system as necessary. Then rerun the build script again.

On Linux
^^^^^^^^^^^^^^^^^^^^

Prerequisites
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Currently, Ubuntu Linux (Server or Desktop) 12.04 LTS, 13.10, and 14.04 are supported.

Support for other distributions is a future task.

Installing
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

As the user you want to run counterpartyd as, launch a terminal window, and type the following:

::

  sudo apt-get -y update
  sudo apt-get -y install git-core python3
  git clone https://github.com/CounterpartyXCP/counterpartyd_build ~/counterpartyd_build
  cd ~/counterpartyd_build
  sudo python3 setup.py --with-bootstrap-db

Some notes:

- The setup.py script will install necessary dependencies, check out the newest version of counterpartyd itself from git, create the python environment for counterpartyd, and install an upstart script that will automatically start counterpartyd on startup.
- If you want to configure counterpartyd for testnet as well, add the --with-testnet switch to the setup.py command as well.
- If you want to generate your own counterpartyd database from scratch, don’t use the --with-bootstrap-db switch.
- If you chose to start counterpartyd at startup automatically, the setup script will also create a shortcut to counterpartyd in your Startup group.

Creating a default config
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Follow the instructions listed under the Config and Logging section in the Additional Topics section.

Running counterpartyd built from Source
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

After installing and creating the necessary basic config, run counterpartyd in the foreground to make sure everything works fine:

::

  counterpartyd server

(The above assumes /usr/local/bin is in your PATH, which is where the counterpartyd symlink (which just points to the run.py script) is placed. If not, run /usr/local/bin/counterpartyd instead.)

Once you’re sure it launches and runs fine, you can press CTRL-C to exit it and - if you configured counterpartyd to start automatically on system startup - then run counterpartyd as a background process via this command:

::
  
  sudo sv start counterpartyd

You can then open up another command window and run any of counterpartyd’s other functions, for example:

::

  counterpartyd send --source=12WQTnVbzhJRswra4TvGxq1RyhUkmiVXXmClick to send altcoins to this BTC address  --destination=1QGZ4sCpvCgRizL5v4NniaKdZKzxBtVN3qClick to send altcoins to this BTC address  --asset=XCP --quantity=5
  
  .. _federated-node:

For more examples, see doc:`developer-guide`.

To run the counterpartyd testsuite:

::

  counterpartyd tests

Updating to the newest source
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

As the code is enhanced and improved on Github, you can refresh your local copy of the repositories like so:

::

  cd ~/counterpartyd_build
  sudo python3 setup.py update

Counterparty for Windows must also be updated from a console window started with elevated privileges.

If, upon running counterpartyd, you get a missing dependency or some other error, you can always rerun setup.py, which will regenerate your dependencies listing to the libraries and versions as listed in pip-requirements.txt:

::

  cd ~/counterpartyd_build
  sudo python3 setup.py

The same approach applies to Windows - this operation requires elevation.

Build Federated Node
~~~~~~~~~~~~~~~~~~~~~

Introduction
^^^^^^^^^^^^^^^^^^^^

A Counterblock Federated Node is a self-contained server that runs the software necessary to support one or more “roles”. Such roles may be:

- Counterwallet server
- Vending machine (future)
- Block explorer server (future)
- A plain old counterpartyd server
- Each backend server runs multiple services (some required, and some optional, or based on the role chosen). As each server is self-contained, they can be combined by the client-side software to allow for high-availability/load balancing.

For instance, software such as Counterwallet may then utilize these backend servers in making API calls either sequentially (i.e. failover) or in parallel (i.e. consensus-based). For instance, with Counterwallet, when a user logs in, this list is shuffled so that in aggregate, user requests are effectively load-balanced across available servers. Indeed, by setting up multiple such (Counterblock) Federated Nodes, one can utilize a similar redundancy/reliability model in one’s own 3rd party application that Counterwallet utilizes. Or, one can utilize a simplier configuration based on a single, stand-alone server.

This document describes how one can set up their own Counterblock Federated Node server(s). It is primarily intended for system administrators and developers.
