import type { ComponentProps, FC, JSX } from "react"
import { makeSidebarGroupClass } from "./assets"

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
 * Компонент группа
 * @namespace Sidebar.Group
 * @type {Constructor}
 * @param Props.className - CSS классы
 * @param Props.props - пропсы для компонента
 * @returns {Component} компонент SidebarGroup
 */
const SidebarGroup: Constructor = ({ className, ...props }: Props): Component => {
  const sidebarGroupClass = makeSidebarGroupClass(className || "")

  return <div data-slot="sidebar-group" data-sidebar="group" className={sidebarGroupClass} {...props} />
}

export default SidebarGroup
