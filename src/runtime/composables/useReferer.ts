import { watch, computed } from 'vue'
import { useNatlkOptions } from './useNatlkOptions'
import { useCookie, useState } from '#imports'

export const useReferer = () => {
  const STATE_KEY = 'auth-raw:referer'
  const COOKIE_NAME = 'auth-cookie:referer'
  const { getOptions } = useNatlkOptions()
  const options = getOptions()
  const cookie = useCookie<string | null>(COOKIE_NAME, { default: () => null, ...options.cookie })
  const raw = useState(STATE_KEY, () => cookie.value)
  const referer = computed(() => raw.value)
  watch(referer, value => cookie.value = value)
  const setReferer = (fullPath: string | null) => raw.value = fullPath
  const redirect = computed(() => {
    const redirectPath = options.pages?.home ?? '/'
    return referer.value ? referer.value : redirectPath
  })

  return {
    referer,
    redirect,
    setReferer,
  }
}
