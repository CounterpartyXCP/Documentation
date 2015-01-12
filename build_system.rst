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
--------------------------

Introduction
~~~~~~~~~~~~~~~~~~~~~

A Counterblock Federated Node is a self-contained server that runs the software necessary to support one or more “roles”. Such roles may be:

- Counterwallet server
- Vending machine (future)
- Block explorer server (future)
- A plain old counterpartyd server
- Each backend server runs multiple services (see :doc:`components` (some required, and some optional, or based on the role chosen). As each server is self-contained, they can be combined by the client-side software to allow for high-availability/load balancing.

For instance, software such as Counterwallet may then utilize these backend servers in making API calls either sequentially (i.e. failover) or in parallel (i.e. consensus-based). For instance, with Counterwallet, when a user logs in, this list is shuffled so that in aggregate, user requests are effectively load-balanced across available servers. Indeed, by setting up multiple such (Counterblock) Federated Nodes, one can utilize a similar redundancy/reliability model in one’s own 3rd party application that Counterwallet utilizes. Or, one can utilize a simplier configuration based on a single, stand-alone server.

This document describes how one can set up their own Counterblock Federated Node server(s). It is primarily intended for system administrators and developers.

Federated Node Services
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A federated node runs several services on the same system. Let’s look at what some of these are:

**counterpartyd (Required)**

**counterpartyd** is the Counterparty reference client itself. It’s responsibilities include parsing out Counterparty transactions from the Bitcoin blockchain. It has a basic command line interface, and a reletively low-level API for getting information on specific transactions, or general state info.

**counterblockd (Required, unless counterpartyd only)**

The **counterblockd** daemon provides a more high-level API that layers on top of **counterpartyd‘s API**, and includes extended information, such as market and price data, trade operations, asset history, and more. It is used extensively by Counterwallet itself, and is appropriate for use by applications that require additional API-based functionality beyond the scope of what **counterpartyd** provides.

**counterblockd** also provides a proxy-based interface to all **counterpartyd** API methods, via the **proxy_to_counterpartyd** API call.

**insight (Optional)**

**insight** allows for local querying of balance information and UTXOs for arbitrary addresses. This is a feature not available to **bitcoind** itself. Alternatives to running **insight** on the server are using a service like blockr.io, which both **counterpartyd** and **counterblockd** support. For the most reliable service, we recommend that production servers (at least) run **insight** locally.

**armory_utxsvr (Optional)**

This service is used by **counterblockd** with Counterwallet, to allow for the creation of unsigned transaction ASCII text blocks, which may then be used with an Offline Armory configuration. This service requires Armory itself, which is automatically installed as part of the Federated Node setup procedure.

**nginx (Optional)**

**nginx** normally frontends communications on Counterwallet, Vending, etc nodes. Not used with counterpartyd-only nodes.

**Counterwallet, etc.**

The specific end-functionality, that builds off of the base services provided.

Federated Node Provisioning
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Production**

Here are the recommendations and/or requirements when setting up a production-grade Counterblock Federated Node:

**Server Hardware/Network Recommendations:**

- Xeon E3+ or similar-class processor
- 16GB+ RAM (ECC)
- Disk drives in RAID-1 (mirrored) configuration (SSD prefered)
- Hosted in a secure data center with physical security and access controls
- DDOS protection recommended if you will be offering your service to others

**Disk Space Requirements:**

The exact disk space required will be dependent on what services are run on the node:

- Base System: 20GB (to be safe)
- counterpartyd, counterblockd databases: ~200MB
- insight: ~30GB (mainnet), ~3GB (testnet)
- armory_utxsvr: ~25GB (mainnet), ~3GB (testnet)

Generally, we recommend building on a server with at least 120GB of available disk space.

**Server Software:**

- Ubuntu 14.04 64-bit required

**Server Security:**

The build script includes basic automated security hardening.

Before running this script, we strongly advise the following:

- SSH should run on a different port, with root access disabled
- Use ufw (software firewall) in addition to any hardware firewalls:
  - sudo ufw allow ssh #(or whatever your ssh port is, as ‘12345/tcp’, in place of ‘ssh’)
  - sudo ufw allow http
  - sudo ufw allow https
  - sudo ufw enable
- Only one or two trusted individuals should have access to the box. All root access through sudo.
- Utilize 2FA (two-factor authentication) on SSH and any other services that require login. Duo is a good choice for this (and has great SSH integration).
- The system should have a proper hostname (e.g. counterblock.myorganization.org), and your DNS provider should be DDOS resistant
- If running multiple servers, consider other tweaks on a per-server basis to reduce homogeneity.
- Enable Ubuntu’s automated security updates (our script will do this if you didn’t)

**Testing / Development**

If you’d like to set up a Counterblock Federated Node system for testing and development, the requirements are minimal. Basically you need to set up a Virtual Machine (VM) instance (or hardware) at the Ubuntu version listed above, at least **2 GB** of memory, and enough disk space to cover the installation and use of the desired components.

**Node Setup**

Once the server is provisioned and set up as above, you will need to install all of the necessary software and dependencies. We have an installation script for this, that is fully automated and **installs ALL dependencies, including ``bitcoind`` and ``insight``:**

::

  BRANCH=master
  cd ~ && wget -q https://raw.github.com/CounterpartyXCP/counterpartyd_build/${BRANCH}/setup_federated_node.py \
  https://raw.github.com/CounterpartyXCP/counterpartyd_build/${BRANCH}/setup_util.py && \
  sudo python3 setup_federated_node.py
  
Then just follow the on-screen prompts (choosing to build from master if you are building a production node, or from `develop` **only** if you are a developer or want access to bleeding edge code that is not fully tested).

Once done, start up **bitcoind** daemon(s):

::

  sudo sv start bitcoind
  sudo sv start bitcoind-testnet
  
  sudo tail -f ~xcp/.bitcoin/debug.log
  sudo tail -f ~xcp/.bitcoin-testnet/testnet3/debug.log
  
That last command will give you information on the Bitcoin blockchain download status. After the blockchain starts downloading, **if you’ve elected to install and use insight**, you can launch the insight daemon(s):

::

  sudo sv start insight
  sudo sv start insight-testnet
  
  sudo tail -f ~xcp/insight-api/log/current
  sudo tail -f ~xcp/insight-api/log-testnet/current
  
As well as `armory_utxsvr`, if you’re using that (Counterwallet role only):

::

  sudo sv start armory_utxsvr
  sudo sv start armory_utxsvr-testnet
  
  sudo tail -f ~xcp/.armory/armorylog.txt
  sudo tail -f ~xcp/.armory/testnet3/armorylog.txt

And `counterpartyd` itself:

::

  sudo sv start counterpartyd
  sudo sv start counterpartyd-testnet
  
  sudo tail -f ~xcp/.config/counterpartyd/counterpartyd.log
  sudo tail -f ~xcp/.config/counterpartyd-testnet/counterpartyd.testnet.log
  
Then, watching these log, wait for the **insight** sync (as well as the **bitcoind** sync and **counterpartyd** syncs) to finish, which should take between 7 and 12 hours. After this is all done, reboot the box for the new services to start (which includes both **counterpartyd** and **counterblockd**).

**counterblockd**, after starting up must then sync to **counterpartyd**. It will do this automatically, and the process will take between 20 minutes to 1 hour most likely. You can check on the status of counterblockd‘s sync using:

::

  sudo tail -f ~xcp/.config/counterblockd/counterblockd.log
  sudo tail -f ~xcp/.config/counterblockd-testnet/counterblockd.log
  
Once it is fully synced up, you should be good to proceed. The next step is to simply open up a web browser, and go to the IP address/hostname of the server. You will then be presented to accept your self-signed SSL certificate, and after doing that, should see the web interface for the role you selected (e.g. Counterwallet login screen, if Counterwallet was chosen at node setup time). From this point, you can proceed testing the necessary functionality on your own system(s).

**Getting a SSL Certificate**

By default, the system is set up to use a self-signed SSL certificate. If you are hosting your services for others, you should get your own SSL certificate from your DNS registrar so that your users don’t see a certificate warning when they visit your site. Once you have that certificate, create a nginx-compatible **.pem** file, and place that at **/etc/ssl/certs/counterblockd.pem**. Then, place your SSL private key at **/etc/ssl/private/counterblockd.key**.

After doing this, edit the **/etc/nginx/sites-enabled/counterblock.conf** file. Comment out the two development SSL certificate lines, and uncomment the production SSL cert lines, like so:

::

  #SSL - For production use
  ssl_certificate      /etc/ssl/certs/counterblockd.pem;
  ssl_certificate_key  /etc/ssl/private/counterblockd.key;
  
  #SSL - For development use
  #ssl_certificate      /etc/ssl/certs/ssl-cert-snakeoil.pem;
  #ssl_certificate_key  /etc/ssl/private/ssl-cert-snakeoil.key;
  
Then restart nginx:

::

  sudo sv restart nginx
  
**Troubleshooting**

If you experience issues with your Counterblock Federated Node, a good start is to check out the logs. Something like the following should work:

::
  #mainnet
  sudo tail -f ~xcp/.config/counterpartyd/counterpartyd.log
  sudo tail -f ~xcp/.config/counterblockd/countewalletd.log
  sudo tail -f ~xcp/.config/counterpartyd/api.error.log
  sudo tail -f ~xcp/.config/counterblockd/api.error.log
  
  #testnet
  sudo tail -f ~xcp/.config/counterpartyd-testnet/counterpartyd.log
  sudo tail -f ~xcp/.config/counterblockd-testnet/counterblockd.log
  sudo tail -f ~xcp/.config/counterpartyd-testnet/api.error.log
  sudo tail -f ~xcp/.config/counterblockd-testnet/api.error.log
  
  #relevant nginx logs
  sudo tail -f /var/log/nginx/counterblock.access.log
  sudo tail -f /var/log/nginx/counterblock.error.log
  
These logs should hopefully provide some useful information that will help you further diagnose your issue. You can also keep tailing them (or use them with a log analysis tool like Splunk) to gain insight on the current status of **counterpartyd/counterblockd**.

Also, you can start up the daemons in the foreground, for easier debugging, using the following sets of commands:

::

  #bitcoind
  sudo su -s /bin/bash -c 'bitcoind -datadir=/home/xcp/.bitcoin' xcpd
  sudo su -s /bin/bash -c 'bitcoind -datadir=/home/xcp/.bitcoin-testnet' xcpd
  
  #counterpartyd & counterblockd mainnet
  sudo su -s /bin/bash -c 'counterpartyd --data-dir=/home/xcp/.config/counterpartyd server' xcpd
  sudo su -s /bin/bash -c 'counterblockd --data-dir=/home/xcp/.config/counterblockd -v' xcpd
  
  #counterpartyd & counterblockd testnet
  sudo su -s /bin/bash -c 'counterpartyd --data-dir=/home/xcp/.config/counterpartyd-testnet \
  --testnet server' xcpd
  sudo su -s /bin/bash -c 'counterblockd --data-dir=/home/xcp/.config/counterblockd-testnet \
  --testnet -v' xcpd
  
You can also run **bitcoind** commands directly, e.g.:

::

  #mainnet
  sudo su - xcpd -s /bin/bash -c "bitcoind -datadir=/home/xcp/.bitcoin getinfo"
  
  #testnet
  sudo su - xcpd -s /bin/bash -c "bitcoind -datadir=/home/xcp/.bitcoin-testnet getinfo"
  
**Monitoring the Server**

To monitor the server, you can use a 3rd-party service such as `Pingdom <http://www.pingdom.com>`_ or `StatusCake <http://statuscake.com>`_. The federated node allows these (and any other monitoring service) to query the basic status of the server (e.g. the nginx, counterblockd and counterpartyd services) via making a HTTP GET call to one of the following URLs:

- /_api/ (for mainnet)
- /_t_api/ (for testnet)

If all services are up, a HTTP 200 response with the following data will be returned:

::

  {"counterpartyd": "OK", "counterblockd_ver": "1.3.0", "counterpartyd_ver": "9.31.0", "counterblockd": "OK",
  "counterblockd_check_elapsed": 0.0039348602294921875, "counterpartyd_last_block": {
  "block_hash": "0000000000000000313c4708da5b676f453b41d566832f80809bc4cb141ab2cd", "block_index": 311234,
  "block_time": 1405638212}, "local_online_users": 7, "counterpartyd_check_elapsed": 0.003687143325805664,
  "counterblockd_error": null, "counterpartyd_last_message_index": 91865}
  
Note the **"counterpartyd": "OK"** and **"counterblockd": "OK"** items.

If all services but **counterpartyd** are up, a **HTTP 500** response with **"counterpartyd": "NOT OK"**, for instance.

If **counterblockd** is not working properly, **nginx** will return a **HTTP 503** (Gateway unavailable) or 500 response.

If **nginx** is not working properly, either a HTTP 5xx response, or no response at all (i.e. timeout) will be returned.

Other Topics
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**User Configuration**

Note that when you set up a federated node, the script creates two new users on the system: **xcp** and **xcpd**. (The **xcp** user also has an **xcp** group created for it as well.)

Important: The setup script by default creates user home under the **/home**. If you wish to store the **xcp** user’s data on another volume, mount it to **/home/xcp** (rather than, for example, **/xcp**).

The script installs **counterpartyd**, **counterwallet**, etc into the home directory of the xcp user. This user also owns all installed files. However, the daemons (i.e. bitcoind, insight, counterpartyd, counterblockd, and nginx) are actually run as the xcpd user, which has no write access to the files such as the counterwallet and counterpartyd source code files. The reason things are set up like this is so that even if there is a horrible bug in one of the products that allows for a RCE (or Remote Control Exploit), where the attacker would essentially be able to gain the ability to execute commands on the system as that user, two things should prevent this:

- The **xcpd** user doesn’t actually have write access to any sensitive files on the server (beyond the log and database files for **bitcoind**, **counterpartyd**, etc.)
- The **xcpd** user uses **/bin/false** as its shell, which prevents the attacker from gaining shell-level access

This setup is such to minimize (and hopefully eliminate) the impact from any kind of potential system-level exploit.

Counterwallet Configuration
----------------------------

Counterwallet Configuration File
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Counterwallet can be configured via creating a small file called **counterwallet.conf.json** in the **counterwallet/** directory. This file will contain a valid JSON-formatted object, containing an a number of possible configuration properties. For example:

::

  {
    "servers": [ "counterblock1.mydomain.com", "counterblock2.mydomain.com", "counterblock3.mydomain.com" ],
    "forceTestnet": true,
    "googleAnalyticsUA": "UA-48454783-2",
    "googleAnalyticsUA-testnet": "UA-48454783-4",
    "rollbarAccessToken": "39d23b5a512f4169c98fc922f0d1b121Click to send altcoins to this BTC address ",
    "disabledFeatures": ["rps", "betting"],
    "restrictedAreas": {
      "pages/betting.html": ["US"],
      "pages/openbets.html": ["US"],
      "pages/matchedbets.html": ["US"],
      "pages/rps.html": ["US"],
      "dividend": ["US"]
    },
  }

Here’s a description of the possible fields:

**Required fields:**

- **servers:** Counterwallet should work out-of-the-box in a scenario where you have a single Counterblock Federated Node that both hosts the static site content, as well as the backend Counterblock API services. However, Counterwallet can also be set up to work in MultiAPI mode, where it can query more than one server (to allow for both redundancy and load balancing). To do this, set this servers parameter as a list of multiple server URIs. Each URI can have a **http://** or **https://** prefix (we strongly recommend using HTTPS), and the strings must not end in a slash (just leave it off). If the server hostname does not start with **http://** or **https://**, then **https://** is assumed.

If you just want to use the current server (and don’t have a multi-server setup), just specify this as **[]** (empty list).

**Optional fields:**

- **forceTestnet**: Set to true to always use testnet (not requiring ‘testnet’ in the FQDN, or the ‘?testnet=1’ parameter in the URL.
- **googleAnalyticsUA / googleAnalyticsUA-testnet**: Set to enable google analytics for mainnet/testnet. You must have a google analytics account.
- **rollbarAccessToken**: Set to enable client-side error tracking via rollbar.com. Must have a rollbar account.
- **disabledFeatures**: Set to a list of zero or more features to disable in the UI. Possible features are: betting, rps, dividend, exchange, leaderboard, portfolio, stats and history. Normally this can just be [] (an empty list) to not disable anything.
- **restrictedAreas**: Set to an object containing a specific page path as the key (or “dividend” for dividend functionality), and a list of one or more ISO 2-letter country codes as the key value, to allow for country-level blacklisting of pages/features.

Once done, save this file and make sure it exists on all servers you are hosting Counterwallet static content on. Now, when you go to your Counterwallet site, the server will read in this file immediately after loading the page, and set the list of backend API hosts from it automatically.

Giving Op Chat Access
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Counterwallet has its own built-in chatbox. Users in the chat box are able to have operator (op) status, which allows them to do things like ban or rename other users. Any op can give any other user op status via the /op command, typed into the chat window. However, manual database-level intervention is required to give op status to the first op in the system.

Doing this, however, is simple. Here’s an example that gives testuser1 op access. It needs to be issued at the command line for every node in the cluster:

::

  #mainnet
  mongo counterblockd
  db.chat_handles.update({handle: "testuser1"}, {$set: {op: true}})
  
  #testnet
  mongo counterblockd_testnet
  db.chat_handles.update({handle: "testuser1"}, {$set: {op: true}})
  
Counterwallet MultiAPI specifics
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. note: 

  By default, Counterblock Federated Nodes can also host Counterwallet content (this will change in the future). Regarding this, the Counterparty team itself operates the primary Counterwallet platform. However, as Counterwallet is open source software, it is possible to host your own site with Counterwallet site (for your personal use, or as an offering to others), or to even host your own Counterwallet servers to use with your own Counterparty wallet implementation. The Counterparty team supports this kind of activity (as long as the servers are secure), as it aids with increasing decentralization.
  
Also note that due to the nature of Counterwallet being a deterministic wallet, users using one Counterwallet platform (i.e. the official one, for instance) have the flexibility to start using a different Counterwallet platform instead at any time, and as funds (i.e. private keys) are not stored on the server in any fashion, they will be able to see their funds on either. (Note that the only thing that will not migrate are saved preferences, such as address aliases, the theme setting, etc.)

Counterwallet utilizes a sort of a “poor man’s load balancing/failover” implementation called multiAPI (and implemented `here <https://github.com/CounterpartyXCP/counterwallet/blob/master/src/js/util.api.js>`_). multiAPI can operate in a number of fashions.

**multiAPIFailover for Read API (``get_``) Operations**

multiAPIFailover functionality is currently used for all read API operations. In this model, the first Federated Node on the shuffled list is called for the data, and if it returns an error or the request times out, the second one on the list is called, and so on. The result of the first server to successfully return are used.

Here, a “hacked” server could be modified to return bogus data. As (until being discovered) the server would be in the shuffled list, some clients may end up consulting it. However, as this functionality is essentially for data queries only, the worse case result is that a Counterwallet client is shown incorrect/modified data which leads to misinformed actions on the user’s behalf. Moreover, the option always exists to move all read-queries to use multiAPIConsensus in the future should the need arise.

**multiAPIConsensus for Action/Write (``create_``) Operations**

Based on this multiAPI capability, the wallet itself consults more than one of these Federated Nodes via consensus especially for all create_-type operations. For example, if you send XCP, counterpartyd on each server is still composing and sending back the unsigned raw transaction, but for data security, it compares the results returned from all servers, and will only sign and broadcast (both client-side) if all the results match). This is known as multiAPIConsensus.

The ultimate goal here is to have a federated net of semi-trusted backend servers not tied to any one country, provider, network or operator/admin. Through requiring consensus on the unsigned transactions returned for all create_ operations, ‘semi-trust’ on a single server basis leads to an overall trustworthy network. Worst case, if backend server is hacked and owned (and the counterpartyd code modified), then you may get some invalid read results, but it won’t be rewriting your XCP send destination address, for example. The attackers would have to hack the code on every single server in the same exact way, undetected, to do that.

Moreover, the Counterwallet web client contains basic transaction validation code that will check that any unsigned Bitcoin transaction returned from a Counterblock Federated Node contains expected inputs and outputs. This provides further protection against potential attacks.

multiAPIConsensus actually helps discover any potential “hacked” servers as well, since a returned consensus set with a divergent result will be rejected by the client, and thus trigger an examination of the root cause by the team.

**multiAPINewest for Redundant storage**

In the same way, these multiple servers are used to provide redundant storage of client-side preferences, to ensure we have no single point of failure. In the case of the stored preferences for instance, when retrieved on login, the data from all servers is taken in, and the newest result is used. This multiAPINewest functionality effectively makes a query across all available Federated Nodes, and chooses the newest result (based on a “last updated”-type timestamp).

Note that with this, a “hacked” server could be modified to always return the latest timestamp, so that its results were used. However, wallet preferences (and other data stored via this functionality) is non-sensitive, and thus user’s funds would not be at risk before the hacked server could be discovered and removed.
