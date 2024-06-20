import { useNuxtApp } from '#imports'

export const useNatlkOptions = () => {
  const app = useNuxtApp()
  const getOptions = () => {
    return app.$config.public.natlk
  }
  return { getOptions }
}
