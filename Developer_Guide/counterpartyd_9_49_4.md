## DESCRIPTION

## MIGRATON

### For everyone:

`pip3 install counterparty-cli`

**NOTE 1** 

If you have a `counterpartyd` standard installation (ie. data dir in `~/.config/counterpartyd/`), the installation script will do automatically the following steps. Else, if you have a Bitcoin Core already installed the installation script will use `.bitcoin/bitcoin.conf` to generate the two configurations files. Else, it will generate the two configuration file with a random password for the `counterparty-server`. 

If your configuration files (`counterpartyd` or Bitcoin Core's `bitcoin.conf`) are in non-default locations, the installation script will not look for them. You may want to place them - if only temporarily - in the default locations and then run the installation script. After that you can modify your service startup script(s) to use the names of new `counterparty-lib` script(s) and move the configuration files back to their non-default locations.

**NOTE 2**

Here a table of equivalence of the different configuration files:

bitcoin.conf  | countepartyd.conf  | counteparty-server.conf | counteparty-client.conf
------------- | ------------- | ------------- | -------------
- | rpc-host | rpc-host | counterparty-rpc-host
- | rpc-port | rpc-port | counterparty-rpc-port
- | rpc-user | rpc-user | counterparty-rpc-user
- | rpc-password | rpc-password | counterparty-rpc-password
- | backend-rpc-connect | backend-connect | wallet-connect
rpcport | backend-rpc-port | backend-port | wallet-port
rpcuser | backend-rpc-user | backend-user | wallet-user
rpcpassword | backend-rpc-password | backend-password | wallet-password

### For `counterpartyd.py`/API users:

- move `~/.config/counterpartyd/counterpartyd.conf` to `~/.config/counterparty-server/counterparty-server.conf`
- move `~/.config/counterpartyd/counterpartyd.9.db` to `~/.config/counterparty-server/counterparty.9.db`
- Edit `~/.config/counterparty-server/counterparty-server.conf`:
	- replace `backend-rpc-*` (or `bitcoind_rpc_*`) by `backend-*`
	- replace `blockchain-service-name` by `backend-name`
	- replace `jmcorgan` by `addrindex`
- use `counterparty-server` like `counterpartyd`, but use `start` instead `server` to start the synchronisation with the blockchain and the RPC server.
- ensure that your script provides pubkey of the source and multisig destinations if they are not present in the blockchain
- ensure that your script provides private keys to sign transaction

### For `counterparty-cli.py` users:

- create `~/.config/counterparty-client/counterparty-client.conf`
- use `counterparty-client` like `counterparty-cli` to make transactions and manage wallet.
