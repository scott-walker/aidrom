import type { ComponentProps, FC, JSX } from "react"
import { makeSidebarMenuClass } from "./assets"

/**
 * Пропсы
 * @namespace Sidebar.Menu.Props
 */
type Props = ComponentProps<"ul">

/**
 * Конструктор
 * @namespace Sidebar.Menu.Constructor
 */
type Constructor = FC<Props>

/**
 * Компонент
 * @namespace Sidebar.Menu.Component
 */
type Component = JSX.Element

/**
 * Компонент меню
 * @namespace Sidebar.Menu
 * @type {Constructor}
 * @param Props.className - CSS классы
 * @param Props.props - пропсы для компонента
 * @returns {Component} компонент SidebarMenu
 */
const SidebarMenu: Constructor = ({ className, ...props }: Props): Component => {
  const classes = makeSidebarMenuClass(className || "")

  return <ul data-slot="sidebar-menu" data-sidebar="menu" className={classes} {...props} />
}

export default SidebarMenu
