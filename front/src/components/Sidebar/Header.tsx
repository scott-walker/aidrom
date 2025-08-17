import type { ComponentProps, FC, JSX } from "react"
import { makeSidebarHeaderClass } from "./assets"

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
 * Компонент хедер
 * @namespace Sidebar.Header
 * @type {Constructor}
 * @param Props.className - CSS классы
 * @param Props.props - пропсы для компонента
 * @returns {Component} компонент SidebarHeader
 */
const SidebarHeader: Constructor = ({ className, ...props }: Props): Component => {
  const sidebarHeaderClass = makeSidebarHeaderClass(className || "")

  return <div data-slot="sidebar-header" data-sidebar="header" className={sidebarHeaderClass} {...props} />
}

export default SidebarHeader
