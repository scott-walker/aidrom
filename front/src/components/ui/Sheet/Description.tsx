import type { ComponentProps, FC, JSX } from "react"
import { Description } from "@radix-ui/react-dialog"
import { makeDescriptionClass } from "./assets"

/**
 * Пропсы
 * @namespace Ui.Sheet.Props
 */
type Props = ComponentProps<typeof Description>

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
 * Описание
 * @namespace Ui.Sheet.Description
 * @type {Constructor}
 * @param Props.className - CSS класс
 * @param Props.props - пропсы для компонента
 * @returns {JSX.Element} элемент компонента SheetDescription
 */
const SheetDescription: Constructor = ({ className, ...props }: Props): Component => {
  const classes = makeDescriptionClass(className)

  return <Description data-slot="sheet-description" className={classes} {...props} />
}

export default SheetDescription
