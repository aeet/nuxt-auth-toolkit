import { get } from 'lodash-es'
import type { EndpointOptions, ModuleOptions } from '../types'
import { useNatlkOptions } from './useNatlkOptions'

export const useEndpointsProperty = () => {
  const { getOptions } = useNatlkOptions()
  const options = getOptions()
  const getProperty = (payload: any, key: keyof EndpointOptions) => {
    const { property } = options.endpoints![key]
    return property ? get(payload, property) : payload
  }

  const getTokenProperty = (payload: any, key: keyof Pick<ModuleOptions, 'accessToken' | 'refreshToken'>) => {
    const { path } = options[key]!
    return get(payload, path!)
  }

  return { getProperty, getTokenProperty }
}
