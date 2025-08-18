import type { ComponentProps, CSSProperties, FC, JSX } from "react"
import { useMemo } from "react"
import { mergeClasses } from "@utils/jsxtools"
import { Skeleton } from "@ui/Skeleton"

/**
 * Пропсы
 * @namespace Sidebar.MenuSkeleton.Props
 */
type Props = ComponentProps<"div"> & {
  showIcon?: boolean
}

/**
 * Конструктор
 * @namespace Sidebar.MenuSkeleton.Constructor
 */
type Constructor = FC<Props>

/**
 * Компонент
 * @namespace Sidebar.MenuSkeleton.Component
 */
type Component = JSX.Element

/**
 * Функция для создания CSS класса для скелетона меню
 * @namespace Sidebar.MenuSkeleton.makeMenuSkeletonClass
 * @param className - CSS классы
 * @returns {string} классы для скелетона меню
 */
const makeMenuSkeletonClass = (className: string = ""): string => {
  return mergeClasses("flex", "h-8", "items-center", "gap-2", "rounded-md", "px-2", className)
}

/**
 * Функция для создания CSS класса для иконки скелетона меню
 * @namespace Sidebar.MenuSkeleton.makeMenuSkeletonIconClass
 * @param className - CSS классы
 * @returns {string} классы для иконки скелетона меню
 */
const makeMenuSkeletonIconClass = (className: string = ""): string => {
  return mergeClasses("size-4", "rounded-md", className)
}

/**
 * Функция для создания CSS класса для текста скелетона меню
 * @namespace Sidebar.MenuSkeleton.makeMenuSkeletonTextClass
 * @param className - CSS классы
 * @returns {string} классы для текста скелетона меню
 */
const makeMenuSkeletonTextClass = (className: string = ""): string => {
  return mergeClasses("h-4", "max-w-(--skeleton-width)", "flex-1", className)
}

/**
 * Компонент скелетона меню
 * @namespace Sidebar.MenuSkeleton
 * @type {Constructor}
 * @param Props.className - CSS классы
 * @param Props.showIcon - флаг, определяющий, что нужно отобразить иконку
 * @param Props.props - пропсы для компонента
 * @returns {Component} элемент компонента скелетона меню
 */
const SidebarMenuSkeleton: Constructor = ({ className, showIcon = false, ...props }: Props): Component => {
  const classes = makeMenuSkeletonClass(className || "")
  const iconClasses = makeMenuSkeletonIconClass()
  const textClasses = makeMenuSkeletonTextClass()

  // Случайная ширина от 50% до 90%.
  const width = useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, [])
  const style = { "--skeleton-width": width } as CSSProperties

  return (
    <div data-slot="sidebar-menu-skeleton" data-sidebar="menu-skeleton" className={classes} {...props}>
      {showIcon && <Skeleton className={iconClasses} data-sidebar="menu-skeleton-icon" />}

      <Skeleton className={textClasses} data-sidebar="menu-skeleton-text" style={style} />
    </div>
  )
}

export default SidebarMenuSkeleton
