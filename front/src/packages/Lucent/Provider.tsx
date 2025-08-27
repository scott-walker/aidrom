import { useState, type FC, type ReactNode } from "react"
import type {
  ProviderProps,
  LayoutApi,
  LayoutModes,
  LayoutSlots,
  LayoutMode,
  LayoutModeValue,
  LayoutSlot,
  LayoutSlotValue,
  SidebarSlots,
  SidebarSlot
} from "./types"
import {
  FOOTER_MODE_HIDDEN,
  FOOTER_MODE_VISIBLE,
  INFOBAR_MODE_HIDDEN,
  INFOBAR_MODE_VISIBLE,
  PAGE_MODE_DEFAULT,
  PAGE_MODE_EXPANDED,
  SIDEBAR_MODE_COLLAPSED,
  SIDEBAR_MODE_EXPANDED,
  THEME_MODE_LIGHT,
  THEME_MODE_DARK
} from "./constants"
import { LayoutContext } from "./context"
import { normalizeConfig } from "./utils"

/**
 * Провайдер макета
 * @namespace Lucent.Provider
 * @param {ProviderProps.children} props.children - контент макета
 * @param {ProviderProps.config} props.config - конфигурация макета
 * @returns {ReactNode}
 */
export const Provider: FC<ProviderProps> = ({ children, config }: ProviderProps): ReactNode => {
  const defaultConfig = normalizeConfig(config)

  const [modes, setModes] = useState<LayoutModes>(defaultConfig.modes)
  const [slots, setSlots] = useState<LayoutSlots>(defaultConfig.slots)

  /**
   * Установить режим
   * @param {LayoutMode} mode - название режима
   * @param {LayoutModeValue} value - значение режима
   */
  const setMode = (mode: LayoutMode, value: LayoutModeValue) => {
    setModes(prev => ({ ...prev, [mode]: value }))
  }

  /**
   * Установить слот
   * @param {LayoutSlot} slot - название слота
   * @param {LayoutSlotValue} value - значение слота
   */
  const setSlot = (slot: LayoutSlot, value: LayoutSlotValue) => {
    setSlots(prev => ({ ...prev, [slot]: value }))
  }

  /**
   * Установить слоты для сайдбара
   * @param {SidebarSlots} slots - слоты боковой панели
   */
  const setSidebarSlots = (slots: SidebarSlots) => {
    setSlots(prev => ({ ...prev, sidebar: slots }))
  }

  /**
   * Установить слот для сайдбара
   * @param {SidebarSlot} slot - название слота
   * @param {ReactNode} value - значение слота
   */
  const setSidebarSlot = (slot: SidebarSlot, value: ReactNode) => {
    setSidebarSlots({ ...slots.sidebar, [slot]: value })
  }

  /**
   * Получить режим макета
   * @param {LayoutMode} mode - название режима
   * @returns {LayoutModeValue} - значение режима
   */
  const getMode = (mode: LayoutMode): LayoutModeValue => modes[mode] ?? null

  /**
   * Получить слот макета
   * @param {LayoutSlot} slot - название слота
   * @returns {LayoutSlotValue} - значение слота
   */
  const getSlot = (slot: LayoutSlot): LayoutSlotValue => slots[slot] ?? null

  /**
   * Получить слот сайдбара
   * @param {SidebarSlot} slot - название слота
   * @returns {ReactNode} - значение слота
   */
  const getSidebarSlot = (slot: SidebarSlot): ReactNode => slots.sidebar?.[slot] ?? null

  // Проверки режимов макета
  const isThemeLight = () => modes.theme === THEME_MODE_LIGHT
  const isThemeDark = () => modes.theme === THEME_MODE_DARK
  const isSidebarCollapsed = () => modes.sidebar === SIDEBAR_MODE_COLLAPSED
  const isSidebarExpanded = () => modes.sidebar === SIDEBAR_MODE_EXPANDED
  const isPageDefault = () => modes.page === PAGE_MODE_DEFAULT
  const isPageExpanded = () => modes.page === PAGE_MODE_EXPANDED
  const isFooterVisible = () => modes.footer === FOOTER_MODE_VISIBLE
  const isFooterHidden = () => modes.footer === FOOTER_MODE_HIDDEN
  const isInfobarVisible = () => modes.infobar === INFOBAR_MODE_VISIBLE
  const isInfobarHidden = () => modes.infobar === INFOBAR_MODE_HIDDEN

  // Переключатели режимов макета
  const toggleThemeMode = () => setMode("theme", isThemeLight() ? THEME_MODE_DARK : THEME_MODE_LIGHT)
  const toggleSidebarMode = () => {
    setMode("sidebar", isSidebarCollapsed() ? SIDEBAR_MODE_EXPANDED : SIDEBAR_MODE_COLLAPSED)
  }
  const togglePageMode = () => setMode("page", isPageDefault() ? PAGE_MODE_EXPANDED : PAGE_MODE_DEFAULT)
  const toggleFooterMode = () => setMode("footer", isFooterVisible() ? FOOTER_MODE_HIDDEN : FOOTER_MODE_VISIBLE)
  const toggleInfobarMode = () => setMode("infobar", isInfobarVisible() ? INFOBAR_MODE_HIDDEN : INFOBAR_MODE_VISIBLE)

  // API макета
  const api: LayoutApi = {
    modes,
    slots,
    setModes,
    setMode,
    setSlots,
    setSlot,
    setSidebarSlots,
    setSidebarSlot,
    getMode,
    getSlot,
    getSidebarSlot,
    isThemeLight,
    isThemeDark,
    isSidebarCollapsed,
    isSidebarExpanded,
    isPageDefault,
    isPageExpanded,
    isFooterVisible,
    isFooterHidden,
    isInfobarVisible,
    isInfobarHidden,
    toggleThemeMode,
    toggleSidebarMode,
    togglePageMode,
    toggleFooterMode,
    toggleInfobarMode
  }

  return <LayoutContext.Provider value={api}>{children}</LayoutContext.Provider>
}
