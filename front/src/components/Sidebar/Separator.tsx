import type { ComponentProps, FC, JSX } from "react"
import { Separator } from "@ui/Separator"
import { makeSidebarSeparatorClass } from "./assets"

/**
 * Пропсы
 * @namespace Sidebar.Separator.Props
 */
type Props = ComponentProps<typeof Separator>

/**
 * Конструктор
 * @namespace Sidebar.Separator.Constructor
 */
type Constructor = FC<Props>

/**
 * Компонент
 * @namespace Sidebar.Separator.Component
 */
type Component = JSX.Element

/**
 * Компонент разделитель
 * @namespace Sidebar.Separator
 * @type {Constructor}
 * @param Props.className - CSS классы
 * @param Props.props - пропсы для компонента
 * @returns {Component} компонент SidebarSeparator
 */
const SidebarSeparator: Constructor = ({ className, ...props }: Props): Component => {
  const sidebarSeparatorClass = makeSidebarSeparatorClass(className || "")

  return (
    <Separator data-slot="sidebar-separator" data-sidebar="separator" className={sidebarSeparatorClass} {...props} />
  )
}

export default SidebarSeparator
