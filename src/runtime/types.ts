import type { CookieParseOptions, CookieSerializeOptions } from 'cookie-es'

declare module '#app' {
  interface PageMeta {
    auth?: AuthPageMeta
  }
}

declare module 'ofetch' {
  interface FetchOptions {
    auth?: AuthFetchOption
  }
}

export type AuthFetchOption = boolean
export type AuthPageMeta = 'guest' | 'acl' | 'logined'

export type ModuleOptions = {
  baseURL?: string
  accessToken?: AccessTokenOptions
  refreshToken?: RefreshTokenOptions
  endpoints?: EndpointOptions
  cookie?: CookieOptions
  pages?: PageOptions
  middleware?: MiddlewareOptions
}

export type AccessTokenOptions = {
  path?: string
  headerName?: string
  type?: string
  cookie?: CookieOptions & { name: string }
}

export type RefreshTokenOptions = {
  path?: string
  paramName?: string
  cookie?: CookieOptions & { name: string }
}

export type EndpointOptions = {
  login: Endpoint
  logout: Endpoint
  refresh: Endpoint
  session: Endpoint & PermissionEndpoint
}

export interface Endpoint {
  url: string
  method?: 'GET' | 'HEAD' | 'PATCH' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'TRACE' | 'get' | 'head' | 'patch' | 'post' | 'put' | 'delete' | 'connect' | 'options' | 'trace' | undefined
  property?: string
}

export type CookieOptions = Omit<CookieSerializeOptions & CookieParseOptions, 'decode' | 'encode'>

export type PageOptions = {
  login?: string
  home?: string
  logout?: string
  unauthorized?: string
}

export const HTTP_STATUS_UNAUTHORIZED = 401

export enum AuthStatus {
  Unauthorized = 'unauthorized',
  Expired = 'expired',
  Logout = 'logout',
}

export type PermissionEndpoint = {
  roles?: { path?: string }
  groups?: { path?: string }
  permissions?: { path?: string }
  pages?: {
    path?: string
    property?: {
      route?: { path?: string }
      permissions?: { path?: string }
    }
  }
}

export type Session = {
  [key: string]: any
}

export type MiddlewareOptions = {
  auth?: { enable?: boolean }
}

export const defaultOptions: ModuleOptions = {
  baseURL: '/',
  accessToken: {
    path: 'access_token',
    headerName: 'Authorization',
    type: 'Bearer',
    cookie: {
      name: 'natlk.token',
    },
  },
  refreshToken: {
    path: 'refresh_token',
    paramName: 'refreshToken',
    cookie: {
      name: 'natlk.refresh',
    },
  },
  endpoints: {
    login: {
      url: '/auth/login',
      method: 'POST',
      property: 'data',
    },
    logout: {
      url: '/auth/logout',
      method: 'POST',
    },
    refresh: {
      url: '/auth/refresh',
      method: 'POST',
      property: 'data',
    },
    session: {
      url: '/auth/session',
      method: 'GET',
      property: 'data',
      roles: { path: 'roles' },
      groups: { path: 'groups' },
      permissions: { path: 'permissions' },
      pages: {
        path: 'pages',
        property: {
          route: { path: 'route' },
          permissions: { path: 'permissions' },
        },
      },
    },
  },
  cookie: {
    maxAge: 365 * 24 * 60 * 60,
  },
  middleware: {
    auth: {
      enable: true,
    },
  },
  pages: {
    home: '/',
    login: '/login',
    logout: '/logout',
    unauthorized: '/unauthorized',
  },
}
