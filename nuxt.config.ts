import pages from './content/pages.json'

export default defineNuxtConfig({
  compatibilityDate: '2026-11-11',
  devtools: { enabled: false },
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/arcdisco-static/',
    head: { htmlAttrs: { lang: 'en-GB' } }
  },
  css: ['~/../public/assets/site.css'],
  nitro: { prerender: { routes: pages.map(page => page.path), crawlLinks: true } }
})
