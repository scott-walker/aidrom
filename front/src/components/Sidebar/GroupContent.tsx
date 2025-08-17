import type { ComponentProps, FC, JSX } from "react"
import { makeSidebarGroupContentClass } from "./assets"

/**
 * Пропсы
 * @namespace Sidebar.GroupContent.Props
 */
type Props = ComponentProps<"div">

/**
 * Конструктор
 * @namespace Sidebar.GroupContent.Constructor
 */
type Constructor = FC<Props>

/**
 * Компонент
 * @namespace Sidebar.GroupContent.Component
 */
type Component = JSX.Element

/**
 * Компонент контент группы
 * @namespace Sidebar.GroupContent
 * @type {Constructor}
 * @param Props.className - CSS классы
 * @param Props.props - пропсы для компонента
 * @returns {Component} компонент SidebarGroupContent
 */
const SidebarGroupContent: Constructor = ({ className, ...props }: Props): Component => {
  const classes = makeSidebarGroupContentClass(className || "")

  return <div data-slot="sidebar-group-content" data-sidebar="group-content" className={classes} {...props} />
}

export default SidebarGroupContent
