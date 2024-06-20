import { useGlobalFetch } from '../composables/useGlobalFetch'
import { defineNuxtPlugin } from '#imports'

export default defineNuxtPlugin((_nuxt) => {
  globalThis.$fetch = useGlobalFetch()
})
