import type { ComponentProps, FC, JSX } from "react"
import { mergeClasses } from "@utils/jsxtools"
import { useSidebar } from "./hooks"

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
 * Функция для создания класса для рельса
 * @namespace Sidebar.Rail.makeClasses
 * @param className - CSS классы
 * @returns {string} классы для рельса
 */
const makeClasses = (className: string = ""): string => {
  return mergeClasses(
    "hover:after:bg-sidebar-border",
    "absolute",
    "inset-y-0",
    "z-20",
    "hidden",
    "w-4",
    "-translate-x-1/2",
    "transition-all",
    "ease-linear",
    "group-data-[side=left]:-right-4",
    "group-data-[side=right]:left-0",
    "after:absolute",
    "after:inset-y-0",
    "after:left-1/2",
    "after:w-[2px]",
    "sm:flex",
    "in-data-[side=left]:cursor-w-resize",
    "in-data-[side=right]:cursor-e-resize",
    "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize",
    "[[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
    "hover:group-data-[collapsible=offcanvas]:bg-sidebar",
    "group-data-[collapsible=offcanvas]:translate-x-0",
    "group-data-[collapsible=offcanvas]:after:left-full",
    "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
    "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
    className
  )
} 

/**
 * Компонент рельс (чтобы это не значило)
 * @namespace Sidebar.Rail
 * @type {Constructor}
 * @param Props.className - CSS классы
 * @param Props.props - пропсы для компонента
 * @returns {Component} компонент SidebarRail
 */
const SidebarRail: Constructor = ({ className, ...props }: Props): Component => {
  const sidebarRailClass = makeClasses(className || "")
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
