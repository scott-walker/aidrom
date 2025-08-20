"use client"

import type { ComponentProps, FC, JSX } from "react"
import { Provider } from "@radix-ui/react-tooltip"

/**
 * Пропсы
 * @namespace Ui.Tooltip.Provider.Props
 */
type Props = ComponentProps<typeof Provider>

/**
 * Конструктор
 * @namespace Ui.Tooltip.Provider.Constructor
 */
type Constructor = FC<Props>

/**
 * Компонент
 * @namespace Ui.Tooltip.Provider.Component
 */
type Component = JSX.Element

/**
 * Провайдер для тултипа
 * @namespace Ui.Tooltip.Provider
 * @type {Constructor}
 * @param Props.delayDuration - задержка
 * @param Props.props - пропсы для компонента
 * @returns {JSX.Element} элемент компонента TooltipProvider
 */
const TooltipProvider: Constructor = ({ delayDuration = 0, ...props }: Props): Component => {
  return <Provider data-slot="tooltip-provider" delayDuration={delayDuration} {...props} />
}

export default TooltipProvider
