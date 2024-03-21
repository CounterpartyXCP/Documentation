/** @type {import('@docusaurus/types').DocusaurusConfig} */
import {themes as prismThemes} from 'prism-react-renderer';

module.exports = {
  title: 'Counterparty',
  tagline: 'NFTs and tokens over Bitcoin',
  url: 'https://counterpartyxcp.github.io',
  baseUrl: '/',
  trailingSlash: true,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'CounterpartyXCP', // Usually your GitHub org/user name.
  projectName: 'Documentation', // Usually your repo name.
  themeConfig: {
    prism: {
      theme: prismThemes.dracula,
    },
    navbar: {
      title: 'Counterparty',
      logo: {
        alt: 'Counterparty',
        src: 'img/xcp.png',
      },
      items: [
        {
          to: 'docs/basics/what-is-counterparty/a-bitcoin-protocol',
          activeBasePath: 'docs/basics',
          label: 'Basics',
          position: 'left',
        },
        {
          to: 'docs/advanced/architecture',
          activeBasePath: 'docs/advanced',
          label: 'Advanced',
          position: 'left',
        },
        {
          href: 'https://github.com/CounterpartyXCP/Documentation',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: 'docs/basics/what-is-counterparty/a-bitcoin-protocol',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.gg/wsjKtPGrMF',
            },
            {
              label: 'Forum',
              href: 'https://counterpartytalk.org/',
            },
            {
              label: 'Reddit',
              href: 'https://www.reddit.com/r/counterparty_xcp/',
            },
            {
              label: 'Telegram',
              href: 'https://t.me/Counterparty_XCP',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/CounterpartyXCP',
            }
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/CounterpartyXCP/Documentation',
            },
            {
              label: 'Bylaws',
              href: 'docs/foundation-bylaws/bylaws',
            }
          ],
        },
      ],
      copyright: `CC © 2014 - ${new Date().getFullYear()} Counterparty, Inc. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl: 'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            from: [
              '/docs/basics/faq/smart-contracts/',
              '/docs/basics/faq/lightning-network/',
              '/docs/basics/support/',
              '/docs/wallets/counterwallet',
              '/docs/wallets/counterwallet-tutorials/getting-started',
              '/docs/wallets/counterwallet-tutorials/create-addresses',
              '/docs/wallets/counterwallet-tutorials/dex-trade',
              '/docs/wallets/counterwallet-tutorials/multisig',
              '/docs/wallets/counterwallet-tutorials/show-qrcode',
              '/docs/wallets/counterwallet-tutorials/get-token-info',
              '/docs/wallets/counterwallet-tutorials/create-token',
              '/docs/wallets/counterwallet-tutorials/change-token-settings',
              '/docs/wallets/counterwallet-tutorials/pay-distribution',
              '/docs/wallets/counterwallet-tutorials/broadcast',
              '/docs/wallets/counterwallet-tutorials/voting',
              '/docs/wallets/counterwallet-tutorials/buy-sell',
              '/docs/wallets/counterwallet-tutorials/create-armory-addresses',
              '/docs/wallets/counterwallet-notes',
              '/docs/advanced/federated-node/getting-started/',
              '/docs/advanced/federated-node/pre-installation/',
              '/docs/advanced/federated-node/installation/',
              '/docs/advanced/federated-node/administration/',
              '/docs/advanced/federated-node/counterwallet/',
              '/docs/advanced/installation/bitcoin-core/',
              '/docs/advanced/installation/windows/',
              '/docs/develop/counterblock/api/',
              '/docs/develop/counterblock/modules/',
            ],
            to: '/docs/',
          },
        ],
      }
    ]
  ],
};
