import { unref, computed } from 'vue'
import { get } from 'lodash-es'
import { useSession } from './useSession'
import { useNatlkOptions } from './useNatlkOptions'

export const usePermission = () => {
  const { getOptions } = useNatlkOptions()
  const options = getOptions()
  const { session } = useSession()
  const _roles = computed<string[]>(() => get(unref(session), options.endpoints!.session.roles!.path!))
  const _groups = computed<string[]>(() => get(unref(session), options.endpoints!.session.groups!.path!))
  const _permissions = computed<string[]>(() => get(unref(session), options.endpoints!.session.permissions!.path!))
  const _pages = computed<{ route: string, permissions: string[] }[]>(() => {
    return (get(unref(session), options.endpoints!.session.pages!.path!) || []).map((page: any) => {
      return {
        route: get(page, options.endpoints!.session.pages!.property!.route!.path!),
        permissions: get(page, options.endpoints!.session.pages!.property!.permissions!.path!),
      }
    })
  })

  const hasRoles = (roles: string[], all: boolean = false) => computed(() => {
    const userRoles = unref(_roles)
    return all ? roles.every(role => userRoles.includes(role)) : roles.some(role => userRoles.includes(role))
  })

  const hasGroups = (groups: string[], all: boolean = false) => computed(() => {
    const userGroups = unref(_groups)
    return all ? groups.every(group => userGroups.includes(group)) : groups.some(group => userGroups.includes(group))
  })

  const hasPermissions = (permissions: string[], all: boolean = false) => computed(() => {
    const userPermissions = unref(_permissions)
    return all ? permissions.every(permission => userPermissions.includes(permission)) : permissions.some(permission => userPermissions.includes(permission))
  })

  const hasPagePermissions = (route: string, permissions: string[] = [], all: boolean = false) => computed(() => {
    const userPages = unref(_pages)
    const page = userPages.find(page => page.route === route)
    if (!page) return false
    if (page && permissions.length === 0) return true
    return all ? permissions.every(permission => page.permissions.includes(permission)) : permissions.some(permission => page.permissions.includes(permission))
  })

  return {
    roles: _roles,
    groups: _groups,
    permissions: _permissions,
    pages: _pages,
    hasRoles,
    hasGroups,
    hasPermissions,
    hasPagePermissions,
  }
}
