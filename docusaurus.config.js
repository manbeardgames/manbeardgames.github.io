module.exports = {
  title: 'ManBeardGames',
  tagline: 'Father | Indie Developer | C# Programmer',
  url: 'https://manbeardgames.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'manbeardgames', // Usually your GitHub org/user name.
  projectName: 'manbeardgames.github.io', // Usually your repo name.
  plugins: [ 'docusaurus-plugin-sass' ],
  themeConfig: {
    googleAnalytics: {
      trackingID: 'UA-63802407-1'
    },
    gtag: {
      trackingID: 'UA-63802407-1'
    },
    sidebarCollapsible: true,
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false
    },
    navbar: {
      title: 'ManBeardGames',
      logo: {
        alt: 'ManBeardGames Logo',
        src: 'img/mbg_cookie.svg',
      },
      items: [
        {
          to: 'games/',
          activeBasePath: '/games/',
          label: 'Games',
          position: 'left'
        },
        {
          to: 'docs/tutorials/',
          activeBasePath: '/docs/tutorials',
          label: 'Tutorials',
          position: 'left'
        },
        {
          to: 'blog', 
          label: 'Dev Blog', 
          position: 'left'
        },
        {
          href: 'https://github.com/manbeardgames',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub Repository'
        },
        {
          href: 'https://twitter.com/manbeardgames',
          position: 'right',
          className: 'header-twitter-link',
          'aria-label': 'Twitter Profile'
        }
      ],
    },
    footer: {
      style: 'dark',
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()} Christopher Whitley.<br/> Built with Docusaurus.`,
    },
    prism: {
      additionalLanguages: ['csharp'],
      theme: require('prism-react-renderer/themes/github'),
      darkTheme: require('prism-react-renderer/themes/vsDark')
    }
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
          'https://github.com/manbeardgames/manbeardgames.github.io/tree/gh-pages-develop',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/manbeardgames/manbeardgames.github.io/tree/gh-pages-develop',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.scss'),
        },
      },
    ],
  ],
};
