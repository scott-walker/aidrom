"use client"

import type { ComponentProps, FC, JSX } from "react"
import { Root } from "@radix-ui/react-tooltip"
import TooltipProvider from "./Provider"

/**
 * Пропсы
 * @namespace Ui.Tooltip.Root.Props
 */
type Props = ComponentProps<typeof Root>

/**
 * Конструктор
 * @namespace Ui.Tooltip.Root.Constructor
 */
type Constructor = FC<Props>

/**
 * Компонент
 * @namespace Ui.Tooltip.Root.Component
 */
type Component = JSX.Element

/**
 * Тултип
 * @namespace Ui.Tooltip.Root
 * @type {Constructor}
 * @param Props.props - пропсы для компонента
 * @returns {JSX.Element} элемент компонента Tooltip
 */
const Tooltip: Constructor = ({ ...props }: Props): Component => {
  return (
    <TooltipProvider>
      <Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  )
}

export default Tooltip
