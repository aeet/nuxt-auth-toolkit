import { unref, computed, ref } from 'vue'
import { useReferer } from './useReferer'
import { useGlobalFetch } from './useGlobalFetch'
import { useNatlkOptions } from './useNatlkOptions'
import { useEndpointsProperty } from './useEndpointsProperty'
import { useSession } from './useSession'
import { useAccessToken } from './useAccessToken'
import { useRefreshToken } from './useRefreshToken'
import { useLogout } from './useLogout'
import { navigateTo } from '#imports'

export interface UseLoginOptions {
  redirect?: string
  credentials?: any
  invalidErrorMessage?: string
  otherErrorMessage?: string
}
export const useLogin = ({
  redirect,
  credentials: initials,
  invalidErrorMessage = 'Invalid login credentials',
  otherErrorMessage = 'An error has occurred',
}: UseLoginOptions = {}) => {
  const { getOptions } = useNatlkOptions()
  const options = getOptions()
  const { getProperty, getTokenProperty } = useEndpointsProperty()
  const { setAccessToken } = useAccessToken()
  const { setRefreshToken } = useRefreshToken()
  const { fetchSession } = useSession()
  const { setReferer, redirect: referer } = useReferer()
  const { logout } = useLogout()
  const credentials = ref({ ...initials })
  const pending = ref(false)
  const error = ref<any>(null)

  const errorMsg = computed(() => {
    const status = error.value?.status
    const isInvalid = Number.isInteger(status) && status >= 400 && status < 500
    if (isInvalid || error.value === true) {
      return invalidErrorMessage
    }
    return error.value ? otherErrorMessage : null
  })

  const resetError = () => {
    error.value = null
  }

  const invalid = computed(() => {
    return Object.keys(credentials.value as object).some(
      entry => String((credentials.value as any)[entry] ?? '') === '',
    )
  })

  const login = async (params?: Record<string, unknown>) => {
    if (invalid.value) {
      error.value = true
      return Promise.resolve()
    }
    pending.value = true
    resetError()
    const payload = params ?? credentials.value
    const redirectRoute = redirect ? redirect : unref(referer)
    try {
      const _fetch = useGlobalFetch()
      const res = await _fetch(options.endpoints!.login.url!, {
        method: options.endpoints!.login.method,
        auth: false,
        ...{ [options.endpoints!.login.method!.toLowerCase() === 'get' ? 'query' : 'body']: payload },
      })
      const data = getProperty(res, 'login')
      setAccessToken(getTokenProperty(data, 'accessToken'))
      setRefreshToken(getTokenProperty(data, 'refreshToken'))
      await fetchSession()
      await navigateTo({ path: redirectRoute }, { replace: true })
      setReferer(null)
      return data
    }
    catch (e) {
      logout(false)
      error.value = e
    }
    finally {
      pending.value = false
    }
  }

  return {
    credentials,
    errorMsg,
    error,
    pending,
    resetError,
    login,
  }
}
