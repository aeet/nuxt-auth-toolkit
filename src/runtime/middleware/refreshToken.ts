import { unref } from 'vue'
import { useRefresh } from '../composables/useRefresh'
import { useReferer } from '../composables/useReferer'
import { AuthStatus } from '../types'
import { useAccessToken } from '../composables/useAccessToken'
import { useRefreshToken } from '../composables/useRefreshToken'
import { useAuthFailure } from '../composables/useAuthFailure'
import type { RouteLocationNormalized } from '#vue-router'

export default async function refreshTokenMiddleware(to: RouteLocationNormalized) {
  const { setReferer } = useReferer()
  const { onAuthFailure } = useAuthFailure()
  const { onRefreshToken } = useRefresh()
  const { fullPath, meta: { auth } } = to
  if (auth === 'guest') return

  const { isAccessTokenExpired } = useAccessToken()
  const { isRefreshTokenExpired } = useRefreshToken()

  if (unref(isAccessTokenExpired) && !unref(isRefreshTokenExpired)) {
    try {
      await onRefreshToken()
    }
    catch (e) {
      setReferer(fullPath)
      return onAuthFailure(AuthStatus.Expired)
    }
  }
}
