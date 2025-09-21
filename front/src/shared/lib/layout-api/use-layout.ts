import { useLayoutStore } from "./use-layout-store"

/**
 * Хук для получения состояния макета
 * @namespace Shared.Lib.LayoutApi.useLayoutTitle
 */
export const useLayoutTitle = () => {
  return {
    title: useLayoutStore(state => state.title),
    setTitle: useLayoutStore(state => state.setTitle)
  }
}

/**
 * Хук для получения состояния макета
 * @namespace Shared.Lib.LayoutApi.useLayoutSubtitle
 */
export const useLayoutSubtitle = () => {
  return {
    subtitle: useLayoutStore(state => state.subtitle),
    setSubtitle: useLayoutStore(state => state.setSubtitle)
  }
}
