import type { ComponentProps, FC, JSX } from "react"
import { Overlay } from "@radix-ui/react-dialog"
import { makeOverlayClass } from "./assets"

/**
 * Пропсы
 * @namespace Ui.Sheet.Props
 */
type Props = ComponentProps<typeof Overlay>

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
 * Оверлей
 * @namespace Ui.Sheet.Overlay
 * @type {Constructor}
 * @param Props.className - CSS класс
 * @param Props.props - пропсы для компонента
 * @returns {JSX.Element} элемент компонента SheetOverlay
 */
const SheetOverlay: Constructor = ({ className, ...props }: Props): Component => {
  const classes = makeOverlayClass(className)

  return <Overlay data-slot="sheet-overlay" className={classes} {...props} />
}

export default SheetOverlay
