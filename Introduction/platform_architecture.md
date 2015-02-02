#Counterparty Platform Architecture 

In the figure below you can see how all Counterparty platform components interact with each other.

![](/_images/architecture1.png)

<br/>  
  
The `counterblock` daemon provides a high-level API used by Counterwallet.  `counterparty-lib` is the reference implementation of the Counterparty Protocol used by counterparty-cli (the Command Line Interface of counterparty-lib) and counterparty-gui (the PyQT5 GUI for counterparty-lib).
Following is a description of each individual component.

##Counterparty CLI and counterparty-lib

[`counterparty-cli`](counterparty-cli.md) is a command line interface for counterparty-lib. counterparty-cli and counterparty-lib comprise the Counterparty reference client itself. It’s responsibilities include parsing out Counterparty transactions from the Bitcoin blockchain. It has a basic command line interface, and a relatively low-level API for getting information on specific transactions, or general state info.

##Counterparty GUI

`counterparty-gui` is a PyQT5 GUI for counterparty-lib. The GUI is under active development and is expected to be released in production in the upcoming weeks.

##Counterwallet

[Counterwallet](counterwallet_doc.md) is the open-source web wallet for Bitcoin (BTC) and Counterparty (XCP). It is being actively developed and currently implements most Counterparty features:

- Fully functional wallet for BTC, XCP, and user-created tokens
- Peer-to-peer asset trading with algorithmic order matching (XCP, other assets)
- Custom asset creation
- Betting
- Broadcasting data on the Bitcoin Blockchain

##counterblock

The [`counterblock`](counterblock_API.md) daemon provides a higher-level API that layers on top of counterparty-server‘s API, and includes extended information, such as market and price data, trade operations, asset history, and more. It is used extensively by Counterwallet itself, and is appropriate for use by applications that require additional API-based functionality beyond the scope of what counterparty-server provides.
`counterblock` also provides a proxy-based interface to all `counterparty-server` API methods, via the `proxy_to_counterpartyd` API call.  Such services include:

- Realtime data streaming via socket.io
- An extended API for Counterwallet-specific actions like wallet preferences storage and retrieval
- API includes functionality for retrieving processed time-series data suitable for display and manipulation (useful for distributed exchange price data, and more)
