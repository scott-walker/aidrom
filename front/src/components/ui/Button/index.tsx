import { type FC, type JSX, type ComponentProps } from "react"
import { type VariantProps } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"

import { mergeClasses } from "@utils/jsxtools"
import { variants } from "./assets"

/**
 * Пропсы конструктора
 * @namespace Ui.Button.Props
 */
type Props = ComponentProps<"button"> &
  VariantProps<typeof variants> & {
    asChild?: boolean
  }

/**
 * Конструктор компонента
 * @namespace Ui.Button.Constructor
 */
type Constructor = FC<Props>

/**
 * Компонент
 * @namespace Ui.Button.Component
 */
type Component = JSX.Element

/**
 * UI компонент "Button"
 * @namespace Ui.Button
 * @type {Constructor}
 * @param Props.className - классы для компонента
 * @param Props.variant - вариант компонента
 * @param Props.size - размер компонента
 * @param Props.asChild - флаг, определяющий, что компонент используется как дочерний
 * @param Props.props - пропсы для компонента
 * @returns {JSX.Element} элемент компонента кнопки
 */
const Button: Constructor = ({ className, variant, size, asChild = false, ...props }: Props): Component => {
  const Component = asChild ? Slot : "button"
  const classes = mergeClasses(variants({ variant, size, className }))

  return <Component data-slot="button" className={classes} {...props} />
}

export { Button, type Props }
