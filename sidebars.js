module.exports = {
  basics: [
    {
      type: 'category',
      label: 'What is Counterparty?',
      items: [
        'basics/what-is-counterparty/a-bitcoin-protocol',
        'basics/what-is-counterparty/an-incentivization-token'
      ],
    },
    {
      type: 'category',
      label: 'Assets (tokens/NFTs)',
      items: [
        'basics/assets/counterparty-assets',
        'basics/assets/enhanced-asset',
        'basics/assets/enhanced-feed',
        'basics/assets/use-cases',
      ],
    },
    {
      type: 'category',
      label: 'FAQs',
      items: [
        'basics/faq/general',
        'basics/faq/smart-contracts',
        'basics/faq/lightning-network'
      ],
    },
    "basics/support"
  ],
  wallets: [
    "wallets/counterwallet",
    {
      type: 'category',
      label: 'Counterwallet Tutorials',
      items: [
        'wallets/counterwallet-tutorials/getting-started',
        'wallets/counterwallet-tutorials/create-addresses',
        'wallets/counterwallet-tutorials/dex-trade',
        'wallets/counterwallet-tutorials/multisig',
        'wallets/counterwallet-tutorials/show-qrcode',
        'wallets/counterwallet-tutorials/get-token-info',
        'wallets/counterwallet-tutorials/create-token',
        'wallets/counterwallet-tutorials/change-token-settings',
        'wallets/counterwallet-tutorials/pay-distribution',
        'wallets/counterwallet-tutorials/broadcast',
        'wallets/counterwallet-tutorials/voting',
        'wallets/counterwallet-tutorials/buy-sell',
        'wallets/counterwallet-tutorials/create-armory-addresses'
      ],
    },
    "wallets/counterwallet-notes"
  ],
  advanced: [
    'advanced/architecture',
    'advanced/protocol',
    'advanced/cli',
    {
      type: 'category',
      label: 'Advanced Usage',
      items: [
        'advanced/advanced-usage/sending-bulk',
        'advanced/advanced-usage/multisig'
      ],
    },
    {
      type: 'category',
      label: 'Federated Node',
      items: [
        'advanced/federated-node/getting-started',
        'advanced/federated-node/pre-installation',
        'advanced/federated-node/installation',
        'advanced/federated-node/administration',
        'advanced/federated-node/counterwallet'
      ],
    },
    {
      type: 'category',
      label: 'Installation',
      items: [
        'advanced/installation/bitcoin-core',
        'advanced/installation/windows'
      ],
    },
    'advanced/exchange-integration'
  ],
  develop: [
    {
      type: 'category',
      label: 'Counterparty API',
      items: [
        'develop/api/overview',
        'develop/api/api',
        'develop/api/api-changes'
      ],
    },
    {
      type: 'category',
      label: 'Counterblock',
      items: [
        'develop/counterblock/api',
        'develop/counterblock/modules'
      ],
    },
    'develop/contributing',
    'develop/bounties'
  ]
};
