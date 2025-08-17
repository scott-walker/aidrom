import type { ComponentProps, FC, JSX } from "react"
import { makeSidebarInsetClass } from "./assets"

/**
 * Пропсы
 * @namespace Sidebar.Inset.Props
 */
type Props = ComponentProps<"main">

/**
 * Конструктор
 * @namespace Sidebar.Inset.Constructor
 */
type Constructor = FC<Props>

/**
 * Компонент
 * @namespace Sidebar.Inset.Component
 */
type Component = JSX.Element

/**
 * Компонент SidebarInset
 * @namespace Sidebar.Inset
 * @type {Constructor}
 * @param Props.className - CSS классы
 * @param Props.props - пропсы для компонента
 * @returns {Component} компонент SidebarInset
 */
const SidebarInset: Constructor = ({ className, ...props }: Props): Component => {
  const sidebarInsetClass = makeSidebarInsetClass(className || "")

  return <main data-slot="sidebar-inset" className={sidebarInsetClass} {...props} />
}

export default SidebarInset
