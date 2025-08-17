import type { ComponentProps, FC, JSX } from "react"
import type { VariantProps } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"
import { mergeClasses } from "@utils/jsxtools"
import { Tooltip, TooltipContent, TooltipTrigger } from "@ui/Tooltip"
import { makeSidebarMenuButtonVariants } from "./assets"
import { useSidebar } from "./hooks"

// Варианты стилей для кнопки меню
const sidebarMenuButtonVariants = makeSidebarMenuButtonVariants()

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
