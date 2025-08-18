import type { ComponentProps, FC, JSX } from "react"
import { mergeClasses } from "@utils/jsxtools"

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
 * Функция для создания CSS класса для меню
 * @namespace Sidebar.Menu.makeClasses
 * @param className - CSS классы
 * @returns {string} классы для меню
 */
const makeClasses = (className: string = ""): string => {
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
 * Компонент меню
 * @namespace Sidebar.Menu
 * @type {Constructor}
 * @param Props.className - CSS классы
 * @param Props.props - пропсы для компонента
 * @returns {Component} компонент SidebarMenu
 */
const SidebarMenu: Constructor = ({ className, ...props }: Props): Component => {
  const classes = makeClasses(className || "")

  return <ul data-slot="sidebar-menu" data-sidebar="menu" className={classes} {...props} />
}

export default SidebarMenu
