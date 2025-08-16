import { mergeClasses } from "@utils/jsxtools"

/**
 * Создает классы для скелета
 * @namespace Ui.Skeleton.Assets.MakeClass
 * @param {string} className - CSS класс
 * @returns {string} строковый класс
 */
export const makeClass = (className: string = ""): string => {
  return mergeClasses(
    "bg-accent",
    "animate-pulse",
    "rounded-md",
    className
  )
}
