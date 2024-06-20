import { unref } from 'vue'
import type { $Fetch, FetchContext, FetchOptions } from 'ofetch'
import { AuthStatus, HTTP_STATUS_UNAUTHORIZED } from '../types'
import { useNatlkOptions } from './useNatlkOptions'
import { useRefresh } from './useRefresh'
import { useAuthFailure } from './useAuthFailure'
import { useAccessToken } from './useAccessToken'
import { useRefreshToken } from './useRefreshToken'
import { useLogout } from './useLogout'

export const useGlobalFetch = () => {
  const { getOptions } = useNatlkOptions()
  const natlkOptions = getOptions()
  const { accessToken, tokenTemplate } = useAccessToken()
  const { refreshToken } = useRefreshToken()
  const { onAuthFailure } = useAuthFailure()
  const { onRefreshToken } = useRefresh()

  const buildRetryOptions = (options: FetchOptions) => {
    const headers = new Headers(options.headers)
    headers.set(natlkOptions.accessToken!.headerName!, unref(tokenTemplate)!)
    return {
      baseURL: options.baseURL,
      body: options.body,
      headers,
      method: options.method,
      params: options.params,
      query: options.query,
      responseType: options.responseType,
      ignoreResponseError: options.ignoreResponseError,
      parseResponse: options.parseResponse,
      duplex: options.duplex,
      timeout: options.timeout,
      auth: true,
      retry: false as const,
    }
  }

  // @ts-expect-error Property 'native' is missing in type '$Fetch<unknown, NitroFetchRequest>' but required in type '$Fetch'.ts(2741)
  const _fetch: $Fetch = $fetch.create({
    baseURL: natlkOptions.baseURL,
    headers: {
      Accept: 'application/json',
    },
    onRequest: (context: FetchContext) => {
      context.options.headers = new Headers(context.options.headers)
      let needAuth = true
      if (context.options['auth'] === false) needAuth = false
      if (needAuth && accessToken && accessToken.value) {
        context.options.headers.set(natlkOptions.accessToken!.headerName!, unref(tokenTemplate)!)
      }
      else {
        context.options.headers.delete(natlkOptions.accessToken!.headerName!)
      }
    },
    onResponse: async (context: FetchContext) => {
      const { response, options, request } = context
      const isUnauthorized = response?.status === HTTP_STATUS_UNAUTHORIZED
      if (!isUnauthorized) return
      let needAuth = true
      if (options['auth'] === false) needAuth = false
      if (!needAuth) return
      if (!unref(refreshToken)) {
        await onAuthFailure(AuthStatus.Unauthorized)
        return
      }
      await onRefreshToken()
      if (!unref(accessToken)) {
        await onAuthFailure(AuthStatus.Expired)
        return
      }
      const retryOptions = buildRetryOptions(options)
      await _fetch(request, {
        ...retryOptions,
        onResponse(ctx: FetchContext) {
          Object.assign(context, ctx)
        },
      })
        .catch((e) => {
          if (e.status && e.status === 401) {
            useLogout().logout(false, AuthStatus.Logout)
          }
        })
    },
  })

  return _fetch
}
