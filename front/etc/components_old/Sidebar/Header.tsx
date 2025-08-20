import type { ComponentProps, FC, JSX } from "react"
import { mergeClasses } from "@utils/jsxtools"

/**
 * Пропсы
 * @namespace Sidebar.Header.Props
 */
type Props = ComponentProps<"div">

/**
 * Конструктор
 * @namespace Sidebar.Header.Constructor
 */
type Constructor = FC<Props>

/**
 * Компонент
 * @namespace Sidebar.Header.Component
 */
type Component = JSX.Element

/**
 * Функция для создания CSS класса для хедера
 * @namespace Sidebar.Header.makeClasses
 * @param className - CSS классы
 * @returns {string} классы для хедера
 */
const makeClasses = (className: string = ""): string => {
  return mergeClasses(
    "flex",
    "flex-col",
    "gap-2",
    "p-2",
    className
  )
}

/**
 * Компонент хедер
 * @namespace Sidebar.Header
 * @type {Constructor}
 * @param Props.className - CSS классы
 * @param Props.props - пропсы для компонента
 * @returns {Component} компонент SidebarHeader
 */
const SidebarHeader: Constructor = ({ className, ...props }: Props): Component => {
  const sidebarHeaderClass = makeClasses(className || "")

  return <div data-slot="sidebar-header" data-sidebar="header" className={sidebarHeaderClass} {...props} />
}

export default SidebarHeader
