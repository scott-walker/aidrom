"use client"

import type { ComponentProps, FC, JSX } from "react"
import { Root } from "@radix-ui/react-separator"
import { makeClass } from "./assets"

/**
 * Пропсы
 * @namespace Ui.Separator.Props
 */
type Props = ComponentProps<typeof Root>

/**
 * Конструктор
 * @namespace Ui.Separator.Constructor
 */
type Constructor = FC<Props>

/**
 * Компонент
 * @namespace Ui.Separator.Component
 */
type Component = JSX.Element

/**
 * Разделитель
 * @namespace Ui.Separator
 * @type {Constructor}
 * @param Props.className - CSS класс
 * @param Props.orientation - ориентация
 * @param Props.decorative - декоративный
 * @param Props.props - пропсы для компонента
 * @returns {JSX.Element} элемент компонента Separator
 */
const Separator: Constructor = ({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: Props): Component => {
  const classes = makeClass(className)

  return <Root data-slot="separator" decorative={decorative} orientation={orientation} className={classes} {...props} />
}

export { Separator }
