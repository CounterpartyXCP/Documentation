#Getting Started

Counterparty currently offers two software implementations of its protocol: the Command-Line interface `counterparty-cli` and the web wallet `Counterwallet`.

##Command-Line Interface

The command line interface for `counterparty-lib` (the reference implementation of the [Counterparty Protocol](protocol_specification.md)) named `counterparty-cli` is suitable for lightweight use of all of the features offered by the Counterparty platform. 

Full documentation on how to install `counterparty-cli` can be found [here](counterparty_cli.md).

If you’re a developer with ample system resources (i.e. can run a VM with 1GB+ of RAM), it is recommended to run a **Federated Node on Ubuntu 14.04** which will give you a complete test & development environment. 

Full installation documentation can be found [here](federated_node.md).

##Counterwallet

Counterwallet requires `counterparty-cli`, `counterparty-lib`, `counterblock` and some other 3rd party services. 

The best way to install Counterwallet is to setup a [Counterblock Federated Node](federated_node.md) on the supported OS (Ubuntu). The same Federated Node page explains how all components fit together and what each of them does. There is no other automated way to install Counterparty at the moment.

