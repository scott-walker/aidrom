import { createContext } from "react"

// Темы макета
export const THEME_LIGHT = "light"
export const THEME_DARK = "dark"

/**
 * Тип темы макета
 * @namespace Layouts.Lucent.Context.Theme
 */
export type Theme = typeof THEME_LIGHT | typeof THEME_DARK

/**
 * Интерфейс контекста макета
 * @namespace Layouts.Lucent.Context.ILayoutContext
 * @property {boolean} sidebarCollapsed - состояние свернутости сайдбара
 * @property {boolean} infobarCollapsed - состояние свернутости инфобара
 * @property {Theme} theme - текущая тема макета
 * @property {function} setSidebarCollapsed - установщик состояния свернутости сайдбара
 * @property {function} setInfobarCollapsed - установщик состояния свернутости инфобара
 * @property {function} setTheme - установщик темы макета
 */
export interface ILayoutContext {
  sidebarCollapsed: boolean
  infobarCollapsed: boolean
  theme: Theme
  setSidebarCollapsed: (sidebarCollapsed: boolean) => void
  setInfobarCollapsed: (infobarCollapsed: boolean) => void
  setTheme: (theme: Theme) => void
}

/**
 * Контекст макета
 * @namespace Layouts.Lucent.Context
 */
export const LayoutContext = createContext<ILayoutContext | null>(null)
