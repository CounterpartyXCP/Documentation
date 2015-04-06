#Counterparty Platform Architecture 

In the figure below you can see how all Counterparty platform components interact with each other.

![](/_images/platform_architecture1.png)
  
##Reference Implementation
[`counterparty-lib`](Developers/counterparty_lib.md) is a Python library that serves as the reference implementation of the Counterparty Protocol. It has a number of interfaces, such as a CLI and desktop a GUI.


##Counterparty CLI

[`counterparty-cli`](counterparty-cli.md) is a command‐line interface for `counterparty-lib`, including its API server.


##Counterparty GUI

`counterparty-gui` is a PyQT5 GUI for counterparty-lib (and is currently in [BETA](https://github.com/CounterpartyXCP/counterparty-gui/releases/tag/v1.0.0-BETA)).


##Counterwallet

[Counterwallet](counterwallet_doc.md) is a free, open-source web wallet for Bitcoin (BTC), Counterparty (XCP) and user-created tokens. It is being actively developed and currently implements most Counterparty features.

- Deterministic client-side wallet
- Fully functional wallet for BTC, XCP, and user-created tokens
- Peer-to-peer asset trading with algorithmic order matching (XCP, other assets)
- Custom asset creation
- Payment distributions
- Betting
- Publishing information on the Bitcoin Blockchain

##Counterblock

``counterblock`` provides additional services to Counterwallet beyond those offered in the API provided by counterpartyd. It features a full-fledged JSON RPC-based API, which services Counterwallet, as well as any 3rd party services which wish to use it. ``counterblock`` has an extensible architecture, and developers may write custom plugins for it, which are loaded dynamically and allow them to extend counterblock with new parsing functionality, write gateways to other currencies or services, and much more.

With its set of core-plugins, counterblock provides a more high-level data processing, and an API that
layers on top of counterpartyd’s API.  `counterblock` generates and allows
querying of data such as market and price information, trade operations, asset
history, and more. It is used extensively by Counterwallet itself, and is
appropriate for use by applications that require additional API-based
functionality beyond the scope of what counterpartyd provides. 


##Federated Node

A federated node is a term for a [Linux-based counterparty build](https://github.com/CounterpartyXCP/federatednode_build) that inludes the various components in an integrated, out-of-the-box fashion. It's used primarily for Counterwallet server installations, but has other uses as well.

**NOTE:** If your application does not require this kind of functionality or APIs that `counterblock` provides, we recommend that you build and install `counterparty-cli` and `counterparty-lib` directly, via [these instructions](http://counterparty.io/docs/counterparty_lib/) for `counterparty-lib` and [these](http://counterparty.io/docs/counterparty-cli/) for `counterparty-cli`.
