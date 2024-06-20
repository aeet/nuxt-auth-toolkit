import { unref } from 'vue'
import { AuthStatus } from '../types'
import { useAuthFailure } from '../composables/useAuthFailure'
import { useAccessToken } from '../composables/useAccessToken'
import { useRefreshToken } from '../composables/useRefreshToken'
import type { RouteLocationNormalized } from '#vue-router'

export default async function noTokenMiddleware(to: RouteLocationNormalized) {
  const { onAuthFailure } = useAuthFailure()
  const { isAccessTokenExpired } = useAccessToken()
  const { isRefreshTokenExpired } = useRefreshToken()
  const { meta: { auth } } = to
  if (auth === 'guest') return
  if (unref(isAccessTokenExpired) && unref(isRefreshTokenExpired)) {
    return onAuthFailure(AuthStatus.Unauthorized)
  }
  if (!unref(isAccessTokenExpired) && unref(isRefreshTokenExpired)) {
    return onAuthFailure(AuthStatus.Unauthorized)
  }
}
