export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
  ],

  nitro: {
    plugins: ['~/server/plugins/content.ts']
  },

  vue: {
    compilerOptions: {
      isCustomElement: tag => ['av-waveform', 'AvWaveform'].includes(tag)
    }
  },

  webpack: {
    ignored: ['public/docs']
  },

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

  googleFonts: {
    families: {
      "Nunito": true
    }
  },


})
