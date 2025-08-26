import { createContext } from "react"

// Темы макета
export const THEME_LIGHT = "light"
export const THEME_DARK = "dark"

// Состояния раскрытости страницы
export const PAGE_EXPANDED = "expanded"
export const PAGE_DEFAULT = "default"

// Состояния раскрытости сайдбара
export const SIDEBAR_COLLAPSED = "collapsed"
export const SIDEBAR_EXPANDED = "expanded"

// Состояния видимости футера
export const FOOTER_VISIBLE = "visible"
export const FOOTER_HIDDEN = "hidden"

// Состояния видимости инфобара
export const INFOPBAR_VISIBLE = "visible"
export const INFOPBAR_HIDDEN = "hidden"

/**
 * Тип темы макета
 * @namespace Layouts.Lucent.Context.Theme
 */
export type Theme = typeof THEME_LIGHT | typeof THEME_DARK

/**
 * Тип состояния раскрытости страницы
 * @namespace Layouts.Lucent.Context.PageExpanded
 */
export type PageExpanded = typeof PAGE_EXPANDED | typeof PAGE_DEFAULT

/**
 * Тип состояния свернутости сайдбара
 * @namespace Layouts.Lucent.Context.SidebarCollapsed
 */
export type SidebarCollapsed = typeof SIDEBAR_COLLAPSED | typeof SIDEBAR_EXPANDED

/**
 * Тип состояния видимости футера
 * @namespace Layouts.Lucent.Context.FooterVisible
 */
export type FooterVisible = typeof FOOTER_VISIBLE | typeof FOOTER_HIDDEN

/**
 * Тип состояния видимости инфобара
 * @namespace Layouts.Lucent.Context.InfobarVisible
 */
export type InfobarVisible = typeof INFOPBAR_VISIBLE | typeof INFOPBAR_HIDDEN

/**
 * Интерфейс контекста макета
 * @namespace Layouts.Lucent.Context.ILayoutContext
 *
 * @property {Theme} theme - текущая тема макета
 * @property {PageExpanded} pageExpanded - состояние раскрытости страницы
 * @property {SidebarCollapsed} sidebarCollapsed - состояние свернутости сайдбара
 * @property {FooterVisible} footerVisible - состояние видимости футера
 * @property {InfobarVisible} infobarVisible - состояние видимости инфобара
 *
 * @property {function} isDarkTheme - проверка темы макета
 * @property {function} isPageExpanded - проверка состояния раскрытости страницы
 * @property {function} isSidebarCollapsed - проверка состояния свернутости сайдбара
 * @property {function} isFooterVisible - проверка состояния видимости футера
 * @property {function} isInfobarVisible - проверка состояния видимости инфобара
 *
 * @property {function} setTheme - установщик темы макета
 * @property {function} setPageExpanded - установщик состояния раскрытости страницы
 * @property {function} setSidebarCollapsed - установщик состояния свернутости сайдбара
 * @property {function} setFooterVisible - установщик состояния видимости футера
 * @property {function} setInfobarVisible - установщик состояния видимости инфобара
 *
 * @property {function} toggleTheme - переключатель темы макета
 * @property {function} togglePageExpanded - переключатель состояния раскрытости страницы
 * @property {function} toggleSidebarCollapsed - переключатель состояния свернутости сайдбара
 * @property {function} toggleFooterVisible - переключатель состояния видимости футера
 * @property {function} toggleInfobarVisible - переключатель состояния видимости инфобара
 */
export interface ILayoutContext {
  theme: Theme
  pageExpanded: PageExpanded
  sidebarCollapsed: SidebarCollapsed
  footerVisible: FooterVisible
  infobarVisible: InfobarVisible

  isDarkTheme: () => boolean
  isPageExpanded: () => boolean
  isSidebarCollapsed: () => boolean
  isFooterVisible: () => boolean
  isInfobarVisible: () => boolean

  setTheme: (theme: Theme) => void
  setPageExpanded: (pageExpanded: PageExpanded) => void
  setSidebarCollapsed: (sidebarCollapsed: SidebarCollapsed) => void
  setFooterVisible: (footerVisible: FooterVisible) => void
  setInfobarVisible: (infobarVisible: InfobarVisible) => void

  toggleTheme: () => void
  togglePageExpanded: () => void
  toggleSidebarCollapsed: () => void
  toggleFooterVisible: () => void
  toggleInfobarVisible: () => void
}

/**
 * Установить атрибут для body
 * @namespace Layouts.Lucent.Context.setBodyAttribute
 * @param {string} attribute - атрибут
 * @param {string} value - значение
 * @returns {string} значение атрибута
 */
const setBodyAttribute = (attribute: string, value: string): string => {
  document.body.removeAttribute(attribute)
  document.body.setAttribute(attribute, value)

  return document.body.getAttribute(attribute) || ""
}

/**
 * Установить тему
 * @namespace Layouts.Lucent.Context.setLayoutTheme
 * @param {string} theme - тема
 */
export const setLayoutTheme = (theme: Theme) => setBodyAttribute("data-theme", theme)

/**
 * Установить состояние раскрытости страницы
 * @namespace Layouts.Lucent.Context.setLayoutPageExpanded
 * @param {PageExpanded} expanded - состояние раскрытости страницы
 */
export const setLayoutPageExpanded = (expanded: PageExpanded) => setBodyAttribute("data-page-expanded", expanded)

/**
 * Установить состояние сайдбара
 * @namespace Layouts.Lucent.Context.setLayoutSidebarCollapsed
 * @param {SidebarCollapsed} collapsed - состояние сайдбара
 */
export const setLayoutSidebarCollapsed = (collapsed: SidebarCollapsed) => {
  setBodyAttribute("data-sidebar-collapsed", collapsed)
}

/**
 * Установить состояние футера
 * @namespace Layouts.Lucent.Context.setLayoutFooterVisible
 * @param {FooterVisible} visible - состояние футера
 */
export const setLayoutFooterVisible = (visible: FooterVisible) => setBodyAttribute("data-footer-visible", visible)

/**
 * Установить состояние инфобара
 * @namespace Layouts.Lucent.Context.setLayoutInfobarVisible
 * @param {InfobarVisible} visible - состояние инфобара
 */
export const setLayoutInfobarVisible = (visible: InfobarVisible) => setBodyAttribute("data-infobar-visible", visible)

/**
 * Контекст макета
 * @namespace Layouts.Lucent.Context
 */
export const LayoutContext = createContext<ILayoutContext | null>(null)
