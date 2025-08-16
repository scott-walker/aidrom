import type { ComponentProps, FC, JSX } from "react"
import { Trigger } from "@radix-ui/react-dialog"

/**
 * Пропсы
 * @namespace Ui.Sheet.Props
 */
type Props = ComponentProps<typeof Trigger>

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
 * Триггер на открытие оверлея
 * @namespace Ui.Sheet.Trigger
 * @type {Constructor}
 * @param Props.props - пропсы для компонента
 * @returns {JSX.Element} элемент компонента SheetTrigger
 */
const SheetTrigger: Constructor = ({ ...props }: Props): Component => {
  return <Trigger data-slot="sheet-trigger" {...props} />
}

export default SheetTrigger
