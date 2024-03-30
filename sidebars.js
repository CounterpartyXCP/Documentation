module.exports = {
  basics: [
    'basics/what-is-counterparty',
    'basics/what-is-xcp',
    {
      type: 'category',
      label: 'Assets (Tokens/NFTs)',
      items: [
        'basics/assets/counterparty-assets',
        'basics/assets/enhanced-asset',
        'basics/assets/enhanced-feed',
      ],
    },
  ],
  advanced: [
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
        'advanced/api/rest',
        'advanced/api/api-changes'
      ],
    },
    {
      type: 'category',
      label: 'How-to',
      items: [
        'advanced/how-to/docker-kickstart',
      ],
    },
    'advanced/contributing',
    'advanced/bounties',
    'advanced/exchange-integration'
  ],
};
