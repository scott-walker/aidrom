import type { ComponentProps, FC, JSX } from "react"
import { useSidebar } from "./hooks"
import { makeSidebarRailClass } from "./assets"

/**
 * Пропсы
 * @namespace Sidebar.Rail.Props
 */
type Props = ComponentProps<"button">

/**
 * Конструктор
 * @namespace Sidebar.Rail.Constructor
 */
type Constructor = FC<Props>

/**
 * Компонент
 * @namespace Sidebar.Rail.Component
 */
type Component = JSX.Element

/**
 * Компонент рельс (чтобы это не значило)
 * @namespace Sidebar.Rail
 * @type {Constructor}
 * @param Props.className - CSS классы
 * @param Props.props - пропсы для компонента
 * @returns {Component} компонент SidebarRail
 */
const SidebarRail: Constructor = ({ className, ...props }: Props): Component => {
  const sidebarRailClass = makeSidebarRailClass(className || "")
  const { toggleSidebar } = useSidebar()

  return (
    <button
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={sidebarRailClass}
      {...props}
    />
  )
}

export default SidebarRail
