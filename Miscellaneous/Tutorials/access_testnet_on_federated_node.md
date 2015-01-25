#How to access testnet using Counterwallet on Federated Node?

There are two ways to do that:

-  Edit your /etc/hosts file and add a hostname that has “testnet” in
   it. Example:

   `127.0.0.1 localhost localhost.localdomain testnet.cw.local cw.local`

   Now your mainnet Counterwallet can be accessed at ``cw.local`` and
   your testnet Counterwallet at ``tetstnet.cw.local``.
-  Access testnet at ``https://ip-address/?testnet=1``
