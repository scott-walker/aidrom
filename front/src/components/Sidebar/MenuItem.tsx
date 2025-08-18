import type { ComponentProps, FC, JSX } from "react"
import { mergeClasses } from "@utils/jsxtools"

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
 * Функция для создания CSS класса для пункта меню
 * @namespace Sidebar.MenuItem.makeClasses
 * @param className - CSS классы
 * @returns {string} классы для пункта меню
 */
const makeClasses = (className: string = ""): string => {
  return mergeClasses(
    "group/menu-item",
    "relative",
    className
  )
}

/**
 * Компонент пункт меню
 * @namespace Sidebar.MenuItem
 * @type {Constructor}
 * @param Props.className - CSS классы
 * @param Props.props - пропсы для компонента
 * @returns {Component} компонент SidebarMenuItem
 */
const SidebarMenuItem: Constructor = ({ className, ...props }: Props): Component => {
  const classes = makeClasses(className || "")

  return <li data-slot="sidebar-menu-item" data-sidebar="menu-item" className={classes} {...props} />
}

export default SidebarMenuItem
