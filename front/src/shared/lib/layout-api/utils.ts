import { SIDEBAR_MODE_BASE, THEME_MODE_DARK, THEME_MODE_LIGHT } from "@scottwalker/lucent"
import { SIDEBAR_MODE_COLLAPSED } from "@scottwalker/lucent"
import { useEffect } from "react"
import type { LayoutContextApi } from "./types"
import { useLayout } from "./context"

/**
 * Установить темную тему макета
 * @namespace Shared.Lib.LayoutApi.Utils.setLayoutDarkTheme
 */
export const setLayoutDarkTheme = (isDark: boolean) => {
  document.body.classList.toggle("theme-dark", isDark)
  localStorage.setItem("layout.theme", isDark ? THEME_MODE_DARK : THEME_MODE_LIGHT)
}

/**
 * Установить режим свернутого сайдбара
 * @namespace Shared.Lib.LayoutApi.Utils.setLayoutCollapsedSidebar
 */
export const setLayoutCollapsedSidebar = (isCollapsed: boolean) => {
  document.body.classList.toggle("sidebar-collapsed", isCollapsed)
  localStorage.setItem("layout.sidebar", isCollapsed ? SIDEBAR_MODE_COLLAPSED : SIDEBAR_MODE_BASE)
}

/**
 * Получить тему макета
 * @namespace Shared.Lib.LayoutApi.Utils.getLayoutTheme
 */
export const getLayoutTheme = (): string => localStorage.getItem("layout.theme") || THEME_MODE_LIGHT

/**
 * Получить режим сайдбара
 * @namespace Shared.Lib.LayoutApi.Utils.getLayoutSidebar
 */
export const getLayoutSidebar = (): string => localStorage.getItem("layout.sidebar") || SIDEBAR_MODE_BASE

/**
 * Хук для установки заголовка страницы
 * @namespace Shared.Lib.LayoutApi.Utils.useTitle
 */
export const useTitle = (title: string, subtitle?: string) => {
  const { setTitle, setSubtitle } = useLayout() as LayoutContextApi

  useEffect(() => {
    setTitle(title)
    if (subtitle) setSubtitle(subtitle)

    return () => {
      setTitle("")
      if (subtitle) setSubtitle("")
    }
  }, [title, subtitle, setTitle, setSubtitle])
}

/**
 * Хук для установки заголовка страницы
 * @namespace Shared.Lib.LayoutApi.Utils.useSubtitle
 */
export const useSubtitle = (subtitle: string) => {
  const { setSubtitle } = useLayout() as LayoutContextApi

  useEffect(() => {
    setSubtitle(subtitle)

    return () => setSubtitle("")
  }, [subtitle, setSubtitle])
}
