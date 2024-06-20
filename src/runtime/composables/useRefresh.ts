import { unref } from 'vue'
import { AuthStatus } from '../types'
import { useAccessToken } from './useAccessToken'
import { useEndpointsProperty } from './useEndpointsProperty'
import { useLogout } from './useLogout'
import { useNatlkOptions } from './useNatlkOptions'
import { useRefreshToken } from './useRefreshToken'

export interface UseRefresh {
  accessToken: string
  refreshToken: string
}

export const useRefresh = () => {
  const { getOptions } = useNatlkOptions()
  const options = getOptions()
  const { getProperty, getTokenProperty } = useEndpointsProperty()
  const { setAccessToken } = useAccessToken()
  const { setRefreshToken, refreshToken: rt } = useRefreshToken()
  const { logout } = useLogout()
  const { refresh: { url, method } } = options.endpoints!

  const onRefreshToken = async () => {
    try {
      const res = await globalThis.$fetch(url!, { method, auth: false, ...{ [method!.toLowerCase() === 'get' ? 'query' : 'body']: { [options.refreshToken!.paramName!]: unref(rt) } } })
      const data = getProperty(res, 'refresh')
      const accessToken = getTokenProperty(data, 'accessToken')
      const refreshToken = getTokenProperty(data, 'refreshToken')
      setAccessToken(accessToken)
      setRefreshToken(refreshToken)
    }
    catch (e) {
      await logout(false, AuthStatus.Expired)
      return Promise.reject(e)
    }
  }
  return { onRefreshToken }
}
