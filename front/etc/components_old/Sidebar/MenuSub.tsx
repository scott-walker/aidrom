import type { ComponentProps, FC, JSX } from "react"
import { mergeClasses } from "@utils/jsxtools"

/**
 * Пропсы
 * @namespace Sidebar.MenuSub.Props
 */
type Props = ComponentProps<"ul">

/**
 * Конструктор
 * @namespace Sidebar.MenuSub.Constructor
 */
type Constructor = FC<Props>

/**
 * Компонент
 * @namespace Sidebar.MenuSub.Component
 */
type Component = JSX.Element

/**
 * Функция для создания CSS класса для подменю
 * @namespace Sidebar.MenuSub.makeClasses
 * @param className - CSS классы
 * @returns {string} классы для подменю
 */
const makeClasses = (className: string = ""): string => {
  return mergeClasses(
    "border-sidebar-border",
    "mx-3.5",
    "flex",
    "min-w-0",
    "translate-x-px",
    "flex-col",
    "gap-1",
    "border-l",
    "px-2.5",
    "py-0.5",
    "group-data-[collapsible=icon]:hidden",
    className
  )
}

/**
 * Компонент подменю
 * @namespace Sidebar.MenuSub
 * @type {Constructor}
 * @param Props.className - CSS классы
 * @param Props.props - пропсы для компонента
 * @returns {Component} элемент компонента подменю
 */
const SidebarMenuSub: Constructor = ({ className, ...props }: Props): Component => {
  const classes = makeClasses(className || "")

  return <ul data-slot="sidebar-menu-sub" data-sidebar="menu-sub" className={classes} {...props} />
}

export default SidebarMenuSub
