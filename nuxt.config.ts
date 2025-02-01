export default defineNuxtConfig({
  modules: [
    'nuxt-content-assets',
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    'nuxt-delay-hydration',
    "@nuxt/image"
  ],

  nitro: {
    // plugins: ['~/server/plugins/content.ts'],
    prerender: {
      routes: ['/', '/rss.xml', '/shares.rss.xml'],
      failOnError: true,
    }
  },

  // vue: {
  //   compilerOptions: {
  //     isCustomElement: tag => ['av-waveform', 'AvWaveform'].includes(tag)
  //   }
  // },

  webpack: {
    ignored: ['public/docs']
  },

  app: {
    head: {
      title: 'thelackthereof',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Blog and content about programming, projects, the universe, etc, by Brock Wilcox (@awwaiid)' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
        { rel: 'icon', href: '/brock-logo-outline-icon-48x48.png' },
        { rel: "alternate", "type": "application/rss+xml", title: "The Lack Thereof (@awwaiid / Brock Wilcox)", href: "/rss.xml" }
      ]
    },
  },

  googleFonts: {
    families: {
      "Nunito": true,
      "Atkinson Hyperlegible": true,
    }
  },

  content: {
    highlight: {
      theme: 'github-light',
      theme: {
        default: 'github-light',
        dark: 'github-dark',
        sepia: 'monokai'
      },
      preload: ['diff', 'json', 'js', 'ts', 'css', 'shell', 'html', 'md', 'yaml', 'vue', 'python', 'ruby', 'perl', 'cpp', 'clojure']
    },
    markdown: {
      remarkPlugins: {
        "@akebifiky/remark-simple-plantuml": {
          baseUrl: "https://www.plantuml.com/plantuml/svg"
        },
        "remark-breaks": true
      }
    },
    experimental: {
      search: true
    }

  },

  delayHydration: {
    mode: 'mount',
    // enables nuxt-delay-hydration in dev mode for testing
    debug: process.env.NODE_ENV === 'development'
  },

  image: {
    dir: 'content'
  },

  compatibilityDate: '2024-07-06'
})
