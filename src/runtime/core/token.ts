import type { Ref } from 'vue'
import { jwtDecode } from 'jwt-decode'
import dayjs from 'dayjs'
import type { ModuleOptions } from '../types'
import { useCookie } from '#imports'

export class Token {
  private _accessTokenCookie: Ref<string | null>
  private _refreshTokenCookie: Ref<string | null>

  constructor(options: ModuleOptions) {
    const { token, refresh, cookie } = options
    let expires = undefined
    // access token cookie
    if (options.cookie?.maxAge) {
      expires = this.cookieExp(options.cookie.maxAge)
    }
    if (options.token?.cookie?.maxAge) {
      expires = this.cookieExp(options.token?.cookie?.maxAge)
    }
    const accessTokenCookieName = token!.cookie!.name
    const accessTokenCookieOptions = { ...cookie, ...token!.cookie, expires }
    this._accessTokenCookie = useCookie<string | null>(accessTokenCookieName, accessTokenCookieOptions)
    // refresh token cookie
    if (options.cookie?.maxAge) {
      expires = this.cookieExp(options.cookie.maxAge)
    }
    if (options.refresh?.cookie?.maxAge) {
      expires = this.cookieExp(options.refresh?.cookie?.maxAge)
    }
    const refreshTokenCookieName = refresh!.cookie!.name
    const refreshTokenCookieOptions = { ...cookie, ...refresh!.cookie }
    this._refreshTokenCookie = useCookie<string | null>(refreshTokenCookieName, refreshTokenCookieOptions)
  }

  get accessToken(): string | null {
    if (this.isAccessTokenExpired) return null
    return this._accessTokenCookie.value
  }

  get isAccessTokenExpired(): boolean {
    if (!this.accessTokenExpires) return true
    return this.accessTokenExpires < new Date()
  }

  get accessTokenExpires(): Date | undefined {
    if (!this._accessTokenCookie || !this._accessTokenCookie.value) return
    const decoded = jwtDecode<{ exp: number }>(this._accessTokenCookie.value)
    return new Date(decoded.exp * 1000)
  }

  get refreshToken(): string | null {
    if (this.isRefreshTokenExpired) return null
    return this._refreshTokenCookie.value
  }

  get isRefreshTokenExpired(): boolean {
    if (!this.refreshTokenExpires) return true
    return this.refreshTokenExpires < new Date()
  }

  get refreshTokenExpires(): Date | undefined {
    if (!this._refreshTokenCookie.value) return
    const decoded = jwtDecode<{ exp: number }>(this._refreshTokenCookie.value)
    return new Date(decoded.exp * 1000)
  }

  private cookieExp(second: number): Date {
    return dayjs().add(second, 'second').toDate()
  }

  public set accessToken(accessToken: string) {
    this._accessTokenCookie.value = accessToken
  }

  public set refreshToken(refreshToken: string) {
    this._refreshTokenCookie.value = refreshToken
  }

  public clean(): void {
    this._accessTokenCookie.value = null
    this._refreshTokenCookie.value = null
  }
}
