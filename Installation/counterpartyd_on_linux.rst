Installing counterpartyd on Linux
=========================================

Bitcoin Core with ``addrindex`` patch
-------------------------------------------------------

Biticoin Core 0.9.2 on Ubuntu 14.04
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

-  Standalone counterpartyd users: Download and build a patched version
   of Bitcoin Core 0.9.2 from source as per the usual procedure. Then
   install Counterpartyd (Reference: :doc:`counterpartyd install documentation </build_from_source.rst>`).

Prebuilt binaries can be found on 3rd party sites (`such as this
one <https://github.com/rippler/btc-jmcorgan-addrindex-v0.9.2.0-fca268c-beta>`_).

-  Federated Node users: Federated Node installation and configuration
   script (``setup_federated_node.py``) automatically downloads and
   builds the binary for you. Make sure you follow the `official
   documentation`_ because there’s more to it than just one script.

Biticoin Core 0.10.0 on Ubuntu 14.04
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This version is not yet supported.

.. _Counterpartyd install documentation: http://counterparty.io/docs/build-system/
.. _official documentation: http://counterparty.io/docs/build-system/federated-node/

Counterpartyd on ArchLinux
----------------------------------------

counterpartyd are counterparty-git are now available in AUR and here’s a
simple how-to that explains how to get started.

ArchLinux User Repository (AUR) Location
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The counterpartyd package for ArchLinux can be found here:
https://aur.archlinux.org/packages/?O=0&K=counterpartyd

Search, Build, Install
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Enable “community” in ``/etc/pacman.conf`` (it is by default enabled,
while community-testing is by default disabled). Update the repos with
``pacman -Syyu``.

Make sure you have ``base-devel`` installed
(``pacman -S --needed base-devel``)

As the user that you want to use to build the package, change to build
directory (e.g. ``/var/abs/local``)

Download counterpartyd package from AUR (or use
``pacman -Q counterpartyd`` to find it and then download it):

``wget https://aur.archlinux.org/packages/co/counterpartyd/counterpartyd.tar.gz``

You may want to check GPG signature of the maintainer (signature
checking:
https://wiki.archlinux.org/index.php/makepkg#Signature_checking).

Decompress the archive, change to counterpartyd directory and build:

``makepkg -s``

After you download, build and install a bunch of dependencies, the final
output will look similar to this:

::

    -> Compressing package...
    ==> Finished making: counterpartyd 9.46.0-1 (Tue Nov 25 00:55:21 CST 2014)
    [root@archlinux counterpartyd]# dir -la
    total 880
    drwxr-xr-x 5 root root   4096 Nov 25 00:55 .
    drwxr-xr-x 5 root root   4096 Nov 24 22:35 ..
    -rw-r--r-- 1 root root   1384 Nov 20 03:08 .AURINFO
    -rwx------ 1 root root    167 Nov 24 22:33 aur.sh
    -rw-r--r-- 1 root root 293800 Nov 25 00:55 counterpartyd-9.46.0-1-any.pkg.tar.xz
    -rw-r--r-- 1 root root   2075 Nov 24 22:24 counterpartyd-9.46.0-1.src.tar.gz
    -rw-r--r-- 1 root root 536720 Nov 24 22:24 counterpartyd-9.46.0.tar.gz
    -rw-r--r-- 1 root root    295 Nov 18 13:55 counterpartyd.conf
    -rw-r--r-- 1 root root    993 Nov 18 13:55 counterpartyd.install
    -rw-r--r-- 1 root root    183 Nov 18 13:55 counterpartyd.logrotate
    -rw-r--r-- 1 root root    541 Nov 18 13:55 counterpartyd.service
    -rw-r--r-- 1 root root   2358 Nov 20 03:11 counterpartyd.tar.gz
    drwxr-xr-x 2 root root   4096 Nov 24 07:50 cower
    drwxr-xr-x 3 root root   4096 Nov 25 00:55 pkg
    -rw-r--r-- 1 root root   2959 Nov 20 03:07 PKGBUILD
    drwxr-xr-x 3 root root   4096 Nov 25 00:55 src

You can also use ``yaourt`` (first install ``yaourt`` and run
``yaourt -Sb counterpartyd``).

**NOTES**: \* Counterparty AUR packages are not maintained by
Counterparty Foundation. \* Check PKGBUILD and any .install file
(e.g. counterpartyd.install) for malicious commands. \* Bugs related to
AUR should be reported to ArchLinux.

Install the package using pacman (the package name may be different):

``pacman -S counterpartyd-9.46.0-1-any.pkg.tar.xz``

Create ``bitcoin.conf`` and ``counterpartyd.conf`` according to the
usual procedure. Remember to install a patched version of Bitcoin Core
(with jmcorgan’s addrindex patch and ``addrindex=1`` in ``bitcoin.conf``
as explained on this Wiki; AUR also has a patched version of Bitcoin
Core - see the link in External References below).

You can also (see the Counterparty Support Web site) download the
bootstrap Counterparty DB file(s) in order to shorten the initial time
counterpartyd takes to populate its database.

-  http://counterparty.io/docs/build-system/set-up-bitcoind/

-  http://counterparty.io/docs/build-system/additional/

-  http://support.counterparty.io

Upgrades can be handled with pacman as well.

``pacman -U counterpartyd``

External References
~~~~~~~~~~~~~~~~~~~

-  https://wiki.archlinux.org/index.php/Arch\_User\_Repository#Searching
   - how to search AUR

-  https://aur.archlinux.org/packages/bitcoin-core-addrindex/ (Bitcoin
   Core with addrindex patch)

Where to Report Bugs
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

-  ArchLinux-related package bugs:
   https://bugs.archlinux.org/index.php?string=counterparty&project=0

-  Counterparty bugs (for counterpartyd pick counterpartyd, etc.):
   https://github.com/CounterpartyXCP/



Counterpartyd on Debian
-------------------------------------

Counterpartyd on Debian Jessie x86-64
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Currently (July 2014) Counterparty supports Windows and Ubuntu while
other UNIX-like operating systems can be used with a bit of effort.

This page explains how to install the current version of counterparty on
Debian Jessie. Federated Node is not covered in this document.

You can follow the official Counterparty install guide for Ubuntu and
the only step where something has to be done is before you execute
``setup.py``: in ``setup.py``, delete the lines that make the script err
due to OS detection problem (in v9.34.0, lines 107 to 109).

::

    if os.name == "posix" and platform.dist()[0] != "Ubuntu":
    logging.error("Non-Ubuntu install detected. Only Ubuntu Linux \
     is supported at this time")
    sys.exit(1)

Now continue with the install/build by following the official install
guide.

If you can feel free to submit a pull request in ``counterpartyd_build``
repo (for ``setup.py`` in ``develop`` branch) to make this manual
hacking unnecessary.

Environment Details
~~~~~~~~~~~~~~~~~~~

::

    xcp@xcp:~/counterpartyd_build$ uname -a
    Linux xcp 3.13-1-amd64 #1 SMP Debian 3.13.5-1 (2014-03-04) x86_64 GNU/Linux
    xcp@xcp:~/counterpartyd_build$ cat /etc/debian_version
    jessie/sid
    xcp@xcp:~/counterpartyd_build$ date
    Fri Jul 18 22:43:50 2014
    xcp@xcp:~/counterpartyd_build$ counterpartyd -V
    counterpartyd v9.31.0

Upgrading the stand-alone ``counterpartyd``
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If you try to update using the official approach, it will break your
Counterparty setup (because ``setup.py`` that chokes on Debian will be
downloaded again).

The safest way to “uninstall” a failed setup or update/upgrade and is to
move ``/home/USER/counterpartd_build`` to
``/home/USER/counterpartd_build.old`` and repeat the install procedure
by returning to the step in which build scripts are cloned from Github.
It takes only a few minutes so it’s not much different from using the
official approach.

Raspberry Pi with Debian Jessie for ARM
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The same procedure works on Raspberry Pi v2 with Debian Jessie but there
are ARM-specific problems in bitcoind and besides Raspberry Pi can
barely run bitcoind so it may not be worth the trouble because the
performance is ***very sluggish***.

It may be worth to install only bitcoind on Raspberry Pi because that
gives you a low cost way of having a current copy of the blockchain. In
any case it is suggested to store the blockchain on external USB drive
with independent power supply.

Raspberry Pi-Specific Steps and Considerations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Familiarize yourself with
[https://github.com/bitcoin/bitcoin/blob/master/doc/build-unix.md
installation steps for bitcoind]. But you need a patched ``addrindex``
version (see `this`_).

Fetch a recent release or the latest master branch, assuming it doesn’t
break counterpartyd:

``wget https://github.com/bitcoin/bitcoin/archive/bitcoin-0.9.2.zip``

Then unzip the archive and patch that source with jmcorgan’s addrindex
patch (or get a patched copy of Bitcoin Core (search this Wiki for
``addrindex`` to find out more)).

Comment out lines 322-336 (inclusive) in file
``src/leveldb/util/env_posix.cc`` to fix a problem with LevelDB on ARM.

When running ``configure``, it is recommended to disable wallet (unless
you need that feature) to save system resources and improve the
security. As explained above the main purpose of this setup is to run
bitcoind for the purpose of having a low-cost, low-power bitcoind
although optionally counterpartyd can also run on this system.

::

    ./configure --disable-wallet
    make
    sudo make install

This and the installation of dependencies can take 12-20 hours. It is
possible, but more complicated, to build elsewhere and transfer binaries
to Raspberry Pi.

Now configure bitcoind according to requirements from the official
``counterpartyd`` documentation.

To speed things up you can copy the blockchain to this sytem and then
start ``bitcoind`` once with ``txindex=1`` and ``addrindex=1``. If you
will be using external USB drive you may be able to copy existing
blockchain and counterpartyd data from your desktop, too. Reindexing may
take weeks.

Counterpartyd is installed the same way as on Debian Jessie x86-64 (see
above).

Environment details on Raspberry Pi
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

::

    xcp@raspberrypi ~ $ uname -a
    Linux raspberrypi 3.12.22+ #691 PREEMPT Wed Jun 18 18:29:58 BST 2014 armv6l GNU/Linux
    xcp@raspberrypi ~ $ cat /etc/debian_version
    jessie/sid
    xcp@raspberrypi ~ $ cat /proc/cpuinfo
    processor       : 0
    model name      : ARMv6-compatible processor rev 7 (v6l)
    Features        : swp half thumb fastmult vfp edsp java tls
    CPU implementer : 0x41
    CPU architecture: 7
    CPU variant     : 0x0
    CPU part        : 0xb76
    CPU revision    : 7
    Hardware        : BCM2708
    Revision        : 000e
    xcp@raspberrypi ~ $ counterpartyd -V
    v9.33.0
