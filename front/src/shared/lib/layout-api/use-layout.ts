import { useEffect } from "react"
import { useLayoutStore } from "./use-layout-store"

/**
 * Хук для получения состояния макета
 * @namespace Shared.Lib.LayoutApi.useLayoutTitle
 */
export const useLayoutTitle = (title: string) => {
  const setTitle = useLayoutStore(state => state.setTitle)

  useEffect(() => setTitle(title), [title])
}

/**
 * Хук для получения состояния макета
 * @namespace Shared.Lib.LayoutApi.useLayoutSubtitle
 */
export const useLayoutSubtitle = (subtitle: string) => {
  const setSubtitle = useLayoutStore(state => state.setSubtitle)

  useEffect(() => setSubtitle(subtitle), [subtitle])
}
