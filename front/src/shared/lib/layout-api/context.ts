import { createContext, useContext } from "react"
import type { LayoutContextApi } from "./types"

/**
 * Контекст макета
 * @namespace Shared.Lib.LayoutApi.LayoutContext
 */
export const LayoutContext = createContext<LayoutContextApi>({} as LayoutContextApi)

/**
 * Хук для получения API макета
 * @namespace Shared.Lib.LayoutApi.useLayout
 */
export const useLayout = (): LayoutContextApi => {
  const api = useContext(LayoutContext)

  if (!api) {
    throw new Error("Используй createLayout() для создания макета, чтобы использовать useLayout")
  }

  return api
}
