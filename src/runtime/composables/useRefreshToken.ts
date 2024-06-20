import { jwtDecode } from 'jwt-decode'
import { unref, watch, computed } from 'vue'
import { useNatlkOptions } from './useNatlkOptions'
import { useCookie, useState } from '#imports'

export const useRefreshToken = () => {
  const STATE_KEY = 'auth:raw-refresh-token'
  const { getOptions } = useNatlkOptions()
  const options = getOptions()
  const cookie = useCookie<string | null>(options.refreshToken!.cookie!.name, { default: () => null, ...options.cookie, ...options.refreshToken?.cookie })
  const raw = useState(STATE_KEY, () => cookie.value)
  const token = computed(() => raw.value)
  watch(token, value => cookie.value = value)
  const setToken = (token: string | null) => raw.value = token
  const clear = () => (raw.value = null)

  const expires = computed(() => {
    if (!unref(token)) return null
    try {
      const decoded = jwtDecode<{ exp: number }>(unref(token)!)
      return decoded.exp * 1000
    }
    catch (e) {
      return null
    }
  })

  const isExpired = computed(() => {
    const exp = unref(expires)
    if (!exp) return true
    return exp < Date.now()
  })

  return {
    refreshToken: token,
    setRefreshToken: setToken,
    clearRefreshToken: clear,
    refreshTokenExpires: expires,
    isRefreshTokenExpired: isExpired,
  }
}
