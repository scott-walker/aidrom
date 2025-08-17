import type { ComponentProps, FC, JSX } from "react"
import { Slot } from "@radix-ui/react-slot"
import { makeSidebarMenuActionClass } from "./assets"

/**
 * Пропсы
 * @namespace Sidebar.MenuAction.Props
 */
type Props = ComponentProps<"button"> & {
  asChild?: boolean
  showOnHover?: boolean
}

/**
 * Конструктор
 * @namespace Sidebar.MenuAction.Constructor
 */
type Constructor = FC<Props>

/**
 * Компонент
 * @namespace Sidebar.MenuAction.Component
 */
type Component = JSX.Element

/**
 * Компонент действия меню
 * @namespace Sidebar.MenuAction
 * @type {Constructor}
 * @param Props.asChild - флаг, определяющий, что компонент используется как дочерний
 * @param Props.showOnHover - флаг, определяющий, что компонент отображается при наведении
 * @param Props.className - классы для компонента
 * @param Props.props - пропсы для компонента
 * @returns {Component} элемент компонента действия меню
 */
const SidebarMenuAction: Constructor = ({
  className,
  asChild = false,
  showOnHover = false,
  ...props
}: Props): Component => {
  const Comp = asChild ? Slot : "button"
  const classes = makeSidebarMenuActionClass(showOnHover, className || "")

  return <Comp data-slot="sidebar-menu-action" data-sidebar="menu-action" className={classes} {...props} />
}

export default SidebarMenuAction
