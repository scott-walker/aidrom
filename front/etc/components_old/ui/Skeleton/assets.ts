import { mergeClasses } from "@utils/jsxtools"

/**
 * Создает классы для скелета
 * @namespace Ui.Skeleton.Assets.makeClasses
 * @param {string} className - CSS класс
 * @returns {string} строковый класс
 */
export const makeClasses = (className: string = ""): string => {
  return mergeClasses(
    "bg-accent",
    "animate-pulse",
    "rounded-md",
    className
  )
}
