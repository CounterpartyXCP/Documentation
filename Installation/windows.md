# Counterparty Dependencies on Windows

**Note:** These instructions are for a 32-bit installation. This will work with
both 32-bit and 64-bit versions of Windows, and is the recommended approach.

- [Python 3.5.x](https://www.python.org/downloads/)
- [Python Win32 extensions](https://sourceforge.net/projects/pywin32/files/pywin32/Build%20220/) (You must match the version with your Python version and install as an **administrator**, or you will get an error about missing DLL files later.)
- [APSW 3.8.8.1-r1](https://github.com/rogerbinns/apsw/releases/download/3.8.8.1-r1/apsw-3.8.8.1-r1.win32-py3.4.exe)
- [Pycrypto 2.6.1](https://s3.amazonaws.com/counterparty-bootstrap/pycrypto-2.6.1.win32-py3.4.exe)
- [Microsoft Visual C++ 2008 Redistributable Package (x86)](http://www.microsoft.com/downloads/details.aspx?familyid=9B2DA534-3E03-4391-8A4D-074B9F2BC1BF)
- [OpenSSL 1.1.0](https://slproweb.com/download/Win32OpenSSL_Light-1_1_0.exe)
- [Git](http://git-scm.com/download/win) (Optional) (Select "**Use Git from the Windows Command Prompt**".) 

## Usage and notes for Windows

Counterparty binaries `counterparty-server.exe` and `counterparty-client.exe` are installed to `C:\Python35\Scripts`. This path can be manually added to the system `PATH` variable for ease of use.

The default configuration files (for mainnet) can be used with testnet provided the `--testnet` option is employed when starting service and running the CLI. 

Alternatively, a different set of custom configuration files that contain `testnet=1` can be provided at runtime in order to use different access credentials for testnet and mainnet:

        counterparty-server --config-file E:\testing\server.testnet.conf start
        counterparty-client --config-file E:\testing\client.testnet.conf wallet

# Counterparty “Federated Node” on Windows

The experimental Counterparty “Federated Node” for Windows based on Docker can be installed by following the official "Federated Node" [install guide](http://counterparty.io/docs/federated_node/). counterparty-server and counterparty-client is sufficient for users who do not require local Counterwallet or Counterblock access.

