import type { ComponentProps, FC, JSX } from "react"
import { Slot } from "@radix-ui/react-slot"
import { mergeClasses } from "@utils/jsxtools"

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
 * Функция для создания CSS класса для действия группы 
 * @namespace Sidebar.GroupAction.makeClasses
 * @param className - CSS классы
 * @returns {string} классы для действия группы
 */
const makeClasses = (className: string = ""): string => {
  return mergeClasses(
    "text-sidebar-foreground",
    "ring-sidebar-ring",
    "hover:bg-sidebar-accent",
    "hover:text-sidebar-accent-foreground",
    "absolute",
    "top-3.5",
    "right-3",
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
    "group-data-[collapsible=icon]:hidden",
    className
  )
}

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
  const sidebarGroupActionClass = makeClasses(className || "")

  return (
    <Comp data-slot="sidebar-group-action" data-sidebar="group-action" className={sidebarGroupActionClass} {...props} />
  )
}

export default SidebarGroupAction
