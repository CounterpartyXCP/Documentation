Additional Topics
======================

This section contains some tidbits of info that you may find useful when working with ``counterpartyd``.

For a good overview of what you can do with ``counterpartyd``, see :doc:`this link </counterpartyd_API.rst>`.

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
    blockchain-service-name=jmcorgan

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

