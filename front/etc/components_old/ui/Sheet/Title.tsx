import type { ComponentProps, FC, JSX } from "react"
import { Title } from "@radix-ui/react-dialog"
import { makeTitleClass } from "./assets"

/**
 * Пропсы
 * @namespace Ui.Sheet.Props
 */
type Props = ComponentProps<typeof Title>

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
 * Тайтл
 * @namespace Ui.Sheet.Title
 * @type {Constructor}
 * @param Props.className - CSS класс
 * @param Props.props - пропсы для компонента
 * @returns {JSX.Element} элемент компонента SheetTitle
 */
const SheetTitle: Constructor = ({ className, ...props }: Props): Component => {
  const classes = makeTitleClass(className)

  return <Title data-slot="sheet-title" className={classes} {...props} />
}

export default SheetTitle
