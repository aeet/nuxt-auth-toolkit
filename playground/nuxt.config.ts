export default defineNuxtConfig({
  experimental: {
    appManifest: false,
  },
  modules: ['../src/module'],
  ssr: true,
  natlk: {
    baseURL: '/api',
    pages: {
      unauthorized: '/401',
    },
    accessToken: {
      cookie: {
        name: 'natlk.token',
      },
    },
    refreshToken: {
      paramName: 'refreshToken',
      cookie: {
        name: 'natlk.refresh',
      },
    },
    cookie: {
      path: '/',
      domain: 'localhost',
      httpOnly: false,
    },
    middleware: {
      auth: { enable: true },
    },
  },
  devtools: { enabled: true },
})
