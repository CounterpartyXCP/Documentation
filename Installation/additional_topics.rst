Additional Topics
======================

This section contains some tidbits of info that you may find useful when working with ``counterpartyd``.

For a good overview of what you can do with ``counterpartyd``, see `this link <https://github.com/CounterpartyXCP/counterpartyd#usage>`__.

Finding the Data Directory
---------------------------

``counterpartyd`` stores its configuration, logging, and state data in a place known as the ``counterpartyd``
data directory.

Under Linux, the data directory is normally located in ``~/.config/counterpartyd`` (when
``counterpartyd`` is installed normally, via the ``setup.py`` installer).

Under Windows, the data directory is normally located at ``%APPDATA%\Counterparty\counterpartyd``. Examples of this are:

- ``C:\Users\<your username>\AppData\Roaming\Counterparty\counterpartyd`` (Windows 7/8/Server)
- ``C:\Documents and Settings\<your username>\Application Data\Counterparty\counterpartyd`` (Windows XP)


Editing the Config
---------------------------

``counterpartyd`` can read its configuration data from a file. The build system uses this method to allow for 
automated startup of ``counterpartyd``.

If using the Windows installer, a configuration file will be automatically created for you from data gathered
via the installation wizard.

If not using the Windows installer, the ``setup.py`` script will create a basic ``counterpartyd.conf`` file for you that contains
options that tell ``counterpartyd`` where and how to connect to your ``bitcoind`` process. Here's an example of the default file created::

    [Default]
    backend-rpc-connect=localhost
    backend-rpc-port=8332
    backend-rpc-user=rpc
    backend-rpc-password=1234
    rpc-user=my_api_user
    rpc-password=my_api_password

After running the ``setup.py`` script to create this file, you'll probably need to edit it and tweak the settings
to match your exact ``bitcoind`` configuration (e.g. especially ``rpc-password``). Note that the above config
connects to ``bitcoind`` on mainnet (port 8332).

Note that also, with the config above, it will set up ``counterpartyd`` to listen on localhost (127.0.0.1)
on port 4000 (if on mainnet) or port 14000 (if on testnet) for API connections (these are the default ports,
and can be changed by specifying the ``rpc-host`` and/or ``rpc-port`` parameters).


Viewing the Logs
-----------------

By default, ``counterpartyd`` logs data to a file named ``counterpartyd.log``, located within the ``counterpartyd``
data directory.

Under Linux, you can monitor these logs via a command like ``tail -f ~/.config/counterpartyd/counterparty.log``.

Under Windows, you can use a tool like `Notepad++ <http://notepad-plus-plus.org/>`__ to view the log file,
which will detect changes to the file and update if necessary.

Running counterpartyd on testnet
--------------------------------

Here's the steps you'll need to take to set up an additional bitcoind on testnet for ``counterpartyd`` testing. 
This assumes that you're already running ``bitcoind`` (or ``bitcoin-qt``) on mainnet, and would like to set up a
second instance for testnet:

Windows
~~~~~~~~

First, find your current ``bitcoind`` data directory, which is normally located at ``%APPDATA%\Bitcoin``. Examples of this are:

- ``C:\Users\<your username>\AppData\Roaming\Bitcoin`` (Windows 7/8/Server)
- ``C:\Documents and Settings\<your username>\Application Data\Bitcoin`` (Windows XP)

Alongside that directory (e.g. at the root of your AppData\Roaming dir), create another directory, name it something
like ``BitcoinTest``.

- ``C:\Users\<your username>\AppData\Roaming\BitcoinTest`` (Windows 7/8/Server)
- ``C:\Documents and Settings\<your username>\Application Data\BitcoinTest`` (Windows XP)
 
In this ``BitcoinTest`` directory, create a ``bitcoin.conf`` file with the following contents::

    rpcuser=rpc
    rpcpassword=1234
    server=1
    daemon=1
    rpcthreads=100
    rpctimeout=300
    txindex=1
    testnet=1

Now, make a shortcut to something like the following (assuming you installed to the default
install directory from the .exe installer):

To run ``bitcoin-qt``: ``"C:\Program Files (x86)\Bitcoin\bitcoin-qt.exe" --datadir="C:\Users\<your username\AppData\Roaming\BitcoinTest"``
To run ``bitcoind``: ``"C:\Program Files (x86)\Bitcoin\bitcoind.exe" --datadir="C:\Users\<your username>\AppData\Roaming\BitcoinTest"``

Note that you can run either. If you want the GUI, run bitcoin-qt (which will also listen on the RPC interface).
If you are comfortable using ``bitcoind`` commands (or are using a server), just run ``bitcoind``.

Then, just launch that shortcut. (Or, if you are having problems, you can just open up a command window and
try running that directly.)

Once launched, ``bitcoind``/``bitcoin-qt`` will be listening on testnet RPC API port ``18332``. You can just
run ``counterpartyd`` with its ``--datadir`` parameter to point to a directory with its own
``counterpartyd.conf`` file that has the connection parameters to your testnet bitcoin daemon that's now running.

This means, that like with ``bitcoind``, you may have two separate ``counterpartyd`` data directories, each with
their own configuration file and database. The difference
between the configuration files in each datadir will be that the one for your "testnet" ``counterpartyd`` will simply
specify ``rpc-port=18332``, while the one for your "mainnet" ``counterpartyd`` will specify ``rpc-port=8332``.


Linux
~~~~~~

Similar to the above, create a second bitcoin data directory (maybe name it ``.bitcoin-test``, instead of ``.bitcoin``). Place
it alongside your main ``.bitcoin`` directory (e.g. under ``~``). In this directory, create a ``bitcoin.conf``
file with the same contents as in the above Windows section.

Now, run ``bitcoind`` or ``bitcoin-qt``, as such:

To run ``bitcoin-qt``: ``"bitcoin-qt --datadir=~/.bitcoin-test``
To run ``bitcoind``: ``bitcoind --data-dir=~/.bitcoin-test``

For more information, see the Windows section above.


Next Steps
-----------

Once ``counterpartyd`` is installed and running, you can start running ``counterpartyd`` commands directly,
or explore the (soon to exist) built-in API via the documentation at the `main counterpartyd repository <https://github.com/CounterpartyXCP/counterpartyd>`__.  
