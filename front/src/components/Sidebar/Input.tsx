import type { ComponentProps, FC, JSX } from "react"
import { Input } from "@ui/Input"
import { makeSidebarInputClass } from "./assets"

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
 * Компонент инпут
 * @namespace Sidebar.Input
 * @type {Constructor}
 * @param Props.className - CSS классы
 * @param Props.props - пропсы для компонента
 * @returns {Component} компонент SidebarInput
 */
const SidebarInput: Constructor = ({ className, ...props }: Props): Component => {
  const sidebarInputClass = makeSidebarInputClass(className || "")

  return <Input data-slot="sidebar-input" data-sidebar="input" className={sidebarInputClass} {...props} />
}

export default SidebarInput
