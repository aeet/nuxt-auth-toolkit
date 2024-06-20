import defu from 'defu'
import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'
import type { ModuleOptions } from './runtime/types.ts'

declare module '@nuxt/schema' {
  interface ConfigSchema {
    publicRuntimeConfig?: {
      auth: ModuleOptions
    }
  }
  interface NuxtConfig {
    auth?: ModuleOptions
  }
  interface NuxtOptions {
    auth?: ModuleOptions
  }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'my-module',
    configKey: 'bak',
  },
  defaults: {
  },
  setup(_options, _nuxt) {
    _nuxt.options.runtimeConfig.public.auth = defu(_nuxt.options.runtimeConfig.public.auth, { ..._options })
    const { resolve } = createResolver(import.meta.url)
    addPlugin(resolve('./runtime/plugin'))
    _nuxt.options.alias['#bak'] = resolve('./types')
    _nuxt.options.build.transpile.push('#bak')
  },
})
