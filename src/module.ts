import defu from 'defu'
import { defineNuxtModule, addPlugin, createResolver, addImportsDir } from '@nuxt/kit'
import packageJSON from '../package.json'
import { defaultOptions, type ModuleOptions } from './runtime/types'

declare module '@nuxt/schema' {
  interface PublicRuntimeConfig {
    natlk: ModuleOptions
  }
  interface NuxtConfig {
    natlk?: ModuleOptions
  }
  interface NuxtOptions {
    natlk?: ModuleOptions
  }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: packageJSON.name,
    configKey: 'natlk',
  },
  defaults: defaultOptions,
  setup(_options, _nuxt) {
    _nuxt.options.runtimeConfig.public.natlk = defu(_options, defaultOptions)
    const { resolve } = createResolver(import.meta.url)
    addImportsDir(resolve('./runtime/composables'))
    addPlugin(resolve('./runtime/plugins/auth-fetch'))
    addPlugin(resolve('./runtime/plugins/auth-middleware'))
    addPlugin(resolve('./runtime/plugins/auth-directive'))
    _nuxt.options.alias['#natlk'] = resolve('./runtime/types')
    _nuxt.options.build.transpile.push('#natlk')
  },
})
