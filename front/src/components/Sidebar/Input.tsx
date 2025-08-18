import type { ComponentProps, FC, JSX } from "react"
import { Input } from "@ui/Input"
import { mergeClasses } from "@utils/jsxtools"

/**
 * Пропсы
 * @namespace Sidebar.Input.Props
 */
type Props = ComponentProps<typeof Input>

/**
 * Конструктор
 * @namespace Sidebar.Input.Constructor
 */
type Constructor = FC<Props>

/**
 * Компонент
 * @namespace Sidebar.Input.Component
 */
type Component = JSX.Element

/**
 * Функция для создания CSS класса для инпута
 * @namespace Sidebar.Input.makeClasses
 * @param className - CSS классы
 * @returns {string} классы для инпута
 */
const makeClasses = (className: string = ""): string => {
  return mergeClasses(
    "bg-background",
    "h-8",
    "w-full",
    "shadow-none",
    className
  )
}
/**
 * Компонент инпут
 * @namespace Sidebar.Input
 * @type {Constructor}
 * @param Props.className - CSS классы
 * @param Props.props - пропсы для компонента
 * @returns {Component} компонент SidebarInput
 */
const SidebarInput: Constructor = ({ className, ...props }: Props): Component => {
  const sidebarInputClass = makeClasses(className || "")

  return <Input data-slot="sidebar-input" data-sidebar="input" className={sidebarInputClass} {...props} />
}

export default SidebarInput
