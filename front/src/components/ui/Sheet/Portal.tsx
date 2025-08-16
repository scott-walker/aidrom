import type { ComponentProps, FC, JSX } from "react"
import { Portal } from "@radix-ui/react-dialog"

/**
 * Пропсы
 * @namespace Ui.Sheet.Props
 */
type Props = ComponentProps<typeof Portal>

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
 * Портал для оверлея
 * @namespace Ui.Sheet.Portal
 * @type {Constructor}
 * @param Props.props - пропсы для компонента
 * @returns {JSX.Element} элемент компонента SheetPortal
 */
const SheetPortal: Constructor = ({...props}: Props): Component => {
  return <Portal data-slot="sheet-portal" {...props} />
}

export default SheetPortal
