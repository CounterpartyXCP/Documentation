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
    {
      type: 'category',
      label: 'Command Line Interface (CLI)',
      items: [
        'advanced/command-line-interface/usage',
        'advanced/command-line-interface/sending-bulk',
        'advanced/command-line-interface/multisig'
      ],
    },
    {
      type: 'category',
      label: 'Counterparty API',
      items: [
        'advanced/api/overview',
        'advanced/api/api',
        'advanced/api/api-changes'
      ],
    },
    'advanced/contributing',
    'advanced/bounties',
    'advanced/exchange-integration'
  ],
};
