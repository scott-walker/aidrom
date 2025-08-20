import type { ComponentProps, FC, JSX } from "react"
import { mergeClasses } from "@utils/jsxtools"

/**
 * Пропсы
 * @namespace Sidebar.Content.Props
 */
type Props = ComponentProps<"div">

/**
 * Конструктор
 * @namespace Sidebar.Content.Constructor
 */
type Constructor = FC<Props>

/**
 * Компонент
 * @namespace Sidebar.Content.Component
 */
type Component = JSX.Element

/**
 * Функция для создания CSS класса для контента
 * @namespace Sidebar.Content.makeClasses
 * @param className - CSS классы
 * @returns {string} классы для контента
 */
const makeClasses = (className: string = ""): string => {
  return mergeClasses(
    "flex",
    "min-h-0",
    "flex-1",
    "flex-col",
    "gap-3",
    "overflow-auto",
    "group-data-[collapsible=icon]:overflow-hidden",
    className
  )
}

/**
 * Компонент контент
 * @namespace Sidebar.Content
 * @type {Constructor}
 * @param Props.className - CSS классы
 * @param Props.props - пропсы для компонента
 * @returns {Component} компонент SidebarContent
 */
const SidebarContent: Constructor = ({ className, ...props }: Props): Component => {
  const sidebarContentClass = makeClasses(className || "")

  return <div data-slot="sidebar-content" data-sidebar="content" className={sidebarContentClass} {...props} />
}

export default SidebarContent
