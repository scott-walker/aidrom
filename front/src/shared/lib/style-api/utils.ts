import { cn } from "@utils/jsxtools"
import type { MakerClassesProps, MakerVariants } from "./types"

/**
 * Сделать классы (сделай классы, детка 😁🤦‍♀️)
 * @namespace Shared.Lib.StyleApi.makeUiClasses
 */
export const makeClasses = (...classes: MakerClassesProps) => {
  return cn(...classes)
}

/**
 * Сделать UI элемент боксом (типа как кнопка, инпут, селект и тд.)
 * @namespace Shared.Lib.StyleApi.makeUiBox
 */
export const makeUiBox = () => {
  return makeClasses(
    "inline-flex",
    "items-center",
    "justify-center",
    "gap-(--ui-gap)",
    "px-(--ui-offset-x)",
    "py-(--ui-offset-y)",
    "border-(length:--ui-border-width)",
    "border-transparent",
    "rounded-(--ui-rounded)",
    "outline-none"
  )
}

/**
 * Сделать UI элемент с тенью
 * @namespace Shared.Lib.StyleApi.makeUiShadow
 */
export const makeUiShadow = () => makeClasses("shadow-(--ui-shadow)")

/**
 * Сделать UI элемент с плавным переходом стилей
 * @namespace Shared.Lib.StyleApi.makeUiTransition
 */
export const makeUiTransition = () => {
  return makeClasses("transition-(--ui-transition)")
}

/**
 * Сделать UI элемент с реагирующими стилями при клике
 * @namespace Shared.Lib.StyleApi.makeUiClickable
 */
export const makeUiClickable = () => {
  return makeClasses("cursor-pointer", "select-none", "active:scale-90")
}

/**
 * Сделать UI элемент с реагирующей анимацией при наведении
 * @namespace Shared.Lib.StyleApi.makeUiHoverableAnimation
 */
export const makeUiHoverableAnimation = () => {
  return makeClasses("hover:animate-(--ui-animation-hover)")
}

/**
 * Создать CSS классы для вариантов
 * @namespace Shared.Lib.StyleApi.makeVariants
 */
export const makeVariants: MakerVariants = ({ beforeClasses = "", afterClasses = "", variants }) => {
  return variant => cn(beforeClasses, variants[variant] ?? "", afterClasses)
}
