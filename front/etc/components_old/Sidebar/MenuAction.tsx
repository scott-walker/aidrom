import type { ComponentProps, FC, JSX } from "react"
import { Slot } from "@radix-ui/react-slot"
import { mergeClasses } from "@utils/jsxtools"

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
 * Функция для создания CSS класса для действия меню
 * @namespace Sidebar.MenuAction.makeClasses
 * @param showOnHover - флаг, определяющий, что действие отображается при наведении
 * @param className - CSS классы
 * @returns {string} классы для действия меню
 */
const makeClasses = (showOnHover: boolean, className: string = ""): string => {
  if (showOnHover) {
    className += mergeClasses(
      "peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
      "group-focus-within/menu-item:opacity-100",
      "group-hover/menu-item:opacity-100",
      "data-[state=open]:opacity-100",
      "md:opacity-0"
    )
  }

  return mergeClasses(
    "text-sidebar-foreground",
    "ring-sidebar-ring",
    "hover:bg-sidebar-accent",
    "hover:text-sidebar-accent-foreground",
    "peer-hover/menu-button:text-sidebar-accent-foreground",
    "absolute",
    "top-1.5",
    "right-1",
    "flex",
    "aspect-square",
    "w-5",
    "items-center",
    "justify-center",
    "rounded-md",
    "p-0",
    "outline-hidden",
    "transition-transform",
    "focus-visible:ring-2",
    "[&>svg]:size-4",
    "[&>svg]:shrink-0",
    "after:absolute",
    "after:-inset-2",
    "md:after:hidden",
    "peer-data-[size=sm]/menu-button:top-1",
    "peer-data-[size=default]/menu-button:top-1.5",
    "peer-data-[size=lg]/menu-button:top-2.5",
    "group-data-[collapsible=icon]:hidden",
    className
  )
}

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
  const classes = makeClasses(showOnHover, className || "")

  return <Comp data-slot="sidebar-menu-action" data-sidebar="menu-action" className={classes} {...props} />
}

export default SidebarMenuAction
