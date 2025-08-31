import type { ReactNode } from "react"
import type { LayoutApi } from "@scottwalker/lucent"

/**
 * API контекста макета
 * @namespace Shared.Lib.LayoutApi.LayoutContextApi
 */
export type LayoutContextApi = LayoutApi & {}

/**
 * Пропсы провайдера макета
 * @namespace Shared.Lib.LayoutApi.LayoutProviderProps
 */
export type LayoutProviderProps = {
  children: ReactNode
}
