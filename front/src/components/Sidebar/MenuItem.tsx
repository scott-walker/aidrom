import type { ComponentProps, FC, JSX } from "react"
import { makeSidebarMenuItemClass } from "./assets"

/**
 * Пропсы
 * @namespace Sidebar.MenuItem.Props
 */
type Props = ComponentProps<"li">

/**
 * Конструктор
 * @namespace Sidebar.MenuItem.Constructor
 */
type Constructor = FC<Props>

/**
 * Компонент
 * @namespace Sidebar.MenuItem.Component
 */
type Component = JSX.Element

/**
 * Компонент пункт меню
 * @namespace Sidebar.MenuItem
 * @type {Constructor}
 * @param Props.className - CSS классы
 * @param Props.props - пропсы для компонента
 * @returns {Component} компонент SidebarMenuItem
 */
const SidebarMenuItem: Constructor = ({ className, ...props }: Props): Component => {
  const classes = makeSidebarMenuItemClass(className || "")

  return <li data-slot="sidebar-menu-item" data-sidebar="menu-item" className={classes} {...props} />
}

export default SidebarMenuItem
