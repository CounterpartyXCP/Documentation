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
    'basics/general',
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
      label: 'Counterparty API',
      items: [
        'develop/api/overview',
        'develop/api/api',
        'develop/api/api-changes'
      ],
    },
    'develop/contributing',
    'develop/bounties',
    'advanced/exchange-integration'
  ],
};
