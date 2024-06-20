import { unref } from 'vue'
import { usePermission } from '../composables/usePermission.js'
import { type RouteLocationNormalized } from '#vue-router'
import { navigateTo, useNuxtApp } from '#imports'

export default async function aclMiddleware(to: RouteLocationNormalized) {
  const app = useNuxtApp()
  const { hasPagePermissions } = usePermission()
  const { meta: { auth }, matched } = to
  if (auth !== 'acl') return
  const canRender = unref(hasPagePermissions(matched[0].path))
  if (canRender) return
  return app.runWithContext(() => navigateTo({ path: app.$config.public.natlk.pages!.unauthorized! }))
}
