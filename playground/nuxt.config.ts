export default defineNuxtConfig({
  modules: ['../src/module'],
  ssr: true,
  bak: {
    token: {
      cookie: {
        name: 'token',
        maxAge: 365 * 24 * 60 * 60,
        secure: false,
      },
    },
    refresh: {
      cookie: {
        name: 'refresh',
        maxAge: 365 * 24 * 60 * 60,
        secure: false,
      },
    },
  },
  devtools: { enabled: true },
})
