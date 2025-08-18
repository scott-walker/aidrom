import type { ComponentProps, FC, JSX } from "react"
import { mergeClasses } from "@utils/jsxtools"

/**
 * Пропсы
 * @namespace Sidebar.Group.Props
 */
type Props = ComponentProps<"div">

/**
 * Конструктор
 * @namespace Sidebar.Group.Constructor
 */
type Constructor = FC<Props>

/**
 * Компонент
 * @namespace Sidebar.Group.Component
 */
type Component = JSX.Element

/**
 * Функция для создания CSS класса для группы
 * @namespace Sidebar.Group.makeClasses
 * @param className - CSS классы
 * @returns {string} классы для группы
 */
const makeClasses = (className: string = ""): string => {
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
 * Компонент группа
 * @namespace Sidebar.Group
 * @type {Constructor}
 * @param Props.className - CSS классы
 * @param Props.props - пропсы для компонента
 * @returns {Component} компонент SidebarGroup
 */
const SidebarGroup: Constructor = ({ className, ...props }: Props): Component => {
  const sidebarGroupClass = makeClasses(className || "")

  return <div data-slot="sidebar-group" data-sidebar="group" className={sidebarGroupClass} {...props} />
}

export default SidebarGroup
