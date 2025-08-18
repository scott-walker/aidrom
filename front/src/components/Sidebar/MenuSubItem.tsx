import type { ComponentProps, FC, JSX } from "react"
import { mergeClasses } from "@utils/jsxtools"

/**
 * Пропсы
 * @namespace Sidebar.MenuSubItem.Props
 */
type Props = ComponentProps<"li">

/**
 * Конструктор
 * @namespace Sidebar.MenuSubItem.Constructor
 */
type Constructor = FC<Props>

/**
 * Компонент
 * @namespace Sidebar.MenuSubItem.Component
 */
type Component = JSX.Element

/**
 * Функция для создания CSS класса для пункта подменю
 * @namespace Sidebar.MenuSubItem.makeClasses
 * @param className - CSS классы
 * @returns {string} классы для пункта подменю
 */
const makeClasses = (className: string = ""): string => {
  return mergeClasses("group/menu-sub-item", "relative", className)
}

/**
 * Компонент пункта подменю
 * @namespace Sidebar.MenuSubItem
 * @type {Constructor}
 * @param Props.className - CSS классы
 * @param Props.props - пропсы для компонента
 * @returns {Component} элемент компонента пункта подменю
 */
const SidebarMenuSubItem: Constructor = ({ className, ...props }: Props): Component => {
  const classes = makeClasses(className || "")

  return <li data-slot="sidebar-menu-sub-item" data-sidebar="menu-sub-item" className={classes} {...props} />
}

export default SidebarMenuSubItem
