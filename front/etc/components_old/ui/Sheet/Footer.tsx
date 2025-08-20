import type { ComponentProps, FC, JSX } from "react"
import { makeFooterClass } from "./assets"

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
 * Футер
 * @namespace Ui.Sheet.Footer
 * @type {Constructor}
 * @param Props.className - CSS класс
 * @param Props.props - пропсы для компонента
 * @returns {JSX.Element} элемент компонента SheetFooter
 */
const SheetFooter: Constructor = ({ className, ...props }: Props): Component => {
  const classes = makeFooterClass(className)

  return <div data-slot="sheet-footer" className={classes} {...props} />
}

export default SheetFooter
