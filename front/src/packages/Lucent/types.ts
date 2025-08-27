import type { ComponentProps, ReactNode } from "react"
import {
  THEME_MODE_LIGHT,
  THEME_MODE_DARK,
  PAGE_MODE_DEFAULT,
  PAGE_MODE_EXPANDED,
  SIDEBAR_MODE_EXPANDED,
  SIDEBAR_MODE_COLLAPSED,
  FOOTER_MODE_VISIBLE,
  FOOTER_MODE_HIDDEN,
  INFOBAR_MODE_VISIBLE,
  INFOBAR_MODE_HIDDEN
} from "./constants"

/**
 * Пропсы для страницы
 * @namespace Lucent.PageProps
 */
export type PageProps = {
  children: ReactNode
}

/**
 * Пропсы для шапки
 * @namespace Lucent.PageHeaderProps
 */
export type PageHeaderProps = {
  children: ReactNode
}

/**
 * Пропсы для тела
 * @namespace Lucent.PageBodyProps
 */
export type PageBodyProps = ComponentProps<"div">

/**
 * Пропсы для футера
 * @namespace Lucent.PageFooterProps
 */
export type PageFooterProps = {
  children: ReactNode
}

/**
 * Пропсы для контента
 * @namespace Lucent.ContentProps
 */
export type ContentProps = ComponentProps<"div">

/**
 * Пропсы для информационного панеля
 * @namespace Lucent.InfobarProps
 */
export type InfobarProps = ComponentProps<"div">

/**
 * Тип для состояния темы
 * @namespace Lucent.Theme
 */
export type ThemeMode = typeof THEME_MODE_LIGHT | typeof THEME_MODE_DARK

/**
 * Тип для состояния страницы
 * @namespace Lucent.PageExpanded
 */
export type PageMode = typeof PAGE_MODE_DEFAULT | typeof PAGE_MODE_EXPANDED

/**
 * Тип для состояния боковой панели
 * @namespace Lucent.SidebarCollapsed
 */
export type SidebarMode = typeof SIDEBAR_MODE_COLLAPSED | typeof SIDEBAR_MODE_EXPANDED

/**
 * Тип для состояния футера
 * @namespace Lucent.FooterVisible
 */
export type FooterMode = typeof FOOTER_MODE_VISIBLE | typeof FOOTER_MODE_HIDDEN

/**
 * Тип для состояния информационной панели
 * @namespace Lucent.InfobarVisible
 */
export type InfobarMode = typeof INFOBAR_MODE_VISIBLE | typeof INFOBAR_MODE_HIDDEN

/**
 * Режимы макета
 * @namespace Lucent.LayoutModes
 */
export type LayoutModes = {
  theme?: ThemeMode
  page?: PageMode
  sidebar?: SidebarMode
  footer?: FooterMode
  infobar?: InfobarMode
}

/**
 * Слоты макета
 * @namespace Lucent.LayoutSlots
 */
export type LayoutSlots = {
  sidebar?: SidebarSlots
  header?: ReactNode
  content: ReactNode
  infobar?: ReactNode
  footer?: ReactNode
}

/**
 * Слоты боковой панели
 * @namespace Lucent.SidebarSlots
 */
export type SidebarSlots = {
  header?: ReactNode
  body?: ReactNode
  footer?: ReactNode
}

/**
 * Пропсы для слота боковой панели
 * @namespace Lucent.SidebarSlotProps
 */
export type SidebarSlotProps = {
  children: ReactNode
  collapsed: boolean
}

/**
 * Варианты режимов макета
 * @namespace Lucent.LayoutMode
 */
export type LayoutMode = keyof LayoutModes

/**
 * Значение режима макета
 * @namespace Lucent.LayoutModeValue
 */
export type LayoutModeValue = LayoutModes[LayoutMode] | null

/**
 * Варианты слотов макета
 * @namespace Lucent.LayoutSlot
 */
export type LayoutSlot = keyof LayoutSlots

/**
 * Значение слота макета
 * @namespace Lucent.LayoutSlotValue
 */
export type LayoutSlotValue = LayoutSlots[LayoutSlot] | null

/**
 * Варианты слотов боковой панели
 * @namespace Lucent.SidebarSlot
 */
export type SidebarSlot = keyof SidebarSlots

/**
 * Конфигурация макета
 * @namespace Lucent.LayoutConfig
 */
export type LayoutConfig = {
  modes: LayoutModes
  slots: LayoutSlots
}

/**
 * Пропсы для провайдера
 * @namespace Lucent.ProviderProps
 */
export type ProviderProps = {
  children: ReactNode
  config: LayoutConfig
}

/**
 * API макета
 * @namespace Lucent.LayoutApi
 * @property {LayoutModes} modes - режимы макета
 * @property {LayoutSlots} slots - слоты макета
 *
 * @property {function} setModes - установить режимы
 * @property {function} setMode - установить режим
 * @property {function} setSlots - установить слоты
 * @property {function} setSlot - установить слот
 * @property {function} setSidebarSlots - установить слоты боковой панели
 * @property {function} setSidebarSlot - установить слот боковой панели
 *
 * @property {function} getMode - получить режим
 * @property {function} getSlot - получить слот
 * @property {function} getSidebarSlot - получить слот боковой панели
 *
 * @property {function} isThemeLight - проверить, является ли тема светлой
 * @property {function} isThemeDark - проверить, является ли тема темной
 * @property {function} isSidebarCollapsed - проверить, является ли боковая панель свернутой
 * @property {function} isSidebarExpanded - проверить, является ли боковая панели развернутой
 * @property {function} isPageDefault - проверить, является ли страница по умолчанию
 * @property {function} isPageExpanded - проверить, является ли страница развернутой
 * @property {function} isFooterVisible - проверить, является ли футер видимым
 * @property {function} isFooterHidden - проверить, является ли футер скрытым
 * @property {function} isInfobarVisible - проверить, является ли информационная панель видимой
 * @property {function} isInfobarHidden - проверить, является ли информационная панель скрытой
 *
 * @property {function} toggleThemeMode - переключить режим темы
 * @property {function} toggleSidebarMode - переключить режим боковой панели
 * @property {function} togglePageMode - переключить режим страницы
 * @property {function} toggleFooterMode - переключить режим футера
 * @property {function} toggleInfobarMode - переключить режим информационной панели
 */
export type LayoutApi = {
  modes: LayoutModes
  slots: LayoutSlots

  // Сеттеры
  setModes: (modes: LayoutModes) => void
  setMode: (mode: LayoutMode, value: LayoutModeValue) => void
  setSlots: (slots: LayoutSlots) => void
  setSlot: (slot: LayoutSlot, value: LayoutSlotValue) => void
  setSidebarSlots: (slots: SidebarSlots) => void
  setSidebarSlot: (slot: SidebarSlot, value: ReactNode) => void

  // Геттеры
  getMode: (mode: LayoutMode) => LayoutModeValue
  getSlot: (slot: LayoutSlot) => LayoutSlotValue
  getSidebarSlot: (slot: SidebarSlot) => ReactNode

  // Проверки режимов
  isThemeLight: () => boolean
  isThemeDark: () => boolean
  isSidebarCollapsed: () => boolean
  isSidebarExpanded: () => boolean
  isPageDefault: () => boolean
  isPageExpanded: () => boolean
  isFooterVisible: () => boolean
  isFooterHidden: () => boolean
  isInfobarVisible: () => boolean
  isInfobarHidden: () => boolean

  // Переключатели режимов
  toggleThemeMode: () => void
  toggleSidebarMode: () => void
  togglePageMode: () => void
  toggleFooterMode: () => void
  toggleInfobarMode: () => void
}
