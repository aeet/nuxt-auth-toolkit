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
      path: process.env.COOKIE_PATH || '/',
      domain: process.env.COOKIE_DOMAIN || 'localhost',
      secure: process.env.COOKIE_SECURE === 'true',
      httpOnly: false,
      sameSite: process.env.COOKIE_SAMESITE === 'lax' ? 'lax' : 'none',
    },
    middleware: {
      auth: { enable: true },
    },
  },
  devtools: { enabled: true },
})
