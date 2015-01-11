Counterpartyd on ArchLinux
==========================

counterpartyd are counterparty-git are now available in AUR and here’s a
simple how-to that explains how to get started.

ArchLinux User Repository (AUR) Location
----------------------------------------

The counterpartyd package for ArchLinux can be found here:
https://aur.archlinux.org/packages/?O=0&K=counterpartyd

Search, Build, Install
----------------------

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
--------------------

-  ArchLinux-related package bugs:
   https://bugs.archlinux.org/index.php?string=counterparty&project=0

-  Counterparty bugs (for counterpartyd pick counterpartyd, etc.):
   https://github.com/CounterpartyXCP/
