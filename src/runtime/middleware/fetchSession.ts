import { unref } from 'vue'
import type { RouteLocationNormalized } from 'vue-router'
import { useSession } from '../composables/useSession'
import { useAccessToken } from '../composables/useAccessToken'
import { useRefreshToken } from '../composables/useRefreshToken'

export default async function fetchSessionMiddleware(to: RouteLocationNormalized) {
  const { meta: { auth } } = to
  if (auth === 'guest') return
  const { fetchSession, session } = useSession()
  const { isAccessTokenExpired } = useAccessToken()
  const { isRefreshTokenExpired } = useRefreshToken()
  if (!unref(isAccessTokenExpired) && !unref(isRefreshTokenExpired) && !unref(session)) await fetchSession()
}
