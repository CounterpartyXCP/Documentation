---
title: Installation
---

On Linux and OS X, install as a non-root sudo-er from home directory.

**Clone and check out the code**

On all OS, clone federatednode repo and enter cloned directory:

```
git clone https://github.com/CounterpartyXCP/federatednode.git
cd federatednode
```

On Linux and OS X:

```
sudo ln -sf `pwd`/fednode.py /usr/local/bin/fednode
```

On Windows (if using Docker Quickstart Terminal, a.k.a MINGW64):
```
mkdir ~/bin
echo "python.exe \"`pwd`\\fednode.py\" \$*" > ~/bin/fednode
chmod +x ~/bin/fednode
```

On Windows (if using Windows Command prompt):

```
> C:\Windows\fednode.bat echo python.exe %CD%\fednode.py \%*
```

**Build and link the containers**

Run the following command:
```
fednode install <CONFIG> <BRANCH>
```

Where `<CONFIG>` is one of the following:

* **`base`** if you want to run `counterparty-server` and `bitcoind` only
* **`counterblock`** if you want to run everything in `base`, with the addition of `counterblock` and its dependencies (`mongodb` and `redis`)
* **`full`** if you would like to run a *full federated node configuration*, which is all services on the [list above](#services)

And where `<BRANCH>` is one of the following:

* **`master`** (stable and recommended)
* **`develop`** (cutting edge, likely with bugs)

For example:
```
# install a base configuration for the master branch
fednode install base master

# install a full configuration for the develop branch
fednode install full develop
```
In some cases (slow host, limited bandwidth), you may experience a failure to install due to download timeouts which happen because of network unstability. In that case consider changing Docker's `max-concurrent-downloads` value to 1 or 2 from default 3. To do that create a custom `/etc/docker/daemon.json` daemon options file and restart Docker service.

As mentioned earlier, the install script may stop if ports used by Federated Node services are used by other applications. While it is not recommended to run Federated Node alongside production services, small changes can make the evaluation of Federated Node easier. For example you may change ports used by existing applications (or disable said applications) or run Federated Node inside of a virtual machine.

For example, the original mongodb can be reconfigured to listen on port 28018 and counterblock's mongodb can use the default port 27017. The Federated Node install script makes it possible to specify the interface used by its mongodb container (example below), but it currently does not have the ability to do this for other services or get around port conflicts.

```
fednode install --mongodb-interface 127.0.0.2 counterblock master
```

**Wait for initial sync**

After installation, the services will be automatically started. To check the status, issue:
```
fednode ps
```

If you have existing instances of Bitcoin Core (either mainnet or testnet), at this point you could stop all services listed in `fednode ps` output, change configuration files (of counterparty and counterblock, for example) and point them to your existing Bitcoin Core. Configuration files can be found in various service directories located under federatednode/config.

Once the containers are installed and running, keep in mind that it will take some time for `bitcoind` to download the blockchain data. Once this is done, `counterparty-server` will fully start and sync, followed by `counterblock` (if in use). At that point, the server will be usable.

You may check the sync status by tailing the appropriate service logs, e.g. for Bitcoin Core and Counterparty server on mainnet:
```
fednode tail bitcoin
fednode tail counterparty
```

<a name="accessing"></a>**Access the system**

Once running, the system listens on the following ports:

* `counterparty-server`: 4000/tcp (mainnet), 14000/tcp (testnet)
* `counterblock`: 4001/tcp (mainnet), 14001/tcp (testnet)

For `counterparty-server`, use RPC username `rpc` and default password `rpc`.

If `counterwallet` is installed, access to the following URLs will be possible:

* `http://<host>/` — directs to `https`
* `https://<host>/` - main production URL (uses minified JS/CSS)
* `https://<host>/src/` - development URL (uses un-minified JS/CSS)

## Post-installation tasks

Ensure that your firewall software is enabled. If you want to provide access from external systems, you can allow through some or all of the [appropriate ports](#accessing). In addition, if you are running a node in a production scenario, it is recommended that you properly secure it.

You may also want to tighten ownership and permissions on all conf files in federatednode/config subdirectories, but keep in mind that you should be the only user with access to the operating system that runs Federated Node containers: Federated Node is not designed for shared OS environments.

**Ubuntu Linux**

Ubuntu Linux users can optionally run a little script that will issue a number of commands to assist with securing their systems:
```
cd extras/host_security
sudo ./run.py
```

Note that this script will make several modifications to your host system as it runs. Please review what it does [here](https://github.com/CounterpartyXCP/federatednode/blob/master/extras/host_security/run.py) before using it.

If you expect to run a busy Federated Node that requires counterblock, you can consider making the following performance tweaks for mongodb and redis. Please do not make these changes to the host if you're not comfortable with them because they impact not only Docker but the entire OS.

* Disable huge memory pages (for redis and mongodb): on Ubuntu 16.04 add `echo "never" > /sys/kernel/mm/transparent_hugepage/enabled` to /etc/rc.local and run `sudo systemctl enable rc-local.service`. Reboot and check with `cat /sys/kernel/mm/transparent_hugepage/enabled` (expected setting: `[never]`).
* Edit /etc/sysctl.conf (for redis): add `net.core.somaxconn = 511` and `vm.overcommit_memory = 1` and run `sudo sysctl -p`.

