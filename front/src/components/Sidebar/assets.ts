import { createContext, type CSSProperties } from "react"
import { makeVariants, mergeClasses } from "@utils/jsxtools"

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

/**
 * Функция для создания класса для триггера
 * @namespace Sidebar.Assets.makeSidebarTriggerClass
 * @param className - CSS классы
 * @returns {string} классы для триггера
 */
export const makeSidebarTriggerClass = (className: string = ""): string => {
  return mergeClasses(
    "size-7",
    className
  )
}

/**
 * Функция для создания класса для внутреннего контейнера
 * @namespace Sidebar.Assets.makeSidebarTriggerInnerClass
 * @param className - CSS классы
 * @returns {string} классы для внутреннего контейнера
 */
export const makeSidebarTriggerInnerClass = (className: string = ""): string => {
  return mergeClasses(
    "sr-only",
    className
  )
}

/**
 * Функция для создания класса для рельса
 * @namespace Sidebar.Assets.makeSidebarRailClass
 * @param className - CSS классы
 * @returns {string} классы для рельса
 */
export const makeSidebarRailClass = (className: string = ""): string => {
  return mergeClasses(
    "hover:after:bg-sidebar-border",
    "absolute",
    "inset-y-0",
    "z-20",
    "hidden",
    "w-4",
    "-translate-x-1/2",
    "transition-all",
    "ease-linear",
    "group-data-[side=left]:-right-4",
    "group-data-[side=right]:left-0",
    "after:absolute",
    "after:inset-y-0",
    "after:left-1/2",
    "after:w-[2px]",
    "sm:flex",
    "in-data-[side=left]:cursor-w-resize",
    "in-data-[side=right]:cursor-e-resize",
    "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize",
    "[[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
    "hover:group-data-[collapsible=offcanvas]:bg-sidebar",
    "group-data-[collapsible=offcanvas]:translate-x-0",
    "group-data-[collapsible=offcanvas]:after:left-full",
    "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
    "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
    className
  )
} 

/**
 * Функция для создания класса для контейнера inset
 * @namespace Sidebar.Assets.makeSidebarInsetClass
 * @param className - CSS классы
 * @returns {string} классы для контейнера inset
 */
export const makeSidebarInsetClass = (className: string = ""): string => {
  return mergeClasses(
    "bg-background",
    "relative",
    "flex",
    "w-full",
    "flex-1",
    "flex-col",
    "md:peer-data-[variant=inset]:m-2",
    "md:peer-data-[variant=inset]:ml-0",
    "md:peer-data-[variant=inset]:rounded-xl",
    "md:peer-data-[variant=inset]:shadow-sm",
    "md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
    className
  )
}

/**
 * Функция для создания CSS класса для инпута
 * @namespace Sidebar.Assets.makeSidebarInputClass
 * @param className - CSS классы
 * @returns {string} классы для инпута
 */
export const makeSidebarInputClass = (className: string = ""): string => {
  return mergeClasses(
    "bg-background",
    "h-8",
    "w-full",
    "shadow-none",
    className
  )
}

/**
 * Функция для создания CSS класса для хедера
 * @namespace Sidebar.Assets.makeSidebarHeaderClass
 * @param className - CSS классы
 * @returns {string} классы для хедера
 */
export const makeSidebarHeaderClass = (className: string = ""): string => {
  return mergeClasses(
    "flex",
    "flex-col",
    "gap-2",
    "p-2",
    className
  )
}

/**
 * Функция для создания CSS класса для футера
 * @namespace Sidebar.Assets.makeSidebarFooterClass
 * @param className - CSS классы
 * @returns {string} классы для футера
 */
export const makeSidebarFooterClass = (className: string = ""): string => {
  return mergeClasses(
    "flex",
    "flex-col",
    "gap-2",
    "p-2",
    className
  )
}

/**
 * Функция для создания CSS класса для разделителя
 * @namespace Sidebar.Assets.makeSidebarSeparatorClass
 * @param className - CSS классы
 * @returns {string} классы для разделителя
 */
export const makeSidebarSeparatorClass = (className: string = ""): string => {
  return mergeClasses(
    "bg-sidebar-border",
    "mx-2",
    "w-auto",
    className
  )
}

/**
 * Функция для создания CSS класса для контента
 * @namespace Sidebar.Assets.makeSidebarContentClass
 * @param className - CSS классы
 * @returns {string} классы для контента
 */
export const makeSidebarContentClass = (className: string = ""): string => {
  return mergeClasses(
    "flex",
    "min-h-0",
    "flex-1",
    "flex-col",
    "gap-2",
    "overflow-auto",
    "group-data-[collapsible=icon]:overflow-hidden",
    className
  )
}

/**
 * Функция для создания CSS класса для группы
 * @namespace Sidebar.Assets.makeSidebarGroupClass
 * @param className - CSS классы
 * @returns {string} классы для группы
 */
export const makeSidebarGroupClass = (className: string = ""): string => {
  return mergeClasses(
    "relative",
    "flex",
    "w-full",
    "min-w-0",
    "flex-col",
    "p-2",
    className
  )
}

/**
 * Функция для создания CSS класса для лейбла группы
 * @namespace Sidebar.Assets.makeSidebarGroupLabelClass
 * @param className - CSS классы
 * @returns {string} классы для лейбла группы
 */
export const makeSidebarGroupLabelClass = (className: string = ""): string => {
  return mergeClasses(
    "text-sidebar-foreground/70",
    "ring-sidebar-ring",
    "flex",
    "h-8",
    "shrink-0",
    "items-center",
    "rounded-md",
    "px-2",
    "text-xs",
    "font-medium",
    "outline-hidden",
    "transition-[margin,opacity]",
    "duration-200",
    "ease-linear",
    "focus-visible:ring-2",
    "[&>svg]:size-4",
    "[&>svg]:shrink-0",
    "group-data-[collapsible=icon]:-mt-8",
    "group-data-[collapsible=icon]:opacity-0",
    className
  )
}

/**
 * Функция для создания CSS класса для действия группы 
 * @namespace Sidebar.Assets.makeSidebarGroupActionClass
 * @param className - CSS классы
 * @returns {string} классы для действия группы
 */
export const makeSidebarGroupActionClass = (className: string = ""): string => {
  return mergeClasses(
    "text-sidebar-foreground",
    "ring-sidebar-ring",
    "hover:bg-sidebar-accent",
    "hover:text-sidebar-accent-foreground",
    "absolute",
    "top-3.5",
    "right-3",
    "flex",
    "aspect-square",
    "w-5",
    "items-center",
    "justify-center",
    "rounded-md",
    "p-0",
    "outline-hidden",
    "transition-transform",
    "focus-visible:ring-2",
    "[&>svg]:size-4",
    "[&>svg]:shrink-0",
    "after:absolute",
    "after:-inset-2",
    "md:after:hidden",
    "group-data-[collapsible=icon]:hidden",
    className
  )
}

/**
 * Функция для создания CSS класса для контента группы
 * @namespace Sidebar.Assets.makeSidebarGroupContentClass
 * @param className - CSS классы
 * @returns {string} классы для контента группы
 */
export const makeSidebarGroupContentClass = (className: string = ""): string => {
  return mergeClasses(
    "w-full",
    "text-sm",
    className
  )
}

/**
 * Функция для создания CSS класса для меню
 * @namespace Sidebar.Assets.makeSidebarMenuClass
 * @param className - CSS классы
 * @returns {string} классы для меню
 */
export const makeSidebarMenuClass = (className: string = ""): string => {
  return mergeClasses(
    "flex",
    "w-full",
    "min-w-0",
    "flex-col",
    "gap-1",
    className
  )
}

/**
 * Функция для создания CSS класса для пункта меню
 * @namespace Sidebar.Assets.makeSidebarMenuItemClass
 * @param className - CSS классы
 * @returns {string} классы для пункта меню
 */
export const makeSidebarMenuItemClass = (className: string = ""): string => {
  return mergeClasses(
    "group/menu-item",
    "relative",
    className
  )
}

/**
 * Функция для создания CSS класса (варианты) для кнопки меню
 * @namespace Sidebar.Assets.makeSidebarMenuButtonVariants
 * @param className - CSS классы
 */
export const makeSidebarMenuButtonVariants = () => {
  const baseClasses = mergeClasses(
    "peer/menu-button",
    "flex",
    "w-full",
    "items-center",
    "gap-2",
    "overflow-hidden",
    "rounded-md",
    "p-2",
    "text-left",
    "text-sm",
    "outline-hidden",
    "ring-sidebar-ring",
    "transition-[width,height,padding]",
    "hover:bg-sidebar-accent",
    "hover:text-sidebar-accent-foreground",
    "focus-visible:ring-2",
    "active:bg-sidebar-accent",
    "active:text-sidebar-accent-foreground",
    "disabled:pointer-events-none",
    "disabled:opacity-50",
    "group-has-data-[sidebar=menu-action]/menu-item:pr-8",
    "aria-disabled:pointer-events-none",
    "aria-disabled:opacity-50",
    "data-[active=true]:bg-sidebar-accent",
    "data-[active=true]:font-medium",
    "data-[active=true]:text-sidebar-accent-foreground",
    "data-[state=open]:hover:bg-sidebar-accent",
    "data-[state=open]:hover:text-sidebar-accent-foreground",
    "group-data-[collapsible=icon]:size-8!",
    "group-data-[collapsible=icon]:p-2!",
    "[&>span:last-child]:truncate",
    "[&>svg]:size-4",
    "[&>svg]:shrink-0",
  )

  return makeVariants(baseClasses, {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline:
          "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  })
}

/**
 * Функция для создания CSS класса для действия меню
 * @namespace Sidebar.Assets.makeSidebarMenuActionClass
 * @param showOnHover - флаг, определяющий, что действие отображается при наведении
 * @param className - CSS классы
 * @returns {string} классы для действия меню
 */
export const makeSidebarMenuActionClass = (showOnHover: boolean, className: string = ""): string => {
  if (showOnHover) {
    className += mergeClasses(
      "peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
      "group-focus-within/menu-item:opacity-100",
      "group-hover/menu-item:opacity-100",
      "data-[state=open]:opacity-100",
      "md:opacity-0"
    )
  }

  return mergeClasses(
    "text-sidebar-foreground",
    "ring-sidebar-ring",
    "hover:bg-sidebar-accent",
    "hover:text-sidebar-accent-foreground",
    "peer-hover/menu-button:text-sidebar-accent-foreground",
    "absolute",
    "top-1.5",
    "right-1",
    "flex",
    "aspect-square",
    "w-5",
    "items-center",
    "justify-center",
    "rounded-md",
    "p-0",
    "outline-hidden",
    "transition-transform",
    "focus-visible:ring-2",
    "[&>svg]:size-4",
    "[&>svg]:shrink-0",
    "after:absolute",
    "after:-inset-2",
    "md:after:hidden",
    "peer-data-[size=sm]/menu-button:top-1",
    "peer-data-[size=default]/menu-button:top-1.5",
    "peer-data-[size=lg]/menu-button:top-2.5",
    "group-data-[collapsible=icon]:hidden",
    className
  )
}

/**
 * Функция для создания CSS класса для бейджа меню
 * @namespace Sidebar.Assets.makeSidebarMenuBadgeClass
 * @param className - CSS классы
 * @returns {string} классы для бейджа меню
 */
export const makeSidebarMenuBadgeClass = (className: string = ""): string => {
  return mergeClasses(
    "text-sidebar-foreground",
    "pointer-events-none",
    "absolute",
    "right-1",
    "flex",
    "h-5",
    "min-w-5",
    "items-center",
    "justify-center",
    "rounded-md",
    "px-1",
    "text-xs",
    "font-medium",
    "tabular-nums",
    "select-none",
    "peer-hover/menu-button:text-sidebar-accent-foreground",
    "peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
    "peer-data-[size=sm]/menu-button:top-1",
    "peer-data-[size=default]/menu-button:top-1.5",
    "peer-data-[size=lg]/menu-button:top-2.5",
    "group-data-[collapsible=icon]:hidden",
    className
  )
} 
