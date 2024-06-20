import type { Session } from '../types'
import { useNatlkOptions } from './useNatlkOptions'
import { useEndpointsProperty } from './useEndpointsProperty'
import { useState } from '#imports'

export const useSession = () => {
  const STATE_KEY = 'auth-raw:session'
  const { getOptions } = useNatlkOptions()
  const options = getOptions()
  const { getProperty } = useEndpointsProperty()
  const sessionState = useState<Session>(STATE_KEY)

  const setSession = (session: Session) => sessionState.value = session

  const fetchSession = async () => {
    const resp = await globalThis.$fetch(options.endpoints!.session.url, { method: options.endpoints?.session.method })
    const data = getProperty(resp, 'session')
    sessionState.value = data
  }
  return { session: sessionState, setSession, fetchSession }
}
