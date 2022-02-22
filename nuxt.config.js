import tweakMarkdown from './plugins/tweakMarkdown';

export default {
  target: 'server',

  head: {
    title: 'thelackthereof',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', href: '/brock-logo-outline-80x100.png' }
    ]
  },

  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // "~/plugins/vue-audio-visual.js"
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@nuxtjs/google-fonts',
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxt/content',
    '@nuxtjs/proxy'
  ],

  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    axios: {
      baseURL: process.env.BASE_URL || 'http://localhost:3000'
    }
  },

  axios: {},

  content: {
    markdown: {
      remarkPlugins: [
        '~/plugins/oddmuse-headings',
        'remark-breaks',
        ['remark-wiki-link', {
          // pageResolver: (name) => [name.replace(/ /g, '_').toLowerCase()],
          pageResolver: (name) => [name.replace(/ /g, '_')],
          hrefTemplate: (permalink) => `/${permalink}`
        }],
      ]
    }
  },

  hooks: {
    "content:file:beforeParse": tweakMarkdown
  },


  build: {
    // transpile: ['vue-audio-visual']
  },

  googleFonts: {
    families: {
      "Nutino": true
    }
  },

  // Get around CORS
  proxy: {
    '/proxy/github': {
      target: 'https://github.com',
      // changeOrigin: true,
      pathRewrite: { '^/proxy/github': '/' },
    },
  }

}
