import type { ComponentProps, FC, JSX } from "react"
import { Root } from "@radix-ui/react-dialog"

/**
 * Пропсы
 * @namespace Ui.Sheet.Props
 */
type Props = ComponentProps<typeof Root>

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
 * Корневой компонент
 * @namespace Ui.Sheet.Component
 */
const Sheet: Constructor = ({ ...props }: Props): Component => {
  return <Root data-slot="sheet" {...props} />
}

export default Sheet
