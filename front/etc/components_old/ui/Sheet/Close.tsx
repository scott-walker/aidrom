import type { ComponentProps, FC, JSX } from "react"
import { Close } from "@radix-ui/react-dialog"

/**
 * Пропсы
 * @namespace Ui.Sheet.Props
 */
type Props = ComponentProps<typeof Close>

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
 * Кнопка закрытия оверлея
 * @namespace Ui.Sheet.Close
 * @type {Constructor}
 * @param Props.props - пропсы для компонента
 * @returns {JSX.Element} элемент компонента SheetClose
 */
const SheetClose: Constructor = ({ ...props }: Props): Component => {
  return <Close data-slot="sheet-close" {...props} />
}

export default SheetClose
