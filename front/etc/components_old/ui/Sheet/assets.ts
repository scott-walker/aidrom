import { mergeClasses } from "@utils/jsxtools"

/**
 * Тип стороны контента
 * @namespace Ui.Sheet.Assets.ContentSide
 */
type ContentSide = "top" | "right" | "bottom" | "left"

/**
 * Создает классы для слоя
 * @namespace Ui.Sheet.Assets.MakeOverlayClass
 * @param {string} className - CSS класс
 * @returns {string} строковый класс
 */
export const makeOverlayClass = (className: string = ""): string => {
  return mergeClasses(
    // Анимация открытия
    "data-[state=open]:animate-in",
    "data-[state=open]:fade-in-0",

    // Анимация закрытия
    "data-[state=closed]:animate-out",
    "data-[state=closed]:fade-out-0",

    // Позиционирование
    "fixed",
    "inset-0",

    // Стили слоя
    "z-50",
    "bg-black/50",

    // Дополнительные классы
    className
  )
}

/**
 * Создает классы для контента
 * @namespace Ui.Sheet.Assets.MakeContentClass
 * @param {string} side - сторона контента
 * @param {string} className - CSS класс
 * @returns {string} строковый класс
 */
export const makeContentClass = (side: ContentSide = "right", className: string = ""): string => {
  // Классы для сторон контента
  const sideClasses = {
    right: mergeClasses(
      "data-[state=closed]:slide-out-to-right",
      "data-[state=open]:slide-in-from-right",
      "inset-y-0",
      "right-0",
      "h-full",
      "w-3/4",
      "border-l",
      "sm:max-w-sm"
    ),
    left: mergeClasses(
      "data-[state=closed]:slide-out-to-left",
      "data-[state=open]:slide-in-from-left",
      "inset-y-0",
      "left-0",
      "h-full",
      "w-3/4",
      "border-r",
      "sm:max-w-sm"
    ),
    top: mergeClasses(
      "data-[state=closed]:slide-out-to-top",
      "data-[state=open]:slide-in-from-top",
      "inset-x-0",
      "top-0",
      "h-auto",
      "border-b"
    ),
    bottom: mergeClasses(
      "data-[state=closed]:slide-out-to-bottom",
      "data-[state=open]:slide-in-from-bottom",
      "inset-x-0",
      "bottom-0",
      "h-auto",
      "border-t"
    )
  }

  return mergeClasses(
    // Базовые стили
    "bg-background",
    "fixed",
    "z-50",
    "flex",
    "flex-col",
    "gap-4",
    "shadow-lg",

    // Анимация открытия
    "data-[state=open]:animate-in",
    "data-[state=open]:duration-500",

    // Анимация закрытия
    "data-[state=closed]:animate-out",
    "data-[state=closed]:duration-300",

    // Переходы
    "transition",
    "ease-in-out",

    // Классы для конкретной стороны
    sideClasses[side] ?? "",

    // Дополнительные классы
    className
  )
}

/**
 * Создает классы для кнопки закрытия
 * @namespace Ui.Sheet.Assets.MakeCloseClass
 * @param {string} className - CSS класс
 * @returns {string} строковый класс
 */
export const makeCloseClass = (className: string = ""): string => {
  return mergeClasses(
    "ring-offset-background",
    "focus:ring-ring",
    "data-[state=open]:bg-secondary",
    "absolute",
    "top-4",
    "right-4",
    "rounded-xs",
    "opacity-70",
    "transition-opacity",
    "hover:opacity-100",
    "focus:ring-2",
    "focus:ring-offset-2",
    "focus:outline-hidden",
    "disabled:pointer-events-none",
    className
  )
}

/**
 * Создает классы для иконки кнопки закрытия
 * @namespace Ui.Sheet.Assets.MakeCloseIconClass
 * @param {string} className - CSS класс
 * @returns {string} строковый класс
 */
export const makeCloseIconClass = (className: string = ""): string => {
  return mergeClasses("size-4", className)
}

/**
 * Создает классы для текста кнопки закрытия
 * @namespace Ui.Sheet.Assets.MakeCloseSpanClass
 * @param {string} className - CSS класс
 * @returns {string} строковый класс
 */
export const makeCloseSpanClass = (className: string = ""): string => {
  return mergeClasses("sr-only", className)
}

/**
 * Создает классы для заголовка
 * @namespace Ui.Sheet.Assets.MakeHeaderClass
 * @param {string} className - CSS класс
 * @returns {string} строковый класс
 */
export const makeHeaderClass = (className: string = ""): string => {
  return mergeClasses(
    "flex",
    "flex-col",
    "gap-1.5",
    "p-4",
    className
  )
}

/**
 * Создает классы для футера
 * @namespace Ui.Sheet.Assets.MakeFooterClass
 * @param {string} className - CSS класс
 * @returns {string} строковый класс
 */
export const makeFooterClass = (className: string = ""): string => {
  return mergeClasses(
    "mt-auto",
    "flex",
    "flex-col",
    "gap-2",
    "p-4",
    className
  )
}

/**
 * Создает классы для заголовка
 * @namespace Ui.Sheet.Assets.MakeTitleClass
 * @param {string} className - CSS класс
 * @returns {string} строковый класс
 */
export const makeTitleClass = (className: string = ""): string => {
  return mergeClasses(
    "text-foreground",
    "font-semibold",
    className
  )
}

/**
 * Создает классы для описания
 * @namespace Ui.Sheet.Assets.MakeDescriptionClass
 * @param {string} className - CSS класс
 * @returns {string} строковый класс
 */
export const makeDescriptionClass = (className: string = ""): string => {
  return mergeClasses(
    "text-muted-foreground",
    "text-sm",
    className
  )
}
