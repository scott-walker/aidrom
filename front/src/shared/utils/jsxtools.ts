import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { cva, type VariantProps } from "class-variance-authority"

export type { VariantProps, ClassValue }

/**
 * Объединяет классы в один строковый класс
 * @param inputs - массив классов
 * @returns строковый класс
 */
export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs))

/**
 * Создает классы на основе вариантов
 * @param baseClasses - базовые классы
 * @param variants - варианты
 * @returns строковый класс
 */
export { cva }
