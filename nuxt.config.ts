import { readdirSync } from 'node:fs';
import tweakMarkdown from './lib/tweakMarkdown';

function slugForFile(filename: string): string {
  return filename
    .replace(/\.md$/, '')
    .replace(/ - /g, '-')
    .replace(/ /g, '-')
    .toLowerCase();
}

function collectContentRoutes(): string[] {
  return readdirSync('content')
    .filter(f => f.endsWith('.md') && !f.startsWith('_'))
    .map(f => '/' + slugForFile(f));
}

const securityHeaders = {
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Frame-Options': 'SAMEORIGIN'
};

export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    'nuxt-delay-hydration',
    '@nuxt/image',
    'nuxt-gtag'
  ],

  nitro: {
    prerender: {
      routes: ['/', '/rss.xml', '/shares.rss.xml', ...collectContentRoutes()],
      crawlLinks: true,
      failOnError: false,
      ignore: ['/admin', '/_admin-preview']
    }
  },

  routeRules: {
    '/**': { headers: securityHeaders },
    '/admin/**': { prerender: false, headers: { ...securityHeaders, 'X-Robots-Tag': 'noindex, nofollow' } }
  },

  gtag: {
    id: 'G-7FLNGJSFBK'
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
        { rel: 'alternate', type: 'application/rss+xml', title: 'The Lack Thereof (@awwaiid / Brock Wilcox)', href: '/rss.xml' }
      ]
    },
  },

  googleFonts: {
    families: {
      'Nunito': true,
      'Atkinson Hyperlegible': true,
    }
  },

  content: {
    build: {
      markdown: {
        highlight: {
          theme: {
            default: 'github-light',
            dark: 'github-dark',
            sepia: 'monokai'
          },
          preload: ['diff', 'json', 'js', 'ts', 'css', 'shell', 'html', 'md', 'yaml', 'vue', 'python', 'ruby', 'perl', 'cpp', 'clojure']
        },
        remarkPlugins: {
          '@akebifiky/remark-simple-plantuml': {
            baseUrl: 'https://www.plantuml.com/plantuml/svg'
          },
          'remark-breaks': true
        },
        rehypePlugins: {
          'rehype-wrap-text': false
        }
      }
    }
  },

  delayHydration: {
    mode: 'mount',
    debug: process.env.NODE_ENV === 'development'
  },

  image: {
    dir: 'content',
    ipx: {
      maxAge: 86400
    }
  },

  devtools: { enabled: false },

  vite: {
    server: {
      allowedHosts: true
    },
  },

  hooks: {
    'content:file:beforeParse'(ctx) {
      tweakMarkdown(ctx);
    }
  },

  compatibilityDate: '2026-05-16'
})
