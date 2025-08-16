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
  return mergeClasses("flex", "h-full", "w-full", "flex-col", className)
}

/**
 * Функция для создания класса для заголовка
 * @namespace Sidebar.Assets.makeSheetHeaderClass
 * @param className - CSS классы
 * @returns {string} классы для заголовка
 */
export const makeSheetHeaderClass = (className: string = ""): string => {
  return mergeClasses("sr-only", className)
}

/**
 * Функция для создания класса для корневого элемента
 * @namespace Sidebar.Assets.makeSidebarRootClass
 * @param className - CSS классы
 * @returns {string} классы для корневого элемента
 */
export const makeSidebarRootClass = (className: string = ""): string => {
  return mergeClasses("group", "peer", "text-sidebar-foreground", "hidden", "md:block", className)
}

/**
 * Функция для создания класса для пробела на десктопе
 * @namespace Sidebar.Assets.makeSidebarGapClass
 * @param variant - вариант сайдбара
 * @param className - CSS классы
 * @returns {string} классы для пробела
 */
export const makeSidebarGapClass = (variant: string, className: string = ""): string => {
  let variantClass = "group-data-[collapsible=icon]:w-(--sidebar-width-icon)"

  if (variant === "floating" || variant === "inset") {
    variantClass = "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
  }

  return mergeClasses(
    "relative",
    "w-(--sidebar-width)",
    "bg-transparent",
    "transition-[width]",
    "duration-200",
    "ease-linear",
    "group-data-[collapsible=offcanvas]:w-0",
    "group-data-[side=right]:rotate-180",
    variantClass,
    className
  )
}

/**
 * Функция для создания класса для контейнера
 * @namespace Sidebar.Assets.makeSidebarContainerClass
 * @param side - сторона
 * @param variant - вариант
 * @param className - CSS классы
 * @returns {string} классы для контейнера
 */
export const makeSidebarContainerClass = (side: string, variant: string, className: string = ""): string => {
  let sideClass = mergeClasses("right-0", "group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]")

  if (side === "left") {
    sideClass = mergeClasses("left-0", "group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]")
  }

  let variantClass = mergeClasses(
    "group-data-[collapsible=icon]:w-(--sidebar-width-icon)",
    "group-data-[side=left]:border-r",
    "group-data-[side=right]:border-l"
  )

  if (variant === "floating" || variant === "inset") {
    variantClass = mergeClasses(
      "p-2",
      "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
    )
  }

  return mergeClasses(
    "fixed",
    "inset-y-0",
    "z-10",
    "hidden",
    "h-svh",
    "w-(--sidebar-width)",
    "transition-[left,right,width]",
    "duration-200",
    "ease-linear",
    "md:flex",
    sideClass,
    variantClass,
    className
  )
}

/**
 * Функция для создания класса для внутреннего контейнера
 * @namespace Sidebar.Assets.makeSidebarInnerClass
 * @param className - CSS классы
 * @returns {string} классы для внутреннего контейнера
 */
export const makeSidebarInnerClass = (className: string = ""): string => {
  return mergeClasses(
    "bg-sidebar",
    "group-data-[variant=floating]:border-sidebar-border",
    "flex",
    "h-full",
    "w-full",
    "flex-col",
    "group-data-[variant=floating]:rounded-lg",
    "group-data-[variant=floating]:border",
    "group-data-[variant=floating]:shadow-sm",
    className
  )
}
