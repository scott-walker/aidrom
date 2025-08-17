import type { ComponentProps, FC, JSX } from "react"
import { makeSidebarMenuBadgeClass } from "./assets"

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
 * Компонент бейджа меню
 * @namespace Sidebar.MenuBadge
 * @type {Constructor}
 * @param Props.className - CSS классы
 * @param Props.props - пропсы для компонента
 * @returns {Component} элемент компонента бейджа меню
 */
const SidebarMenuBadge: Constructor = ({ className, ...props }: Props): Component => {
  const classes = makeSidebarMenuBadgeClass(className || "")

  return <div data-slot="sidebar-menu-badge" data-sidebar="menu-badge" className={classes} {...props} />
}

export default SidebarMenuBadge
