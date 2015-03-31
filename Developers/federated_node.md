Setting up a Counterparty Federated Node
==============================================

Introduction
-------------

A Counterblock Federated Node is a self-contained server that runs the software necessary to support one or more "roles".
Such roles may be:

- Counterwallet server
- Vending machine (future)
- Block explorer server (future)
- A plain old ``counterparty-server`` installation

Each backend server runs multiple services (some required, and some optional, or based on the role chosen).
As each server is self-contained, they can be combined by the client-side software to allow for high-availability/load balancing.

For instance, software such as Counterwallet may then utilize these backend servers in making API calls either sequentially (i.e. failover) or in
parallel (i.e. consensus-based). For instance, with Counterwallet, when a user logs in, this list is shuffled so that
in aggregate, user requests are effectively load-balanced across available servers. Indeed, by setting up multiple such
(Counterblock) Federated Nodes, one can utilize a similar redundancy/reliability model in one's own 3rd party application
that Counterwallet utilizes. Or, one can utilize a simplier configuration based on a single, stand-alone server.

This document describes how one can set up their own Counterblock Federated Node server(s). It is primarily intended
for system administrators and developers.


Federated Node Services
-------------------------

A federated node runs several services on the same system, which includes **required [Counterparty platform components](platform_architecture.md)** and the following *optional* services:

###armory_utxsvr

This service is used by ``counterblock`` with Counterwallet, to allow for the creation of unsigned transaction
ASCII text blocks, which may then be used with an [Offline Armory configuration](https://bitcoinarmory.com/about/using-our-wallet/).
This service requires Armory itself, which is automatically installed as part of the Federated Node setup procedure.

###nginx

``nginx`` normally frontends communications on Counterwallet, Vending, etc nodes. Not used with `counterparty-server`-only nodes.


Federated Node Provisioning
--------------------------------

###Production

Here are the recommendations and/or requirements when setting up a production-grade Counterblock Federated Node:

**Server Hardware/Network Recommendations:**

- Xeon E3+ or similar-class processor
- 16GB+ RAM (ECC)
- Disk drives in RAID-1 (mirrored) configuration (SSD prefered)
- Hosted in a secure data center with physical security and access controls
- DDOS protection recommended if you will be offering your service to others

**Disk Space Requirements:**

The exact disk space required will be dependent on what services are run on the node:

- Base System: **50GB** (to be safe)
- ``counterparty``, ``counterblock`` databases: **~500MB**
- ``armory_utxsvr``: **~25GB** (mainnet), **~3GB** (testnet)

Generally, we recommend building on a server with at least 120GB of available disk space.

**Server Software:**

- Ubuntu 14.04 64-bit required

**Server Security:**

The build script includes basic automated security hardening.

Before running this script, we strongly advise the following:

- SSH should run on a different port, with root access disabled
- Use ufw (software firewall) in addition to any hardware firewalls:
  - `sudo ufw allow ssh`   #(or whatever your ssh port is, as '12345/tcp', in place of 'ssh')
  - `sudo ufw allow http`
  - `sudo ufw allow https`
  - `sudo ufw enable`
- Only one or two trusted individuals should have access to the box. All root access through ``sudo``.
- Utilize 2FA (two-factor authentication) on SSH and any other services that require login.
  [Duo](https://www.duosecurity.com/) is a good choice for this (and has great `SSH integration).
- The system should have a proper hostname (e.g. counterblock.myorganization.org), and your DNS provider should be DDOS resistant
- If running multiple servers, consider other tweaks on a per-server basis to reduce homogeneity.  
- Enable Ubuntu's automated security updates (our script will do this if you didn't)

###Testing / Development

If you'd like to set up a Counterblock Federated Node system for testing and development, the requirements are minimal. Basically you
need to set up a Virtual Machine (VM) instance (or hardware) at the Ubuntu version listed above, at least **2 GB**
of memory, and enough disk space to cover the installation and use of the desired components.

Node Setup
-----------

Once the server is provisioned and set up as above, you will need to install all of the necessary software and dependencies using the Bash shell. We have an
installation script for this, that is fully automated **and installs ALL dependencies, including ``bitcoind``**

    BRANCH=master
    wget -q -O /tmp/fednode_run.py https://raw.github.com/CounterpartyXCP/federatednode_build/${BRANCH}/run.py
    sudo python3 /tmp/fednode_run.py

Note: above ``wget`` commands overwrite previously downloaded setup scripts (if any). Make a backup if you want to keep them.

Then just follow the on-screen prompts (choosing to build from *master* if you are building a production node,
or from *develop* **only** if you are a developer or want access to bleeding edge code that is not fully tested).

Once done, start up ``bitcoind`` daemon(s)

    sudo sv start bitcoin
    sudo sv start bitcoin-testnet
    
    sudo tail -f ~xcp/.bitcoin/debug.log
    sudo tail -f ~xcp/.bitcoin/testnet3/debug.log

That last command will give you information on the Bitcoin blockchain download status. As we are running the 10.0.0+ bitcoind release, a full blockchain sync may take as little as 2-4 hours.

After the blockchain starts downloading, you can launch the ``armory_utxsvr``, if you're using that (**Counterwallet role only**):

    sudo sv start armory_utxsvr
    sudo sv start armory_utxsvr-testnet
    
    sudo tail -f ~xcp/.armory/armorylog.txt
    sudo tail -f ~xcp/.armory/testnet3/armorylog.txt

Next, (for all server types), start ``counterparty-server`` itself:

    sudo sv start counterparty
    sudo sv start counterparty-testnet
    
    sudo tail -f ~xcp/.cache/counterparty/log/server.log
    sudo tail -f ~xcp/.cache/counterparty/log/server.testnet.log

Then, watching these log(s), wait for `bitcoind` and `counterparty-server` synchronization to finish. Given that `counterparty-server` will bootstrap by default, it may take only a few minutes for it to finish catching up.

After this is all done, reboot the box for the new services to start (which includes both ``counterparty-server`` and ``counterblock``).

``counterblock``, after starting up must then sync to ``counterparty-server``:

    sudo sv start counterblock
    sudo sv start counterblock-testnet

It will do this automatically, and the process will take between 3 minutes to 20 minutes most likely. You can check on the status of ``counterblock``'s sync using:

    sudo tail -f ~xcp/.cache/counterblock/log/server.log
    sudo tail -f ~xcp/.cache/counterblock/log/server.testnet.log

Once it is fully synced up, you should be good to proceed.

###"Counterwallet server" role

If you are setting up a Counterwallet server, you will next need to create a `counterwallet.conf.json` configuration file.
Instructions for doing that are detailed in the *Counterwallet Configuration File* section later in this document. Once creating this file, open up a web browser, and go to the IP address/hostname of the server. You will then be presented to accept your self-signed SSL certificate, and after doing that, should see the Counterwallet login screen.

###"counterparty-server only" role

If you selected the "counterparty-server only" role, you can access the `counterparty-server` API directly, using port `4000` (mainnet) or `14000` (testnet).

* If you chose to expose the interface publically during setup, you can access the API from localhost or any other host, using user `rpc` with password `1234`.
* If you chose not to expose the interface publically during setup, you can access the API from localhost only, using the user and password defined in the appropriate counterparty-server `server.conf` file.

###"counterblock basic" role

If you selected the "counterblock basic" role, `counterblock`, you can access the `counterblock` API, using port `4100` (mainnet) or `14100` (testnet).

* If you chose to expose the interface publically during setup, you can access the API from localhost or any other host, with no user authentication required. Moreover, the `counterparty-server` APIs are exposed to all hosts on the ports noted above, using the user and password noted above (`rpc` and `1234`).
* If you chose not to expose the interface publically during setup, you can access the API from localhost only, with no user authentication required. The `counterparty-server` ports and APIs are *not* exposed to any host except localhost.

Easy Updating
--------------------------

To update the system with new code releases, you simply need to rerun the ``run.py`` script, like so:

    cd ~xcp/federated_node
    sudo python3 run.py
    
As prompted, you should be able to choose just to update ("u"), instead of to rebuild. However, you would choose the rebuild
option if there were updates to the ``federatednode_build`` system files (such as the
``nginx`` configuration, or the init scripts) or `run.py` script itself that you want/need to apply. Otherwise, update should be fine. 

Other Operations
--------------------------

###Stop all configured services

``sudo ~xcp/federatednode_build/run.py --op=stop``

###Restart all configured services

``sudo ~xcp/federatednode_build/run.py --op=restart``

Getting a SSL Certificate
--------------------------

By default, the system is set up to use a self-signed SSL certificate. If you are hosting your services for others, 
you should get your own SSL certificate from your DNS registrar so that your users don't see a certificate warning when
they visit your site. Once you have that certificate, create a nginx-compatible ``.pem`` file, and place that
at ``/etc/ssl/certs/counterblock.pem``. Then, place your SSL private key at ``/etc/ssl/private/counterblock.key``.

After doing this, edit the ``/etc/nginx/sites-enabled/counterblock.conf`` file. Comment out the two development
SSL certificate lines, and uncomment the production SSL cert lines, like so:

    #SSL - For production use
    ssl_certificate      /etc/ssl/certs/counterblock.pem;
    ssl_certificate_key  /etc/ssl/private/counterblock.key;
  
    #SSL - For development use
    #ssl_certificate      /etc/ssl/certs/ssl-cert-snakeoil.pem;
    #ssl_certificate_key  /etc/ssl/private/ssl-cert-snakeoil.key;

Then restart nginx:

    sudo sv restart nginx


Troubleshooting
------------------------------------

If you experience issues with your Counterblock Federated Node, a good start is to check out the logs. Something like the following should work::

    #mainnet
    sudo tail -f ~xcp/.cache/counterparty/log/server.log
    sudo tail -f ~xcp/.cache/counterparty/log/api.log
    sudo tail -f ~xcp/.cache/counterblock/log/server.log
    sudo tail -f ~xcp/.cache/counterblock/log/api.log

    #testnet
    sudo tail -f ~xcp/.cache/counterparty/log/server.testnet.log
    sudo tail -f ~xcp/.cache/counterparty/log/server.testnet.api.log
    sudo tail -f ~xcp/.cache/counterblock/log/server.testnet.log
    sudo tail -f ~xcp/.cache/counterblock/log/server.testnet.api.log
    
    #relevant nginx logs
    sudo tail -f /var/log/nginx/counterblock.access.log
    sudo tail -f /var/log/nginx/counterblock.error.log

These logs should hopefully provide some useful information that will help you further diagnose your issue. You can also
keep tailing them (or use them with a log analysis tool like Splunk) to gain insight on the current
status of ``counterparty``/``counterblock``.

Also, you can start up the daemons in the foreground, for easier debugging, using the following sets of commands:

    #launch bitcoind mainnet
    sudo su -s /bin/bash -c 'bitcoind -conf=/home/xcp/.bitcoin/bitcoin.conf' xcpd
    #launch bitcoind testnet
    sudo su -s /bin/bash -c 'bitcoind -conf=/home/xcp/.bitcoin/bitcoin.testnet.conf' xcpd

    #launch counterparty-server mainnet
    sudo su -s /bin/bash -c 'counterparty-server start' xcpd
    #launch counterblock mainnet
    sudo su -s /bin/bash -c 'PYTHON_EGG_CACHE=/tmp/counterblock.eggs counterblock' xcpd
    
    #launch counterparty-server testnet
    sudo su -s /bin/bash -c 'counterparty-server --config-file /home/xcp/.config/counterparty/server.testnet.conf start' xcpd
    #launch counterblock testnet
    sudo su -s /bin/bash -c 'PYTHON_EGG_CACHE=/tmp/counterblock.eggs counterblock --config-file /home/xcp/.config/counterblock/server.testnet.conf' xcpd

You can also interface with Bitcoin Core by running ``bitcoin-cli`` commands, e.g.:

    #mainnet
    sudo su - xcpd -s /bin/bash -c "bitcoin-cli -conf=/home/xcp/.bitcoin/bitcoin.conf getinfo"
    
    #testnet
    sudo su - xcpd -s /bin/bash -c "bitcoin-cli -conf=/home/xcp/.bitcoin/bitcoin.testnet.conf getinfo"


Monitoring the Server
----------------------

To monitor the server, you can use a 3rd-party service such as [Pingdom](http://www.pingdom.com) or [StatusCake](http://statuscake.com).
The federated node allows these (and any other monitoring service) to query the basic status of the server (e.g. the ``nginx``,
``counterblock`` and ``counterparty`` services) via making a HTTP GET call to one of the following URLs:

* ``/_api/`` (for mainnet) 
* ``/_t_api/`` (for testnet)

If all services are up, a HTTP 200 response with the following data will be returned:

    {"counterparty-server": "OK", "counterblock_ver": "1.3.0", "counterparty-server_ver": "9.31.0", "counterblock": "OK",
    "counterblock_check_elapsed": 0.0039348602294921875, "counterparty-server_last_block": {
    "block_hash": "0000000000000000313c4708da5b676f453b41d566832f80809bc4cb141ab2cd", "block_index": 311234,
    "block_time": 1405638212}, "local_online_users": 7, "counterparty-server_check_elapsed": 0.003687143325805664, 
    "counterblock_error": null, "counterparty-server_last_message_index": 91865}
    
Note the ``"counterparty-server": "OK"`` and ``"counterblock": "OK"`` items.

If all services but ``counterparty-server`` are up, a HTTP 500 response with ``"counterparty-server": "NOT OK"``, for instance.

If ``counterblock`` is not working properly, ``nginx`` will return a HTTP 503 (Gateway unavailable) or 500 response.

If ``nginx`` is not working properly, either a HTTP 5xx response, or no response at all (i.e. timeout) will be returned.


Counterwallet-Specific
-----------------------

###Creating a configuration file

Counterwallet can be configured via creating a small file called ``counterwallet.conf.json`` in the ``counterwallet/`` directory.
This file will contain a valid JSON-formatted object, containing an a number of possible configuration properties. For example::

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

Here's a description of the possible fields:

**Required fields:**

* **servers**: Counterwallet should work out-of-the-box in a scenario where you have a single Counterblock Federated Node that both hosts the static site content, as well as the backend Counterblock API services. However, Counterwallet can also be set up to work in MultiAPI mode, where it can query more than one server (to allow for both redundancy and load balancing). To do this, set this ``servers`` parameter as a list of multiple server URIs. Each URI can have a ``http://`` or ``https://`` prefix (we strongly recommend using HTTPS), and the strings must *not* end in a slash (just leave it off). If the server hostname does not start with ``http://`` or ``https://``, then ``https://`` is assumed.

If you just want to use the current server (and don't have a multi-server setup), just specify this as ``[]`` (empty list).*

**Optional fields:**

* **forceTestnet**: Set to true to always use testnet (not requiring 'testnet' in the FQDN, or the '?testnet=1' parameter in the URL.
* **googleAnalyticsUA** / **googleAnalyticsUA-testnet**: Set to enable google analytics for mainnet/testnet. You must have a google analytics account.
* **rollbarAccessToken**: Set to enable client-side error tracking via rollbar.com. Must have a rollbar account.
* **disabledFeatures**: Set to a list of zero or more features to disable in the UI. Possible features are:
  ``betting``, ``rps``, ``dividend``, ``exchange``, ``leaderboard``, ``portfolio``, ``stats`` and ``history``. Normally
  this can just be ``[]`` (an empty list) to not disable anything.
* **restrictedAreas**: Set to an object containing a specific page path as the key (or "dividend" for dividend functionality),
  and a list of one or more ISO 2-letter country codes as the key value, to allow for country-level blacklisting of pages/features.

Once done, save this file and make sure it exists on all servers you are hosting Counterwallet static content on. Now, when you go to your Counterwallet site, the server will read in this file immediately after loading the page, and set the list of
backend API hosts from it automatically.

###Giving Op Chat Access

Counterwallet has its own built-in chatbox. Users in the chat box are able to have operator (op) status, which allows them
to do things like ban or rename other users. Any op can give any other user op status via the ``/op`` command, typed into
the chat window. However, manual database-level intervention is required to give op status to the first op in the system.

Doing this, however, is simple. Here's an example that gives ``testuser1`` op access. It needs to be issued at the
command line for every node in the cluster::

    #mainnet
    mongo counterblockd
    db.chat_handles.update({handle: "testuser1"}, {$set: {op: true}})
    
    #testnet
    mongo counterblockd_testnet
    db.chat_handles.update({handle: "testuser1"}, {$set: {op: true}})

###Enabling multi-lingual support

By default, Counterwallet builds with only (US) English support enabled. To enable support for other languages and I18N features, you must build the Transifex translations. This process is manual as Transifex unfortunately requires a username and password to do this, instead of an API key or some other method of access. Here's the process:

1. Make sure the federated node build process completed successfully, and that you chose "Counterwallet server" for the role.
2. Sign up for an account on http://www.transifex.com
3. Create a file at `/home/xcp/.transifex` with your account username and password the format of `user:password` (i.e. all on one line)
4. Run the command: `sudo su -s /bin/bash -c 'cd ~xcp/counterwallet && grunt transifex --force' xcp`

The translations should then be built, and multilingual support will be enabled on the site.


Other Topics
--------------

###Development workflow

With a federated node setup, it's rather easy to make source-level changes to Counterparty-related changes and test/debug them. First, run the federated node setup as normal. Then, issue the following commands:

```
cd ~xcp/federatednode_build/dist

#remove any symlinks that exist
sudo rm -f counterparty-lib counterparty-cli counterblock

#checkout the develop branches of everything (or whatever other branch you see fit)
git clone -b develop https://github.com/CounterpartyXCP/counterpartyd.git counterparty-lib
git clone -b develop https://github.com/CounterpartyXCP/counterparty-cli.git
git clone -b develop https://github.com/CounterpartyXCP/counterblock.git
```

Then you can make your changes to the source code as you see fit. To test the changes, run the ``setup.py install`` for the appropriate component, using the appropriate ``python``.

For ``counterparty-lib`` this would be:
sudo ~xcp/federatednode_build/env.counterblock/bin/python2.7 counterparty-lib/setup.py install

For ``counterblock`` this would be:
sudo ~xcp/federatednode_build/env.counterblock/bin/python2.7 counterblock/setup.py install

You can then re-launch the component (most likely in the console) using the appropriate command, documented earlier.

###System user configuration

Note that when you set up a federated node, the script creates two new users on the system: ``xcp`` and ``xcpd``. (The
``xcp`` user also has an ``xcp`` group created for it as well.) 

**Important**: The setup script by default creates user home under the ``/home``. If you wish to store the ``xcp`` user's data on another volume, mount it to ``/home/xcp`` (rather than, for example, ``/xcp``).

The script installs ``counterparty-server``, ``counterwallet``, etc into the home directory of the ``xcp`` user. This
user also owns all installed files. However, the daemons (i.e. ``bitcoind``, ``counterparty-server``, ``counterblock``, and ``nginx``) are actually run as the ``xcpd`` user, which has no write access to the files such as the ``counterwallet`` and ``counterparty-server`` source code files. The reason things are set up like this is so that even if there is a horrible bug in one of the products that allows for a RCE (or Remote Control Exploit), where the attacker would essentially be able to gain the ability to execute commands on the system as that user, two things should prevent this:

* The ``xcpd`` user doesn't actually have write access to any sensitive files on the server (beyond the log and database
  files for ``bitcoind``, ``counterparty-server``, etc.)
* The ``xcpd`` user uses ``/bin/false`` as its shell, which prevents the attacker from gaining shell-level access

This setup is such to minimize (and hopefully eliminate) the impact from any kind of potential system-level exploit.

###More on multiple Counterwallet servers

For the time being, the Counterparty team itself operates the primary Counterwallet platform at `counterwallet.io`. However, as Counterwallet is open source software, it is possible to host your own site with Counterwallet site (for your personal use, or as an offering to others), or to even host your own Counterwallet servers to use with your own Counterparty wallet implementation. The Counterparty team supports and encourages this kind of activity (as long as the servers are secure), as it aids with increasing decentralization.
        
Also note that due to the nature of Counterwallet being a deterministic wallet, users using one Counterwallet platform (i.e. the official one, for instance) have the flexibility to start using a different Counterwallet platform instead at any time, and as funds (i.e. private keys) are not stored on the server in any fashion, they will be able to see their funds on either. (Note that the only thing that will not migrate are saved preferences, such as address aliases, the theme setting, etc.)

###Counterwallet MultiAPI specifics

Counterwallet utilizes a sort of a "poor man's load balancing/failover" implementation called multiAPI (and implemented
[here](https://github.com/CounterpartyXCP/counterwallet/blob/master/src/js/util.api.js)). multiAPI can operate in a number of fashions.

**multiAPIFailover for Read API (``get_``) Operations**

*multiAPIFailover* functionality is currently used for all read API operations. In this model, the first Federated Node
on the shuffled list is called for the data, and if it returns an error or the request times out, the second one on the
list is called, and so on. The result of the first server to successfully return are used.

Here, a "hacked" server could be modified to return bogus data. As (until being discovered) the server would be in the
shuffled list, some clients may end up consulting it. However, as this functionality is essentially for data queries only,
the worse case result is that a Counterwallet client is shown incorrect/modified data which leads to misinformed actions
on the user's behalf. Moreover, the option always exists to move all read-queries to use multiAPIConsensus in the future should the need arise.

**multiAPIConsensus for Action/Write (``create_``) Operations**

Based on this multiAPI capability, the wallet itself consults more than one of these Federated Nodes via consensus especially
for all ``create_``-type operations. For example, if you send XCP, `counterparty-server` on each server is still composing and sending
back the unsigned raw transaction, but for data security, it compares the results returned from all servers, and will 
only sign and broadcast (both client-side) if all the results match). This is known as *multiAPIConsensus*.

The ultimate goal here is to have a federated net of semi-trusted backend servers not tied to any one country, provider, network or
operator/admin. Through requiring consensus on the unsigned transactions returned for all ``create_`` operations, 'semi-trust'
on a single server basis leads to an overall trustworthy network. Worst case, if backend server is hacked and owned
(and the `counterparty-server` code modified), then you may get some invalid read results, but it won't be rewriting your XCP send
destination address, for example. The attackers would have to hack the code on every single server in the same exact
way, undetected, to do that.

Moreover, the Counterwallet web client contains basic transaction validation code that will check that any unsigned Bitcoin
transaction returned from a Counterblock Federated Node contains expected inputs and outputs. This provides further
protection against potential attacks.

multiAPIConsensus actually helps discover any potential "hacked" servers as well, since a returned consensus set with
a divergent result will be rejected by the client, and thus trigger an examination of the root cause by the team.

**multiAPINewest for Redundant storage**

In the same way, these multiple servers are used to provide redundant storage of client-side preferences, to ensure we
have no single point of failure. In the case of the stored preferences for instance, when retrieved on login, the data from all servers
is taken in, and the newest result is used. This *multiAPINewest* functionality effectively makes a query across all available
Federated Nodes, and chooses the newest result (based on a "last updated"-type timestamp).

Note that with this, a "hacked" server could be modified to always return the latest timestamp, so that its results
were used. However, wallet preferences (and other data stored via this functionality) is non-sensitive, and thus user's
funds would not be at risk before the hacked server could be discovered and removed.
