import refreshTokenMiddleware from '../middleware/refreshToken'
import noTokenMiddleware from '../middleware/noToken'
import fetchSessionMiddleware from '../middleware/fetchSession'
import aclMiddleware from '../middleware/acl'
import { addRouteMiddleware, defineNuxtPlugin } from '#imports'

export default defineNuxtPlugin((_nuxt) => {
  addRouteMiddleware('noToken', noTokenMiddleware, { global: true })
  addRouteMiddleware('refreshToken', refreshTokenMiddleware, { global: true })
  addRouteMiddleware('fetchSession', fetchSessionMiddleware, { global: true })
  addRouteMiddleware('acl', aclMiddleware, { global: true })
})
