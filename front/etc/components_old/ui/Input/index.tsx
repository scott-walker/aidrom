import type { ComponentProps, FC, JSX } from "react"
import { makeClasses } from "./assets"

/**
 * Пропсы
 * @namespace Ui.Input.Props
 */
type Props = ComponentProps<"input">

/**
 * Конструктор
 * @namespace Ui.Input.Constructor
 */
type Constructor = FC<Props>

/**
 * Компонент
 * @namespace Ui.Input.Component
 */
type Component = JSX.Element

/**
 * UI компонент "Input"
 * @namespace Ui.Input
 * @type {Constructor}
 * @param Props.className - CSS класс
 * @param Props.type - тип компонента
 * @param Props.props - пропсы для компонента
 * @returns {JSX.Element} элемент компонента Input
 */
const Input: Constructor = ({ className, type, ...props }: Props): Component => {
  const classes = makeClasses(className)

  return <input type={type} data-slot="input" className={classes} {...props} />
}

export { Input }
