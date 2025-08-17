import type { ComponentProps, FC, JSX } from "react"
import { Slot } from "@radix-ui/react-slot"
import { makeSidebarGroupActionClass } from "./assets"

/**
 * Пропсы
 * @namespace Sidebar.GroupAction.Props
 */
type Props = ComponentProps<"button"> & { asChild?: boolean }

/**
 * Конструктор
 * @namespace Sidebar.GroupAction.Constructor
 */
type Constructor = FC<Props>

/**
 * Компонент
 * @namespace Sidebar.GroupAction.Component
 */
type Component = JSX.Element

/**
 * Компонент действие группы (я сам хз что это, но описал как описал)
 * @namespace Sidebar.GroupAction
 * @param Props.className - CSS классы
 * @param Props.asChild - использовать Slot
 * @param Props.props - пропсы для компонента
 * @returns {Component} компонент SidebarGroupAction
 */
const SidebarGroupAction: Constructor = ({ className, asChild = false, ...props }: Props): Component => {
  const Comp = asChild ? Slot : "button"
  const sidebarGroupActionClass = makeSidebarGroupActionClass(className || "")

  return (
    <Comp data-slot="sidebar-group-action" data-sidebar="group-action" className={sidebarGroupActionClass} {...props} />
  )
}

export default SidebarGroupAction
