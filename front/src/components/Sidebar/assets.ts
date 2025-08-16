import { createContext, type CSSProperties } from "react"
import { mergeClasses } from "@utils/jsxtools"

/**
 * Пропсы для контекста Sidebar
 * @namespace Sidebar.Assets.SidebarContextProps
 */
export type SidebarContextProps = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

/**
 * Контекст для сайдбара
 * @namespace Sidebar.Assets.SidebarContext
 */
export const SidebarContext = createContext<SidebarContextProps | null>(null)

/**
 * Функция для создания класса для контейнера
 * @namespace Sidebar.Assets.makeProviderClass
 * @param className - CSS классы
 * @returns {string} классы для контейнера
 */
export const makeProviderClass = (className: string = ""): string => {
  return mergeClasses(
    "group/sidebar-wrapper",
    "has-data-[variant=inset]:bg-sidebar",
    "flex",
    "min-h-svh",
    "w-full",
    className
  )
}

/**
 * Функция для создания стилей для контейнера
 * @namespace Sidebar.Assets.makeProviderStyle
 * @param style - внешние стили
 * @returns {CSSProperties} стили для контейнера
 */
export const makeProviderStyle = (style: CSSProperties = {}): CSSProperties => {
  const SIDEBAR_WIDTH = "18rem"
  const SIDEBAR_WIDTH_ICON = "3rem"

  return {
    "--sidebar-width": SIDEBAR_WIDTH,
    "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
    ...style
  } as CSSProperties
}

/**
 * Функция для создания класса для сайдбара
 * @namespace Sidebar.Assets.makeNotCollapsibleSidebarClass
 * @param className - CSS классы
 * @returns {string} классы для сайдбара
 */
export const makeNotCollapsibleSidebarClass = (className: string = ""): string => {
  return mergeClasses(
    "bg-sidebar",
    "text-sidebar-foreground",
    "flex",
    "h-full",
    "w-(--sidebar-width)",
    "flex-col",
    className
  )
}

/**
 * Функция для создания класса для контента
 * @namespace Sidebar.Assets.makeSheetContentClass
 * @param className - CSS классы
 * @returns {string} классы для контента
 */
export const makeSheetContentClass = (className: string = ""): string => {
  return mergeClasses(
    "bg-sidebar",
    "text-sidebar-foreground",
    "flex",
    "h-full",
    "w-(--sidebar-width)",
    "flex-col",
    className
  )
}

/**
 * Функция для создания стилей для контента
 * @namespace Sidebar.Assets.makeSheetContentStyle
 * @param style - внешние стили
 * @returns {CSSProperties} стили для контента
 */
export const makeSheetContentStyle = (style: CSSProperties = {}): CSSProperties => {
  const SIDEBAR_WIDTH_MOBILE = "18rem"

  return {
    "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
    ...style
  } as CSSProperties
}

/**
 * Функция для создания класса для контейнера в контенте
 * @namespace Sidebar.Assets.makeSheetContentInnerClass
 * @param className - CSS классы
 * @returns {string} классы для контента
 */
export const makeSheetContentInnerClass = (className: string = ""): string => {
  return mergeClasses(
    "flex",
    "h-full",
    "w-full",
    "flex-col",
    className
  )
}

/**
 * Функция для создания класса для заголовка
 * @namespace Sidebar.Assets.makeSheetHeaderClass
 * @param className - CSS классы
 * @returns {string} классы для заголовка
 */
export const makeSheetHeaderClass = (className: string = ""): string => {
  return mergeClasses(
    "sr-only",
    className
  )
}
