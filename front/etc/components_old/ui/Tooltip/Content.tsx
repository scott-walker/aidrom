"use client"

import type { ComponentProps, FC, JSX } from "react"
import { Portal, Content, Arrow } from "@radix-ui/react-tooltip"
import { makeContentClass, makeArrowClass } from "./assets"

/**
 * Пропсы
 * @namespace Ui.Tooltip.Trigger.Props
 */
type Props = ComponentProps<typeof Content>

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
 * Контент тултипа
 * @namespace Ui.Tooltip.Content
 * @type {Constructor}
 * @param Props.className - CSS класс
 * @param Props.sideOffset - смещение
 * @param Props.children - дочерние элементы
 * @param Props.props - пропсы для компонента
 * @returns {JSX.Element} элемент компонента TooltipContent
 */
const TooltipContent: Constructor = ({ className, sideOffset = 0, children, ...props }: Props): Component => {
  const contentClasses = makeContentClass(className)
  const arrowClasses = makeArrowClass()

  return (
    <Portal>
      <Content data-slot="tooltip-content" sideOffset={sideOffset} className={contentClasses} {...props}>
        {children}
        <Arrow className={arrowClasses} />
      </Content>
    </Portal>
  )
}

export default TooltipContent
