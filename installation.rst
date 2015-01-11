Installation
============

Bitcoin Core with addrindex patch on Windows 7 and 2012
-------------------------------------------------------

Bitcoin Core 0.9.2
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Counterpartyd supports this version of Bitcoin Core (0.9.2 jmcorgan with
addrindex patch)

To build from source, download Bitcoin Core 0.9.2 patched with
jmcorgan’s addrindex patch and compile binaries by following any working
tutorial for Bitcoin Core 0.9.2.

Prebuilt Windows binaries can be found 3rd party sites such as `this
one`_. The same site has a `simple install guide`_ that may be useful in
addition to the `official Counterpartyd install guide`_.

Bitcoin Core 0.10.0
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Counterpartyd does not yet support this version, but can work with it.
More `here`_.

To build from source, download Bitcoin Core 0.10.0 patched with
jmcorgan’s addrindex patch and compile binaries by following any working
tutorial for Bitcoin Core 0.10.0.

Prebuilt Windows binaries of Bitcoin Core 0.10.0 with addrinex patch can
be found 3rd party sites such as \* `this`_ (deterministic Github
build), and \*
`this <https://github.com/rippler/bitcoin-core-0.10.0-addrindex/blob/master/README.md>`__
(personal build with how-to docs).

.. _this one: https://github.com/rippler/btc-jmcorgan-addrindex-v0.9.2.0-fca268c-beta
.. _simple install guide: https://github.com/rippler/btc-jmcorgan-addrindex-v0.9.2.0-fca268c-beta/blob/master/counterpartyd-ubuntu-14.04-lts-install.md
.. _official Counterpartyd install guide: http://counterparty.io/docs/build-system/build-from-source/
.. _here: https://github.com/rippler/bitcoin-core-0.10.0-addrindex
.. _this: https://github.com/btcdrak/bitcoin/releases/tag/addrindex-0.10.0

Installing counterpartyd
------------------------

**NOTE: This section covers manual installation of counterpartyd. If you
want more of an automated approach to counterpartyd installation for
Windows and Ubuntu Linux, use the** `build system`_. 

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
