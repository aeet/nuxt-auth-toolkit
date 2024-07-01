import type { Directive } from 'vue'
import { unref } from 'vue'
import { useRoute } from 'vue-router'
import { usePermission } from '../composables/usePermission'
import { defineNuxtPlugin } from '#imports'

declare module 'vue' {
  interface ComponentCustomProperties {
    p: Directive<any, string | string[]>
    pa: Directive<any, string | string[]>
  }
}

export default defineNuxtPlugin((_nuxt) => {
  const { hasGroups, hasRoles, hasPermissions, hasPagePermissions } = usePermission()
  const { matched } = useRoute()
  // has some points then the element is rendered
  _nuxt.vueApp.directive('p', {
    mounted(el, { arg, value }) {
      const points = Array.isArray(value) ? value : [value]
      let canRender = false
      if (arg === 'roles') canRender = unref(hasRoles(points))
      if (arg === 'groups') canRender = unref(hasGroups(points))
      if (arg === 'permissions') canRender = unref(hasPermissions(points))
      if (arg === 'pages') canRender = unref(hasPagePermissions(matched[0].path, points))
      if (!canRender) el.remove()
    },
  })

  // has all points then the element is rendered
  _nuxt.vueApp.directive('pa', {
    mounted(el, { arg, value }) {
      const points = Array.isArray(value) ? value : [value]
      let canRender = false
      if (arg === 'roles') canRender = unref(hasRoles(points, true))
      if (arg === 'groups') canRender = unref(hasGroups(points, true))
      if (arg === 'permissions') canRender = unref(hasPermissions(points, true))
      if (arg === 'pages') canRender = unref(hasPagePermissions(matched[0].path, points, true))
      if (!canRender) el.remove()
    },
  })
})
