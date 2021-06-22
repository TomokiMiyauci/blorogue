import { GatsbyConfig } from 'gatsby'
import { resolve } from 'path'
import { SITE_URL as siteUrl } from './constants'

const name = 'miyauci.me'

const plugins: GatsbyConfig['plugins'] = [
  'gatsby-plugin-postcss',
  {
    resolve: 'gatsby-plugin-react-svg',
    options: {
      rule: {
        include: /assets/
      }
    }
  },
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: ['gatsby-remark-autolink-headers']
    }
  },
  {
    resolve: 'gatsby-plugin-use-dark-mode',
    options: {
      storageKey: 'darkMode',
      classNameDark: 'dark',
      classNameLight: 'light',
      minify: true
    }
  },
  {
    resolve: 'gatsby-plugin-mdx',
    options: {
      gatsbyRemarkPlugins: [
        {
          resolve: `gatsby-remark-autolink-headers`,
          options: {
            offsetY: 200,
            className:
              'absolute transform -translate-x-full opacity-0 duration-300 transition-opacity group-hover:md:opacity-100'
          }
        },
        {
          resolve: 'gatsby-remark-images'
        }
      ]
    }
  },
  'gatsby-plugin-react-helmet',
  {
    resolve: 'gatsby-theme-i18n',
    options: {
      defaultLang: 'en',
      locales: 'en ja',
      configPath: resolve(__dirname, '..', 'i18n', 'config.json')
    }
  },
  {
    resolve: `gatsby-plugin-canonical-urls`,
    options: {
      siteUrl
    }
  },
  `gatsby-plugin-image`,
  `gatsby-plugin-sharp`,
  `gatsby-transformer-sharp`,
  // 'gatsby-plugin-graphql-codegen',
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'posts',
      path: resolve(__dirname, '..', 'posts')
    }
  },
  // {
  //   resolve: 'gatsby-source-filesystem',
  //   options: {
  //     name: 'photos',
  //     path: resolve(__dirname, '..', 'photos')
  //   }
  // },
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name,
      short_name: name,
      start_url: `/`,
      background_color: '#06b6d4',
      theme_color: `#e11d48`,
      display: `standalone`,
      icon: resolve(__dirname, '..', 'static', 'favicon.svg')
    }
  },
  {
    resolve: `gatsby-plugin-clarity`,
    options: {
      clarity_project_id: '5ipdtj3l7s'
    }
  },
  {
    resolve: 'gatsby-plugin-firebase',
    options: {
      credentials: {
        apiKey: 'AIzaSyAN_gLPDQgXzROBhfpoEq7g-Wek6FY1kJE',
        authDomain: 'blorogue.firebaseapp.com',
        projectId: 'blorogue',
        storageBucket: 'blorogue.appspot.com',
        messagingSenderId: '205944386882',
        appId: '1:205944386882:web:f48733fc94e54f0de244db',
        measurementId: 'G-DWBGDDWNR9'
      }
    }
  },
  {
    resolve: `gatsby-plugin-sitemap`,
    options: {
      query: `
        {
          site {
            siteMetadata {
              siteUrl
            }
          }

          allSitePage(filter: {context: {originalPath: {nin: ["/404/", "/404.html"]}}}) {
            nodes {
              path
              context {
                locale
                originalPath
              }
            }
            totalCount
          }
        }
      `,
      resolvePages: (data) => {
        const { nodes } = data.allSitePage

        return nodes.map((node) => {
          const links = nodes
            .filter(
              (_node) =>
                _node.context.originalPath === node.context.originalPath
            )
            .map((f) => ({ lang: f.context.locale, url: f.path }))
          return {
            ...node,
            links
          }
        })
      },
      serialize: (data) => {
        return {
          url: data.path,
          lastmod: new Date().toISOString().split('T')[0],
          changefreq: 'hourly',
          priority: 1.0,
          links: data.links
        }
      }
    }
  },
  'gatsby-plugin-sass',
  'gatsby-plugin-offline'
  // {
  //   resolve: "gatsby-plugin-offline",
  //   options: {
  //     workboxConfig: {
  //       globPatterns: ["**/icon-path*"],
  //     },
  //   },
  // },
]

const siteMetadata: GatsbyConfig['siteMetadata'] = {
  siteUrl,
  title: name,
  description:
    "This is Tomoki Miyauchi's personal site. You can check the activity record of me such as technical blog and list of projects.",
  author: "Tomoki Miyauchi'",
  copyright: `${new Date().getFullYear()} ©Tomoki Miyauchi`,
  image: 'https://miyauchi.dev/logo.svg',
  social: {
    twitter: '@tomoki_miyauci',
    github: 'TomokiMiyauci'
  }
}

// [
//   ["meta", { name: "author", content: "Tomoki Miyauchi" }],
//   ["meta", { name: "copyright", content: "©Tomoki Miyauchi" }],
//   ["meta", { property: "og:title", content: "miyauci.me" }],
//   ["meta", { property: "og:description", content: description }],
//   ["meta", { property: "og:image", content: "https://miyauchi.dev/logo.png" }],
//   ["meta", { property: "og:site_name", content: "miyauci.me" }],
//   ["meta", { name: "twitter:card", content: "summary" }],
//   ["meta", { name: "twitter:site", content: "@tomoki_miyauci" }],
// ];

const config: GatsbyConfig = {
  siteMetadata,
  plugins
}

export default config
