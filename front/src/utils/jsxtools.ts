import { cva } from "class-variance-authority"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Объединяет классы в один строковый класс
 * @param inputs - массив классов
 * @returns строковый класс
 */
export const mergeClasses = (...inputs: ClassValue[]): string => twMerge(clsx(inputs))

/**
 * Создает вариации классов для компонентов Shadcn UI
 * @param base - базовые классы
 * @param config - конфигурация вариаций
 * @returns функция для создания вариаций
 */
export const makeVariants = cva
