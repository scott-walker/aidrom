import { mergeClasses } from "@utils/jsxtools"

/**
 * Создает классы для разделителя
 * @namespace Ui.Separator.Assets.MakeClass
 * @param {string} className - CSS класс
 * @returns {string} строковый класс
 */
export const makeClass = (className: string = ""): string => {
  return mergeClasses(
    "bg-border",
    "shrink-0",
    "data-[orientation=horizontal]:h-px",
    "data-[orientation=horizontal]:w-full",
    "data-[orientation=vertical]:h-full",
    "data-[orientation=vertical]:w-px",
    className
  )
}
