Installation
============

Installing counterpartyd
------------------------

**NOTE: This section covers manual installation of counterpartyd. If you
want more of an automated approach to counterpartyd installation for
Windows and Ubuntu Linux, use the `build system`_.**

Installation on alternative operating systems: Ubuntu 14.04 is the
default OS for Counterparty software, but counterpartyd is known to run
on other versions of Ubuntu and even other OS as well. \ Stand-alone
`counterpartyd`_, `ArchLinux`_, `Debian`_, OS X \ `How to choose?`_
- page with overview of software packages and installation options for
System Administrators and Developers*

In order for counterpartyd to function, it must be able to communicate
with a running instance of Bitcoin Core, which handles many
Bitcoin‐specific matters on its behalf, including all wallet and private
key management. For such interoperability, `a fork of Bitcoin Core with
an address index`_ must be used, and it must be run with the following
options: ``-txindex=1``, ``-server=1``, ``-addrindex=1``,
``-rpcthreads=1000`` and ``-rpctimeout=300``. You may also have to set a
JSON‐RPC password, which may be saved in Bitcoin Core’s configuration
file.

counterpartyd needs to know at least the JSON‐RPC password of the
Bitcoin Core with which it is supposed to communicate. The simplest way
to set this is to include it in all command‐line invocations of
counterpartyd, such as
``./counterpartyd.py --rpc-password=PASSWORD ACTION``. To make this and
other options persistent across counterpartyd sessions, one may store
the desired settings in a configuration file specific to counterpartyd.

Note that the syntaxes for the countpartyd and the Bitcoin Core
configuration files are not the same. A Bitcoin Core configuration file
looks like this:

::

        rpcuser=bitcoinrpc
        rpcpassword=PASSWORD
        rpcthreads=1000
        rpctimeout=300
        testnet=1
        txindex=1
        server=1
        addrindex=1

However, a counterpartyd configuration file looks like this:

::

        [Default]
        backend-rpc-password=PASSWORD

Note the change in hyphenation between ``rpcpassword`` and
``rpc-password``.

If and only if counterpartyd is to be run on the Bitcoin testnet, with
the ``--testnet`` CLI option, Bitcoin Core must be set to do the same
(``-testnet=1``). counterpartyd may run with the ``--testcoin`` option
on any blockchain, however.

.. _build system: http://counterparty.io/docs/build-system/
.. _ArchLinux: https://github.com/CounterpartyXCP/CommunityWiki/wiki/Counterpartyd-on-ArchLinux
.. _Debian: https://github.com/CounterpartyXCP/CommunityWiki/wiki/Counterpartyd-on-Debian
.. _How to choose?: https://github.com/CounterpartyXCP/CommunityWiki/wiki/Counterparty-Glossary,-Sites-and-Repositories
.. _a fork of Bitcoin Core with an address index: https://github.com/btcdrak/bitcoin/releases/tag/addrindex-0.10.0

Installing a Federated Node
---------------------------
