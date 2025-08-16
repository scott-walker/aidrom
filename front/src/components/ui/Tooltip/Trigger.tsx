"use client"

import type { ComponentProps, FC, JSX } from "react"
import { Trigger } from "@radix-ui/react-tooltip"

/**
 * Пропсы
 * @namespace Ui.Tooltip.Trigger.Props
 */
type Props = ComponentProps<typeof Trigger>

/**
 * Конструктор
 * @namespace Ui.Tooltip.Trigger.Constructor
 */
type Constructor = FC<Props>

/**
 * Компонент
 * @namespace Ui.Tooltip.Trigger.Component
 */
type Component = JSX.Element

/**
 * Триггер для тултипа
 * @namespace Ui.Tooltip.Trigger
 * @type {Constructor}
 * @param Props.props - пропсы для компонента
 * @returns {JSX.Element} элемент компонента TooltipTrigger
 */
const TooltipTrigger: Constructor = ({ ...props }: Props): Component => {
  return <Trigger data-slot="tooltip-trigger" {...props} />
}

export default TooltipTrigger
