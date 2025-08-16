import type { ComponentProps, FC, JSX } from "react"
import { makeHeaderClass } from "./assets"

/**
 * Пропсы
 * @namespace Ui.Sheet.Props
 */
type Props = ComponentProps<"div">

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
 * Заголовок
 * @namespace Ui.Sheet.Header
 * @type {Constructor}
 * @param Props.className - CSS класс
 * @param Props.props - пропсы для компонента
 * @returns {JSX.Element} элемент компонента SheetHeader
 */
const SheetHeader: Constructor = ({ className, ...props }: Props): Component => {
  const classes = makeHeaderClass(className)

  return <div data-slot="sheet-header" className={classes} {...props} />
}

export default SheetHeader
