// https://nuxt.com/docs/api/configuration/nuxt-config//
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Swift Captions! Zero To Live Closed Captions In Minutes',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { name: 'charset', content: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'msapplication-TileColor', content: '#f4f2f0' },
        { name: 'theme-color', content: '#f4f2f0' },
        { name: 'description', content: 'Nuxt & Deepgram Live Closed Captions' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'apple-touch-icon', sizes: "180x180", href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#ff3904' },
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com'
        }
      ],
    },
  },

  modules: ['@nuxtjs/supabase'],

  supabase: {
    key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNiend2ZmxhcXJqdHJub3N5eXFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcyODIwMzcsImV4cCI6MjA0Mjg1ODAzN30.tbPafiQsT-iTDgItjYSxOODfvuBum_Dcd7cKO_Mi9yM',
    url: 'https://cbzwvflaqrjtrnosyyqd.supabase.co',
    redirect: true,
  },

  css: [
        'primevue/resources/themes/mdc-light-deeppurple/theme.css',
        'primevue/resources/primevue.min.css',
        'primeicons/primeicons.css',
        'primeflex/primeflex.css',
        '@/assets/styles/main.scss',
  ],

  components: true,

  build: {
      transpile: ['primevue'],
  },

  runtimeConfig: {
    // SENDGRID_API_KEY: '',
    DEEPGRAM_API_KEY: process.env.DEEPGRAM_API_KEY,
    public: {
      environment: process.env.environment ?? 'local',
      supabaseAuthSignInRedirectTo: process.env.environment === 'local' ? 'http://localhost:3000' : 'https://swiftcaptions.com',
      supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNiend2ZmxhcXJqdHJub3N5eXFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcyODIwMzcsImV4cCI6MjA0Mjg1ODAzN30.tbPafiQsT-iTDgItjYSxOODfvuBum_Dcd7cKO_Mi9yM',
      supabaseUrl: 'https://cbzwvflaqrjtrnosyyqd.supabase.co',
      supabaseAuthTokenName: 'sb-cbzwvflaqrjtrnosyyqd-auth-token',
    }
  },

  compatibilityDate: '2024-09-17',
})