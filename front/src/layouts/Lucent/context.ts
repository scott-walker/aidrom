import { createContext } from "react"

/**
 * Интерфейс контекста макета
 * @namespace Layouts.Lucent.Context.Interface
 * @property {boolean} sidebarCollapsed - состояние свернутости сайдбара
 * @property {boolean} infobarShown - состояние видимости инфобара
 * @property {function} setSidebarCollapsed - установщик состояния свернутости сайдбара
 * @property {function} setInfobarShown - установщик состояния видимости инфобара
 */
export interface ILayoutContext {
  sidebarCollapsed: boolean
  infobarShown: boolean
  setSidebarCollapsed: (sidebarCollapsed: boolean) => void
  setInfobarShown: (infobarShown: boolean) => void
}

/**
 * Контекст макета
 * @namespace Layouts.Lucent.Context
 */
export const LayoutContext = createContext<ILayoutContext | null>(null)
