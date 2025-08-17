import type { ComponentProps, FC, JSX } from "react"
import { makeSidebarFooterClass } from "./assets"

/**
 * Пропсы
 * @namespace Sidebar.Footer.Props
 */
type Props = ComponentProps<"div">

/**
 * Конструктор
 * @namespace Sidebar.Footer.Constructor
 */
type Constructor = FC<Props>

/**
 * Компонент
 * @namespace Sidebar.Footer.Component
 */
type Component = JSX.Element

/**
 * Компонент футер
 * @namespace Sidebar.Footer
 * @type {Constructor}
 * @param Props.className - CSS классы
 * @param Props.props - пропсы для компонента
 * @returns {Component} компонент SidebarFooter
 */
const SidebarFooter: Constructor = ({ className, ...props }: Props): Component => {
  const sidebarFooterClass = makeSidebarFooterClass(className || "")

  return <div data-slot="sidebar-footer" data-sidebar="footer" className={sidebarFooterClass} {...props} />
}

export default SidebarFooter
