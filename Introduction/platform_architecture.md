#Counterparty Platform Architecture 

In the figure below you can see how all Counterparty platform components interact with each other.

![](/_images/platform_architecture1.png)
  
##Reference Implementation
[`counterparty-lib`](Developers/counterparty_lib.md) is a Python library that serves as the reference implementation of the Counterparty Protocol. It has a number of interfaces, such as a CLI and desktop a GUI.


##Counterparty CLI

[`counterparty-cli`](counterparty-cli.md) is a command‐line interface for `counterparty-lib`, including its API server.


##Counterparty GUI

`counterparty-gui` is a PyQT5 GUI for counterparty-lib. (in [beta](https://github.com/CounterpartyXCP/counterparty-gui/releases/tag/v1.0.0-BETA))


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

The [`counterblock`](counterblock_API.md) daemon provides a higher-level API that layers on top of counterparty-server‘s API, and includes extended information, such as market and price data, trade operations, asset history, and more. It is used extensively by Counterwallet itself, and is appropriate for use by applications that require additional API-based functionality beyond the scope of what counterparty-server provides.

`counterblock` also provides a proxy-based interface to all `counterparty-server` API methods, via the `proxy_to_counterpartyd` API call.  Such services include:

- Realtime data streaming via socket.io
- An extended API for Counterwallet-specific actions like wallet preferences storage and retrieval
- API includes functionality for retrieving processed time-series data suitable for display and manipulation (useful for distributed exchange price data, and more)

##Federated Node

**TODO**
