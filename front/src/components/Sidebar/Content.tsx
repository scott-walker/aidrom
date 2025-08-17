import type { ComponentProps, FC, JSX } from "react"
import { makeSidebarContentClass } from "./assets"

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
 * Компонент контент
 * @namespace Sidebar.Content
 * @type {Constructor}
 * @param Props.className - CSS классы
 * @param Props.props - пропсы для компонента
 * @returns {Component} компонент SidebarContent
 */
const SidebarContent: Constructor = ({ className, ...props }: Props): Component => {
  const sidebarContentClass = makeSidebarContentClass(className || "")

  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className={sidebarContentClass}
      {...props}
    />
  )
}

export default SidebarContent
