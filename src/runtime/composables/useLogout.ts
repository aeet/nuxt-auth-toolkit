import { AuthStatus } from '../types'
import { useAccessToken } from './useAccessToken'
import { useNatlkOptions } from './useNatlkOptions'
import { useRefreshToken } from './useRefreshToken'
import { navigateTo, useNuxtApp } from '#imports'

export const useLogout = () => {
  const app = useNuxtApp()
  const { getOptions } = useNatlkOptions()
  const options = getOptions()
  const { logout: { url, method } } = options.endpoints!
  const { clearAccessToken } = useAccessToken()
  const { clearRefreshToken } = useRefreshToken()

  const logout = async (callApi: boolean = false, status: AuthStatus = AuthStatus.Logout) => {
    if (callApi) {
      await $fetch(url, { method: method })
    }
    clearAccessToken()
    clearRefreshToken()
    app.runWithContext(() => navigateTo({ path: options.pages?.login, query: { status } }))
  }

  return { logout }
}
