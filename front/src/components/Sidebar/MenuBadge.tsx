import type { ComponentProps, FC, JSX } from "react"
import { mergeClasses } from "@utils/jsxtools"

/**
 * Пропсы
 * @namespace Sidebar.MenuBadge.Props
 */
type Props = ComponentProps<"div">
/**
 * Конструктор
 * @namespace Sidebar.MenuBadge.Constructor
 */
type Constructor = FC<Props>

/**
 * Компонент
 * @namespace Sidebar.MenuBadge.Component
 */
type Component = JSX.Element

/**
 * Функция для создания CSS класса для бейджа меню
 * @namespace Sidebar.MenuBadge.makeClasses
 * @param className - CSS классы
 * @returns {string} классы для бейджа меню
 */
const makeClasses = (className: string = ""): string => {
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

/**
 * Компонент бейджа меню
 * @namespace Sidebar.MenuBadge
 * @type {Constructor}
 * @param Props.className - CSS классы
 * @param Props.props - пропсы для компонента
 * @returns {Component} элемент компонента бейджа меню
 */
const SidebarMenuBadge: Constructor = ({ className, ...props }: Props): Component => {
  const classes = makeClasses(className || "")

  return <div data-slot="sidebar-menu-badge" data-sidebar="menu-badge" className={classes} {...props} />
}

export default SidebarMenuBadge
