#Counterparty Platform Architecture 

In the figure below you can see how all Counterparty platform components interact with each other.

![](/_images/architecture1.png)

<br/>  
  
##Reference Implementation
[`counterparty-lib`](counterparty-lib.md) is a Python library that serves as the reference implementation of the Counterparty Protocol. It has a number of interfaces, such as a CLI and desktop a GUI.


##Counterparty CLI

[`counterparty-cli`](counterparty-cli.md) is a command‐line interface for `counterparty-lib`, including its API server.


##Counterparty GUI

`counterparty-gui` is a PyQT5 GUI for counterparty-lib. (*forthcoming*)


##Counterwallet

[Counterwallet](counterwallet_doc.md) is a web wallet for Bitcoin (BTC) and Counterparty (XCP). It is being actively developed and currently implements most Counterparty features.

- Fully functional wallet for BTC, XCP, and user-created tokens
- Peer-to-peer asset trading with algorithmic order matching (XCP, other assets)
- Custom asset creation
- Betting
- Broadcasting data on the Bitcoin Blockchain


##Counterblock

The [`counterblock`](counterblock_API.md) daemon provides a higher-level API that layers on top of counterparty-server‘s API, and includes extended information, such as market and price data, trade operations, asset history, and more. It is used extensively by Counterwallet itself, and is appropriate for use by applications that require additional API-based functionality beyond the scope of what counterparty-server provides.

`counterblock` also provides a proxy-based interface to all `counterparty-server` API methods, via the `proxy_to_counterpartyd` API call.  Such services include:

- Realtime data streaming via socket.io
- An extended API for Counterwallet-specific actions like wallet preferences storage and retrieval
- API includes functionality for retrieving processed time-series data suitable for display and manipulation (useful for distributed exchange price data, and more)

##Federated Node

**TODO**
