export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    'nuxt-delay-hydration',
  ],

  nitro: {
    // plugins: ['~/server/plugins/content.ts'],
    prerender: {
      routes: ['/rss.xml']
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
        { rel: 'icon', href: '/brock-logo-outline-80x100.png' },
        { rel: "alternate", "type": "application/rss+xml", title: "The Lack Thereof (@awwaiid / Brock Wilcox)", href: "/rss.xml" }
      ]
    },
  },

  googleFonts: {
    families: {
      "Nunito": true
    }
  },

  content: {
    // highlight: {
    //   theme: 'github-light',
    //   theme: {
    //     default: 'github-light',
    //     dark: 'github-dark',
    //     sepia: 'monokai'
    //   },
    //   preload: ['diff', 'json', 'js', 'ts', 'css', 'shell', 'html', 'md', 'yaml', 'vue', 'python', 'ruby', 'perl']
    // },
    markdown: {
      remarkPlugins: {
        "@akebifiky/remark-simple-plantuml": true,
        "remark-breaks": true
      }
    }
  },

  delayHydration: {
    mode: 'mount',
    // enables nuxt-delay-hydration in dev mode for testing
    debug: process.env.NODE_ENV === 'development'
  }
})
