import type { ComponentProps, FC, JSX } from "react"
import { Slot } from "@radix-ui/react-slot"
import { mergeClasses } from "@utils/jsxtools"

/**
 * Пропсы
 * @namespace Sidebar.MenuSubButton.Props
 */
type Props = ComponentProps<"a"> & {
  asChild?: boolean
  size?: "sm" | "md"
  isActive?: boolean
}

/**
 * Конструктор
 * @namespace Sidebar.MenuSubButton.Constructor
 */
type Constructor = FC<Props>

/**
 * Компонент
 * @namespace Sidebar.MenuSubButton.Component
 */
type Component = JSX.Element

/**
 * Функция для создания CSS класса для кнопки подменю
 * @namespace Sidebar.MenuSubButton.makeClasses
 * @param size - размер кнопки
 * @param className - CSS классы
 * @returns {string} классы для кнопки подменю
 */
const makeClasses = (size: "sm" | "md" = "md", className: string = ""): string => {
  const sizeClass = size === "sm" ? "text-xs" : "text-sm"

  return mergeClasses(
    "text-sidebar-foreground",
    "ring-sidebar-ring",
    "hover:bg-sidebar-accent",
    "hover:text-sidebar-accent-foreground",
    "active:bg-sidebar-accent",
    "active:text-sidebar-accent-foreground",
    "[&>svg]:text-sidebar-accent-foreground",
    "flex",
    "h-7",
    "min-w-0",
    "-translate-x-px",
    "items-center",
    "gap-2",
    "overflow-hidden",
    "rounded-md",
    "px-2",
    "outline-hidden",
    "focus-visible:ring-2",
    "disabled:pointer-events-none",
    "disabled:opacity-50",
    "aria-disabled:pointer-events-none",
    "aria-disabled:opacity-50",
    "[&>span:last-child]:truncate",
    "[&>svg]:size-4",
    "[&>svg]:shrink-0",
    "data-[active=true]:bg-sidebar-accent",
    "data-[active=true]:text-sidebar-accent-foreground",
    "group-data-[collapsible=icon]:hidden",
    sizeClass,
    className
  )
}

/**
 * Компонент кнопки подменю
 * @namespace Sidebar.MenuSubButton
 * @type {Constructor}
 * @param Props.className - CSS классы
 * @param Props.props - пропсы для компонента
 * @returns {Component} элемент компонента кнопки подменю
 */
const SidebarMenuSubButton: Constructor = ({
  asChild = false,
  size = "md",
  isActive = false,
  className,
  ...props
}: Props): Component => {
  const Comp = asChild ? Slot : "a"
  const classes = makeClasses(size, className || "")

  return (
    <Comp
      data-slot="sidebar-menu-sub-button"
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={classes}
      {...props}
    />
  )
}

export default SidebarMenuSubButton
