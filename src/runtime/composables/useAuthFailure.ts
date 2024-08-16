import { useRoute } from 'vue-router'
import { AuthStatus } from '../types'
import { useReferer } from './useReferer'
import { useNatlkOptions } from './useNatlkOptions'
import { useAccessToken } from './useAccessToken'
import { useRefreshToken } from './useRefreshToken'
import { navigateTo, useNuxtApp } from '#imports'

export const useAuthFailure = () => {
  const { getOptions } = useNatlkOptions()
  const options = getOptions()
  const app = useNuxtApp()
  const { setReferer } = useReferer()
  const { clearAccessToken } = useAccessToken()
  const { clearRefreshToken } = useRefreshToken()

  const onAuthFailure = async (status = AuthStatus.Expired) => {
    const { fullPath: referer } = useRoute()
    clearAccessToken()
    clearRefreshToken()
    setReferer(referer)
    return app.runWithContext(() => navigateTo({ path: options.pages?.login, query: { status } }))
  }

  return { onAuthFailure }
}
