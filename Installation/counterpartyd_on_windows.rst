Installing counterpartyd on Windows
========================================

Bitcoin Core with ``addrindex`` patch
-------------------------------------------------------

Bitcoin Core 0.9.2 on Windows 7 and 2012
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Counterpartyd supports this version of Bitcoin Core (0.9.2 jmcorgan with
addrindex patch)

To build from source, download Bitcoin Core 0.9.2 patched with
jmcorgan’s addrindex patch and compile binaries by following any working
tutorial for Bitcoin Core 0.9.2.

Prebuilt Windows binaries can be found 3rd party sites such as `this
one <https://github.com/rippler/btc-jmcorgan-addrindex-v0.9.2.0-fca268c-beta>`_. The same site has a `simple install guide <https://github.com/rippler/btc-jmcorgan-addrindex-v0.9.2.0-fca268c-beta/blob/master/counterpartyd-ubuntu-14.04-lts-install.md>`_ that may be useful in
addition to the :doc:`official Counterpartyd install guide </build_from_source.rst>`.

Bitcoin Core 0.10.0 on Windows 7 and 2012
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Counterpartyd does not yet support this version, but can work with it.
More `here <https://github.com/rippler/bitcoin-core-0.10.0-addrindex>`_.

To build from source, download Bitcoin Core 0.10.0 patched with
jmcorgan’s addrindex patch and compile binaries by following any working
tutorial for Bitcoin Core 0.10.0.

Prebuilt Windows binaries of Bitcoin Core 0.10.0 with addrinex patch can
be found 3rd party sites such as `this <https://github.com/btcdrak/bitcoin/releases/tag/addrindex-0.10.0>`_ (deterministic Github
build), and `this <https://github.com/rippler/bitcoin-core-0.10.0-addrindex/blob/master/README.md>`_
(personal build with how-to docs).

.. _this one: https://github.com/rippler/btc-jmcorgan-addrindex-v0.9.2.0-fca268c-beta
.. _simple install guide: https://github.com/rippler/btc-jmcorgan-addrindex-v0.9.2.0-fca268c-beta/blob/master/counterpartyd-ubuntu-14.04-lts-install.md
.. _official Counterpartyd install guide: http://counterparty.io/docs/build-system/build-from-source/
.. _here: https://github.com/rippler/bitcoin-core-0.10.0-addrindex
.. _this: https://github.com/btcdrak/bitcoin/releases/tag/addrindex-0.10.0
.. _Counterpartyd install documentation: http://counterparty.io/docs/build-system/
.. _official documentation: http://counterparty.io/docs/build-system/federated-node/

Installing counterpartyd
------------------------

This section covers manual installation of counterpartyd. If you want more of an automated approach to counterpartyd installation for Windows and Ubuntu Linux, use the :doc:`build system </build_counterpartyd.rst>`. 

In order for counterpartyd to function, it must be able to communicate
with a running instance of Bitcoin Core, which handles many
Bitcoin‐specific matters on its behalf, including all wallet and private
key management. For such interoperability, `a fork of Bitcoin Core with
an address index`_ must be used, and it must be run with the following
options: 


::

        txindex=1 
        server=1 
        addrindex=1
        rpcthreads=1000
        rpctimeout=300
        

You may also have to set a JSON‐RPC password, which may be saved in Bitcoin Core’s configuration file.

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
.. _ArchLinux:doc:archlinux_install
.. _Debian:doc:debian_install
.. _How to choose?:doc:glossary
.. _a fork of Bitcoin Core with an address index: https://github.com/btcdrak/bitcoin/releases/tag/addrindex-0.10.0


counterpartyd with 64 bit version of Python
-------------------------------------------
Counterparty can be installed with both the 32-bit and 64-bit version of
Python. Because some Counterparty dependencies do not play nicely with
the 64-bit version of Python it is safer to use the 32-bit version. This
page is for those interested in getting Counterparty to work with the
64-bit version of Python.

**Note:**

This process was tested twice on a freshly installed
and up-to-date version of Windows 7 SP1 x64, Python 3.4.1 and other
packages mentioned below and it was found to work.

**1. Install Visual Studio 2010 Express and Its SP1:** `Download link <https://www.microsoft.com/visualstudio/eng/downloads#d-2010-express>`_

**2. Install MS SDK for Windows v7.1**

        When installing, under ``Windows Native Code Development``, check ``Windows C++ Compilers`` `here <http://www.microsoft.com/en-us/download/details.aspx?displaylang=en&id=8279>`_

**3. Install KB 2519277** (`Microsoft Visual C++ 2010 Service Pack 1 Compiler Update for the Windows SDK 7.1 <http://www.microsoft.com/downloads/en/details.aspx?FamilyID=689655b4-c55d-4f9b-9665-2c547e637b70>`_)

**4. Download and install Python 3.4 (64-bit):** Use installation defaults but select ``Add python.exe to PATH``, URL: `http://www.python.org/ftp/python/3.4.1/python-3.4.1.amd64.msi <http://www.python.org/ftp/python/3.4.1/python-3.4.1.amd64.msi>`_

**5. Install binaries of Python Win32 extensions, APSW and cx\_freeze for the 64-bit version of Python 3.4**

        - `PyWin32 for Python 3.4 <http://sourceforge.net/projects/pywin32/files/pywin32/Build%20219/pywin32-219.win-amd64-py3.4.exe/download>`_
        -  `APSW for Python 3.4 <https://github.com/rogerbinns/apsw/releases/download/3.8.5-r1/apsw-3.8.5-r1.win-amd64-py3.4.exe>`_
        -  `cx\_freeze for Python 3.4 <http://sourceforge.net/projects/cx-freeze/files/4.3.3/cx_Freeze-4.3.3.win-amd64-py3.4.msi/download>`_

**6. Install Open SSL**

        - If you already don't have OpenSSL, you will need to install it.
        - A 64-bit OpenSSL binary package for Windows can be obtained `here <http://slproweb.com/download/Win64OpenSSL_Light-1_0_1j.exe>`_. You may need `Microsoft Visual C++ 2008 SP1 Redistributable Package (x64) <http://www.microsoft.com/en-us/download/details.aspx?id=2092>`_ as well.
        - Refer to `http://slproweb.com/products/Win32OpenSSL.html <http://slproweb.com/products/Win32OpenSSL.html>`_ for additional details.

Install Counterparty
~~~~~~~~~~~~~~~~~~~~

From ``Start Menu`` select ``All Programs`` then
``Microsoft Windows SDK v7.1`` and start
``Windows SDK 7.1 Command Prompt`` (a CMD Shell optimized for Windows
SDK). Do it as Administrator.

Install Github and check out Counterparty install scripts from Github
(see Counterparty install guide for Windows), then as Administrator open
Windows shell and change to ``C:\counterpartyd_build``.

Before you execute ``setup.py``, use text editor to change
``C:\counterpartyd_build\setup.py`` to use ``virtualenv-1.11.6`` (in
Counterparty 9.34.0 it's line 287 or thereabout; for details on this
issue see virtualenv issues, #463).

Run ``setup.py``:

``c:\python34\python.exe setup.py``

That should be it.

Problems with Dependencies
~~~~~~~~~~~~~~~~~~~~~~~~~~

Should you encounter any problem, it is probably because you have a
misconfigured build environment (Microsoft Visual C++, basically) and
until you solve that you won't be able to make any progress with
Counterparty. If nothing else works, you can try to uninstall all other
MSVC and Python packages.

Conclusion
~~~~~~~~~~

If need be Counterparty can be used with the 64-bit version of Python,
but not without changes.

Because Counterparty is not resource-intensive (one instance consumes
less than 50MB of RAM), it is easier to use the 32-bit version on
Python.

