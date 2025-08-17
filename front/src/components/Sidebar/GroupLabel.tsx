import type { ComponentProps, FC, JSX } from "react"
import { Slot } from "@radix-ui/react-slot"
import { makeSidebarGroupLabelClass } from "./assets"

/**
 * Пропсы
 * @namespace Sidebar.GroupLabel.Props
 */
type Props = ComponentProps<"div"> & { asChild?: boolean }

/**
 * Конструктор
 * @namespace Sidebar.GroupLabel.Constructor
 */
type Constructor = FC<Props>

/**
 * Компонент
 * @namespace Sidebar.GroupLabel.Component
 */
type Component = JSX.Element

/**
 * Компонент лейбл для группы
 * @namespace Sidebar.GroupLabel
 * @type {Constructor}
 * @param Props.className - CSS классы
 * @param Props.props - пропсы для компонента
 * @returns {Component} компонент SidebarGroupLabel
 */
const SidebarGroupLabel: Constructor = ({ className, asChild = false, ...props }: Props): Component => {
  const Comp = asChild ? Slot : "div"
  const sidebarGroupLabelClass = makeSidebarGroupLabelClass(className || "")

  return (
    <Comp data-slot="sidebar-group-label" data-sidebar="group-label" className={sidebarGroupLabelClass} {...props} />
  )
}

export default SidebarGroupLabel
