import type { ComponentProps, FC, JSX } from "react"
import { Slot } from "@radix-ui/react-slot"
import { mergeClasses } from "@utils/jsxtools"

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
 * Функция для создания CSS класса для лейбла группы
 * @namespace Sidebar.GroupLabel.makeClasses
 * @param className - CSS классы
 * @returns {string} классы для лейбла группы
 */
const makeClasses = (className: string = ""): string => {
  return mergeClasses(
    "text-sidebar-foreground/70",
    "ring-sidebar-ring",
    "flex",
    "h-8",
    "shrink-0",
    "items-center",
    "rounded-md",
    "px-2",
    "text-xs",
    "font-medium",
    "outline-hidden",
    "transition-[margin,opacity]",
    "duration-200",
    "ease-linear",
    "focus-visible:ring-2",
    "[&>svg]:size-4",
    "[&>svg]:shrink-0",
    "group-data-[collapsible=icon]:-mt-8",
    "group-data-[collapsible=icon]:opacity-0",
    className
  )
}

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
  const sidebarGroupLabelClass = makeClasses(className || "")

  return (
    <Comp data-slot="sidebar-group-label" data-sidebar="group-label" className={sidebarGroupLabelClass} {...props} />
  )
}

export default SidebarGroupLabel
