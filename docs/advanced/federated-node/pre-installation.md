---
title: Pre-installation
---

### Windows

**NOTE**: Installation on Windows is still in *BETA* state, and we cannot promise a fully-working environment. [Please report](https://github.com/CounterpartyXCP/federatednode/issues) any bugs you find.

* **Python 3.5.x**: [Download and install](https://www.python.org/downloads/) the latest Python 3.5.x release. Make sure you check the box "Add Python 3.5 to PATH" on the first page. (If you get an error during installation, make sure your windows system is fully updated via Windows Update.)
* **Docker**: If using Windows 10, we recommend to [install Docker for Windows](https://docs.docker.com/engine/installation/windows/). For all other versions of Windows, [install Docker Toolbox](https://docs.docker.com/toolbox/toolbox_install_windows/).
* **Git**: Make sure `git` is installed. If not, install it from [here](https://git-scm.com/download/win) (note that if using Docker Toolbox, it will install it by default).

**If using Docker for Windows**:

* After installing Docker for Windows, launch the "Docker" application and allow it to set itself up (a reboot may be required).
* Next, you will need to enable access to your host hard drive so that some of the shared volumes work properly. To do this, right click on the Docker Whale icon in your system tray. Then go to "Docker Settings" and then "Shared Drives". Turn on access to the drive on which the `federatednode` folder will reside (most likely your "C" drive).
* Finally, launch [a command prompt as Administrator](https://technet.microsoft.com/en-us/library/cc947813(v=ws.10).aspx)

<a name="docker-toolbox-note"></a> **If using Docker Toolbox**:

* After installation completes, launch the "Docker Quickstart Terminal" and let it configure itself.
* Once this finishes, you will need to resize the Virtual Machine that Docker Toolbox uses to run the Docker containers. Note that it currently limits this VM to 1GB of memory and  20GB hard disk space total by default (shared across _all_ containers). You will need to update this to _at least_ 2 or 4GB memory and 50-100GB space. To do this, execute commands like the following (replacing the numbers in the second command as appropriate, based on the [system requirements](#requirements)):
```
docker-machine rm default
docker-machine create --driver virtualbox --virtualbox-disk-size "100000" --virtualbox-memory "4096" default
```

Then, relaunch the Docker Quickstart Terminal, and verify that `docker ps` functions normally (if not, restart the system and try the command again).

### OS X

* **Python 3.5.x**: [Download and install](https://www.python.org/downloads/) the latest Python 3.5.x release. Make sure you check the box "Add Python 3.5 to PATH" on the first page.
* **Docker**: If using OS X Yosemite or higher, we recommend to [install Docker for Mac](https://docs.docker.com/engine/installation/mac/). For Older Macs, [install Docker Toolbox](https://docs.docker.com/toolbox/toolbox_install_mac/).
* **Git**: Make sure `git` is installed. If not, install it from [here](https://git-scm.com/download/mac) (note that if using Docker Toolbox, it will install it by default).

If using **Docker for Mac**, launch the "Docker" application and allow it to set itself up, then open a terminal prompt.

If using **Docker Toolbox**, launch the "Docker Quickstart Terminal" once installation finishes, and follow the instructions on resizing your VM [above](#docker-toolbox-note).


### Linux

(Instructions are provided for Ubuntu Linux. Other Linuxes will be similar. Use a sudo-er account, but not root)

**Update system & install dependencies**

Make sure you have Python 3.5. (Ubuntu 14.04 for instance uses Python 3.4 by default), but 16.04 uses 3.5. If you have an Ubuntu version older than 3.4, you can update your Python with [these instructions](http://askubuntu.com/a/682875).

```
sudo apt-get update && sudo apt-get upgrade
sudo apt-get -y install git curl coreutils docker.io docker-compose
```