import { Token } from './core/token'
import {
  defineNuxtPlugin,
  useRuntimeConfig,
} from '#imports'

declare module '#app' {
  interface NuxtApp {
    $token: Token
  }
}

declare module 'vue' {
  interface NuxtApp {
    $token: Token
  }
}

export default defineNuxtPlugin(() => {
  const options = useRuntimeConfig().public.auth
  const token = new Token(options)
  return { provide: { token: token } }
})
