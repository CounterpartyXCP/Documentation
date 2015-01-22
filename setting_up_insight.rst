Setting up insight
====================

**NOTE:** ***This section is optional: If you are using jmcorgan or blockr.io as your blockchain backend, this is not necessary.**
     
As part of operating, ``counterpartyd`` may and ``counterblockd`` does require data that ``bitcoind`` cannot currently provide. This includes things such
as a BTC balance from an address not in the local ``bitcoind`` wallet, and a list of unspent transaction outputs (UXTO)
for an arbitrary address. In order to facilitate getting access to this information in a way that is robust and doesn't
depend on a 3rd party site such as blockchain.info, we make use of ``insight``, which is a free and open source server product
made by BitPay which offers and API that supplements the information ``bitcoind``'s API provides.

Both ``counterpartyd`` and ``counterblockd`` can communicate with ``insight``. If you need to install ``insight``,
normally, you'll run it on the same computer as your instance of ``bitcoind`` and ``counterpartyd`` runs on. However,
you can also run an instance of it on a different server entirely.


On Windows
-----------

Prerequisites
^^^^^^^^^^^^^^

You need to be running Windows Server, Windows 7, or Windows 8. You'll also need the following to install ``insight``:

- Git for Windows. Download `here <http://git-scm.com/download/win>`__ and install. Use the default installer
  options (except, select *"Run Git from the Windows Command Prompt"* on the appropriate screen)
- Node.js. Go to the `the node.js download page <http://nodejs.org/download/>`__
  and grab the .msi installer for Windows (64-bit or 32-bit). Install it with the default options.
- Python 2.7.x -- grab the `32-bit version <http://www.python.org/ftp/python/2.7/python-2.7.msi>`__
  or `64-bit version <http://www.python.org/ftp/python/2.7/python-2.7.amd64.msi>`__.
- For 64-bit systems you will also need the `Windows 7 64-bit SDK <http://www.microsoft.com/en-us/download/details.aspx?id=8279>`__.
  **NOTE** that if the install fails, try uninstalling any C++ 2010 x64&x86 Redistributables that you have installed first.
- Microsoft `Visual Studio Express 2012 <http://go.microsoft.com/?linkid=9816758>`__.

Installing
^^^^^^^^^^^

Once these are installed, type Windows Key-R and enter ``%comspec% /k ""C:\Program Files (x86)\Microsoft Visual Studio 11.0\Common7\Tools\VsDevCmd.bat""``
to open a Windows Visual Studio 2012 development command prompt. Then, type the following::

    cd C:\
    git clone https://github.com/bitpay/insight-api.git
    cd C:\insight-api
    npm install

Next, locate your current ``bitcoind`` data directory, which is normally located at ``%APPDATA%\Bitcoin``. Examples of this are:

- ``C:\Users\<your username>\AppData\Roaming\Bitcoin`` (Windows 7/8/Server)
- ``C:\Documents and Settings\<your username>\Application Data\Bitcoin`` (Windows XP)

Copy this down to a text file.

After this, type Windows Key-R and enter ``rundll32.exe shell32.dll,Control_RunDLL sysdm.cpl,,3``, then press OK.
This will launch the System Properties panel. Here, click on Environment Variables, and under User Variables, add the following:

- ``INSIGHT_NETWORK``: Set this to ``livenet`` if your ``bitcoind`` is running on mainnet. If on testnet, set this to ``testnet``
- ``BITCOIND_DATADIR``: Set this to your ``bitcoind`` data dir you found in the step above
- ``BITCOIND_USER``: Whatever your ``bitcoind`` RPC user is set to (``rpcuser=`` in the ``bitcoin.conf`` in your ``bitcoind`` data dir)
- ``BITCOIND_PASS``: Whatever your ``bitcoind`` RPC password is set to (``rpcpassword=`` in the ``bitcoin.conf`` in your ``bitcoind`` data dir)

If you are running on a different host, or set of ports, you will also need to set ``BITCOIND_HOST``, ``BITCOIND_PORT``,
and ``BITCOIND_P2P_PORT`` as appropriate.

Once done, click OK on both the Environment Variables and System Properties windows to save your changes and close them out.

Running
^^^^^^^^

Open up a command window and run::

    node C:\insight-api\insight.js
  
You can run it on startup by adding to your Startup program group in Windows, or using something like `NSSM <http://nssm.cc/usage>`__.

Configuration
^^^^^^^^^^^^^^

To use insight (running on the same host, with the default ports), just modify your ``counterpartyd.conf`` and/or ``counterblockd.conf``
files and add an option of ``blockchain-service-name=insight`` (replacing any ``blockchain-service-name`` option that
already exists).

Next Steps
^^^^^^^^^^^^^^^^^^^^^^^^

After running ``insight``, it should start parsing the blockchain data from the ``bitcoind`` data directory you specified
(at ``BITCOIND_DATADIR``).

You can do other things during this time, including normal use of ``counterpartyd``.
Please do note that ``counterblockd`` (or ``counterpartyd`` where you are querying the API on behalf of addresses not in the local ``bitcoind``'s
wallet) will not provide reliable results until this indexing is fully completed. 


On Ubuntu Linux
----------------

Open up a command window and run the following to install::

    sudo apt-get update
    sudo apt-get install git-core npm
    
    #fix for https://github.com/TooTallNate/node-gyp/issues/363  
    GYP_DIR=`python -c 'import gyp, os; print os.path.dirname(gyp.__file__)'`
    sudo mv ${GYP_DIR} ${GYP_DIR}_bkup
    
    git clone https://github.com/bitpay/insight-api.git ~/insight-api && cd ~/insight-api
    npm install
    
Running
^^^^^^^^

To run insight, you'd do something like the following at a command prompt::

    export INSIGHT_NETWORK=livenet
    export BITCOIND_DATADIR=$USER_HOME/.bitcoin
    export BITCOIND_USER=`cat $USER_HOME/.bitcoin/bitcoin.conf | sed -n 's/.*rpcuser=\([^ \n]*\).*/\1/p'`
    export BITCOIND_PASS=`cat $USER_HOME/.bitcoin/bitcoin.conf | sed -n 's/.*rpcpassword=\([^ \n]*\).*/\1/p'`
    #BITCOIND_HOST -- specify to not use the default (localhost)
    #BITCOIND_PORT -- specify to not use the default (8332)
    #BITCOIND_P2P_PORT -- specify to not use the default (8333)
    node ~/insight-api/insight.js

(Note that there is also an ``insight.conf.template`` and ``insight-testnet.conf.template`` upstart scripts that you can use in the
``counterpartyd_build/dist/linux/init`` directory. Simply take them, copy over to ``/etc/init`` (without the ``.template`` suffix
to the file name) and modify ``!RUN_AS_USER!`` to be the username that you have installed insight as, then you can simply
do something like::

    sudo service insight start

Configuration
^^^^^^^^^^^^^^

To use insight (running on the same host, with the default ports), just modify your ``counterpartyd.conf`` and/or ``counterblockd.conf``
files and add an option of ``blockchain-service-name=insight`` (replacing any ``blockchain-service-name`` option that
already exists).

Next steps
^^^^^^^^^^^

After running ``insight``, it should start parsing the blockchain data from the ``bitcoind`` data directory you specified
(at ``BITCOIND_DATADIR``). 

You can do other things during this time, including normal use of ``counterpartyd``.
Please do note that ``counterblockd`` (or ``counterpartyd`` where you are querying the API on behalf of addresses not in the local ``bitcoind``'s
wallet) will not provide reliable results until this indexing is fully completed. 
