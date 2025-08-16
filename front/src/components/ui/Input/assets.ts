import { mergeClasses } from "@utils/jsxtools"

/**
 * Создает классы
 * @namespace Ui.Input.Assets.MakeClass
 * @param {string} className - CSS класс
 * @returns {string} строковый класс
 */
export const makeClass = (className: string = ""): string => {
  return mergeClasses(
    // Базовые стили
    "flex",
    "h-9",
    "w-full",
    "min-w-0",
    "rounded-md",
    "border",
    "border-input",
    "bg-transparent",
    "px-3",
    "py-1",
    "text-base",
    "shadow-xs",
    "transition-[color,box-shadow]",
    "outline-none",
    "md:text-sm",

    // Стили для placeholder
    "placeholder:text-muted-foreground",

    // Стили для selection
    "selection:bg-primary",
    "selection:text-primary-foreground",

    // Темная тема
    "dark:bg-input/30",

    // Стили для file input
    "file:text-foreground",
    "file:inline-flex",
    "file:h-7",
    "file:border-0",
    "file:bg-transparent",
    "file:text-sm",
    "file:font-medium",

    // Стили disabled состояния
    "disabled:pointer-events-none",
    "disabled:cursor-not-allowed",
    "disabled:opacity-50",

    // Стили focus состояния
    "focus-visible:border-ring",
    "focus-visible:ring-ring/50",
    "focus-visible:ring-[3px]",

    // Стили для невалидного состояния
    "aria-invalid:ring-destructive/20",
    "dark:aria-invalid:ring-destructive/40",
    "aria-invalid:border-destructive",

    // Дополнительные классы
    className
  )
}
