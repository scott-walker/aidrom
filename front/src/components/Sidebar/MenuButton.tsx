import type { ComponentProps, FC, JSX } from "react"
import type { VariantProps } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"
import { mergeClasses, makeVariants } from "@utils/jsxtools"
import { Tooltip, TooltipContent, TooltipTrigger } from "@ui/Tooltip"
import { useSidebar } from "./hooks"

/**
 * Функция для создания CSS класса (варианты) для кнопки меню
 * @namespace Sidebar.MenuButton.makeMenuButtonVariants
 * @returns сеттер для вариантов стилей
 */
const makeMenuButtonVariants = () => {
  const baseClasses = mergeClasses(
    "peer/menu-button",
    "flex",
    "w-full",
    "items-center",
    "gap-2",
    "overflow-hidden",
    "rounded-md",
    "p-2",
    "text-left",
    "text-sm",
    "outline-hidden",
    "ring-sidebar-ring",
    "transition-[width,height,padding]",
    "hover:bg-sidebar-accent",
    "hover:text-sidebar-accent-foreground",
    "focus-visible:ring-2",
    "active:bg-sidebar-accent",
    "active:text-sidebar-accent-foreground",
    "disabled:pointer-events-none",
    "disabled:opacity-50",
    "group-has-data-[sidebar=menu-action]/menu-item:pr-8",
    "aria-disabled:pointer-events-none",
    "aria-disabled:opacity-50",
    "data-[active=true]:bg-sidebar-accent",
    "data-[active=true]:font-medium",
    "data-[active=true]:text-sidebar-accent-foreground",
    "data-[state=open]:hover:bg-sidebar-accent",
    "data-[state=open]:hover:text-sidebar-accent-foreground",
    "group-data-[collapsible=icon]:size-8!",
    "group-data-[collapsible=icon]:p-2!",
    "[&>span:last-child]:truncate",
    "[&>svg]:size-4",
    "[&>svg]:shrink-0",
  )

  return makeVariants(baseClasses, {
    variants: {
      variant: {
        default: mergeClasses("hover:bg-sidebar-accent", "hover:text-sidebar-accent-foreground"),
        outline: mergeClasses(
          "bg-background",
          "shadow-[0_0_0_1px_hsl(var(--sidebar-border))]",
          "hover:bg-sidebar-accent",
          "hover:text-sidebar-accent-foreground",
          "hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"
        ),
      },
      size: {
        default: mergeClasses("h-8", "text-sm"),
        sm: mergeClasses("h-7", "text-xs"),
        lg: mergeClasses("h-12", "text-sm", "group-data-[collapsible=icon]:p-0!"),
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  })
}

// Варианты стилей для кнопки меню
const sidebarMenuButtonVariants = makeMenuButtonVariants()

/**
 * Пропсы
 * @namespace Sidebar.MenuButton.Props
 */
type Props = ComponentProps<"button"> & {
  asChild?: boolean
  isActive?: boolean
  tooltip?: string | ComponentProps<typeof TooltipContent>
} & VariantProps<typeof sidebarMenuButtonVariants>

/**
 * Конструктор
 * @namespace Sidebar.MenuButton.Constructor
 */
type Constructor = FC<Props>

/**
 * Компонент
 * @namespace Sidebar.MenuButton.Component
 */
type Component = JSX.Element

/**
 * Компонент кнопки меню
 * @namespace Sidebar.MenuButton
 * @type {Constructor}
 * @param Props.asChild - флаг, определяющий, что компонент используется как дочерний
 * @param Props.isActive - флаг, определяющий, что компонент активен
 * @param Props.variant - вариант компонента
 * @param Props.size - размер компонента
 * @param Props.tooltip - текст подсказки
 * @param Props.className - классы для компонента
 * @param Props.props - пропсы для компонента
 * @returns {Component} элемент компонента кнопки меню
 */
const SidebarMenuButton: Constructor = ({
  asChild = false,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  ...props
}: Props): Component => {
  const Comp = asChild ? Slot : "button"
  const classes = mergeClasses(sidebarMenuButtonVariants({ variant, size }), className)
  const { isMobile, state } = useSidebar()
  const isHidden = state === "collapsed" && isMobile

  const button = (
    <Comp
      data-slot="sidebar-menu-button"
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      className={classes}
      {...props}
    />
  )

  if (!tooltip) {
    return button
  }

  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent side="right" align="center" hidden={isHidden} {...tooltip} />
    </Tooltip>
  )
}

export default SidebarMenuButton
