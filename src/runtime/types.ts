import type { CookieParseOptions, CookieSerializeOptions } from 'cookie-es'

export type ModuleOptions = {
  token?: TokenOption
  refresh?: RefreshTokenOption
  endpoints?: EndpointOption
  cookie?: CookieOption
}

export type TokenOption = {
  path?: string
  type?: string
  cookie?: CookieOption & { name: string }
}

export type RefreshTokenOption = {
  path?: string
  paramName?: string
  cookie?: CookieOption & { name: string }
}

export type EndpointOption = {
  login: Endpoint
  logout: Endpoint
  refresh: Endpoint
  session: Endpoint
}

export interface Endpoint {
  url: string
  method?: string
  property?: string
}

export type CookieOption = Omit<CookieSerializeOptions & CookieParseOptions, 'decode' | 'encode'>
