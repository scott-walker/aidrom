import { mergeClasses } from "@utils/jsxtools"

/**
 * Создает классы для контента тултипа
 * @namespace Ui.Tooltip.Assets.MakeContentClass
 * @param {string} className - CSS класс
 * @returns {string} строковый класс
 */
export const makeContentClass = (className: string = ""): string => {
  return mergeClasses(
    // Базовые стили
    "bg-primary",
    "text-primary-foreground",
    
    // Анимации входа
    "animate-in",
    "fade-in-0",
    "zoom-in-95",
    
    // Анимации выхода
    "data-[state=closed]:animate-out",
    "data-[state=closed]:fade-out-0",
    "data-[state=closed]:zoom-out-95",
    
    // Анимации слайда по сторонам
    "data-[side=bottom]:slide-in-from-top-2",
    "data-[side=left]:slide-in-from-right-2",
    "data-[side=right]:slide-in-from-left-2",
    "data-[side=top]:slide-in-from-bottom-2",
    
    // Позиционирование и размеры
    "z-50",
    "w-fit",
    "origin-(--radix-tooltip-content-transform-origin)",
    
    // Визуальное оформление
    "rounded-md",
    "px-3",
    "py-1.5",
    "text-xs",
    "text-balance",
    
    // Дополнительные классы
    className
  )
}


/**
 * Создает классы для стрелки тултипа
 * @namespace Ui.Tooltip.Assets.MakeArrowClass
 * @param {string} className - CSS класс
 * @returns {string} строковый класс
 */
export const makeArrowClass = (className: string = ""): string => {
  return mergeClasses(
    "bg-primary",
    "fill-primary",
    "z-50",
    "size-2.5",
    "translate-y-[calc(-50%_-_2px)]",
    "rotate-45",
    "rounded-[2px]",
    className
  )
}

