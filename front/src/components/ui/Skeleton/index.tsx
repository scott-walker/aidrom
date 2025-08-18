import type { ComponentProps, FC, JSX } from "react"
import { makeClasses } from "./assets"

/**
 * Пропсы
 * @namespace Ui.Skeleton.Props
 */
type Props = ComponentProps<"div">  

/**
 * Конструктор
 * @namespace Ui.Skeleton.Constructor
 */
type Constructor = FC<Props>

/**
 * Компонент
 * @namespace Ui.Skeleton.Component
 */
type Component = JSX.Element

/**
 * Скелет
 * @namespace Ui.Skeleton
 * @type {Constructor}
 * @param Props.className - CSS класс
 * @param Props.props - пропсы для компонента
 * @returns {JSX.Element} элемент компонента Skeleton
 */
const Skeleton: Constructor = ({ className, ...props }: Props): Component => {
  const classes = makeClasses(className)

  return <div data-slot="skeleton" className={classes} {...props} />
}

export { Skeleton }
