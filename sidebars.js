module.exports = {
  basics: [
    'basics/what-is-counterparty',
    {
      type: 'category',
      label: 'Running a Counterparty Node',
      items: [
        'basics/getting-started',
        'basics/manual-installation',
        'basics/usage',
      ],
    },
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
      label: 'API v2',
      items: [
        'advanced/api-v1/rest',
        'advanced/api-v1/v1-to-v2',
      ],
    },
    {
      type: 'category',
      label: 'API v1',
      items: [
        'advanced/api-v2/overview',
        'advanced/api-v2/api',
        'advanced/api-v2/api-changes'
      ],
    },
    {
      type: 'category',
      label: 'How-to',
      items: [
        'advanced/how-to/docker-kickstart',
        'advanced/how-to/sentry-integration',
      ],
    },
    'advanced/contributing',
    'advanced/bounties',
    'advanced/exchange-integration'
  ],
};
