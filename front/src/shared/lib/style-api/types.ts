import type { ClassValue } from "@utils/jsxtools"

/**
 * Общие варианты
 * @namespace Shared.Lib.StyleApi.BaseVariants
 */
export type BaseVariants = {
  none: string
  default: string
}

/**
 * Варианты размера
 * @namespace Shared.Lib.StyleApi.SizeVariants
 */
export type SizeVariants = BaseVariants & {
  xs: string
  sm: string
  md: string
  lg: string
  xl: string
}

/**
 * Вариант размера
 * @namespace Shared.Lib.StyleApi.SizeVariant
 */
export type SizeVariant = keyof SizeVariants

/**
 * Варианты цветовой схемы
 * @namespace Shared.Lib.StyleApi.ColorSchemeVariants
 */
export type ColorSchemeVariants = BaseVariants & {
  ghost: string
  soft: string
  hard: string
  primary: string
  secondary: string
  warning: string
  danger: string
}

/**
 * Вариант цветовой схемы
 * @namespace Shared.Lib.StyleApi.ColorSchemeVariant
 */
export type ColorSchemeVariant = keyof ColorSchemeVariants

/**
 * Варианты скругления краев
 * @namespace Shared.Lib.StyleApi.RoundedVariants
 */
export type RoundedVariants = SizeVariants & {
  full: string
}

/**
 * Вариант скругления краев
 * @namespace Shared.Lib.StyleApi.RoundedVariant
 */
export type RoundedVariant = keyof RoundedVariants

/**
 * Варианты отступов
 * @namespace Shared.Lib.StyleApi.PaddingVariant
 */
export type PaddingVariants = SizeVariants & {}

/**
 * Вариант отступов
 * @namespace Shared.Lib.StyleApi.PaddingVariant
 */
export type PaddingVariant = keyof PaddingVariants

/**
 * Варианты размера текста
 * @namespace Shared.Lib.StyleApi.TextSizeVariants
 */
export type TextSizeVariants = SizeVariants // Omit<SizeVariants, "clean">

/**
 * Вариант размера текста
 * @namespace Shared.Lib.StyleApi.TextSizeVariant
 */
export type TextSizeVariant = keyof TextSizeVariants

/**
 * Композиция вариантов
 * @namespace Shared.Lib.StyleApi.CompositeVariants
 */
export type CompositeVariants = {
  scheme: ColorSchemeVariants
  schemeHover: ColorSchemeVariants
  padding: PaddingVariants
  textSize: TextSizeVariants
  rounded: RoundedVariants
}

/**
 * Ключи в композиции вариантов
 * @namespace Shared.Lib.StyleApi.CompositeVariantKeys
 */
export type CompositeVariantKeys = keyof CompositeVariants

/**
 * Значения каждого варианта в композиции
 * @namespace Shared.Lib.StyleApi.CompositeVariantValues
 */
export type CompositeVariantValues =
  CompositeVariants[CompositeVariantKeys][keyof CompositeVariants[CompositeVariantKeys]]

/**
 * Доступные свойства композиции
 * @namespace Shared.Lib.StyleApi.CompositeVariant
 */
export type CompositeVariant = {
  [K in CompositeVariantKeys]?: keyof CompositeVariants[K]
}

/**
 * Пропсы для сборки варианта
 * @namespace Shared.Lib.StyleApi.BuildVariantProps
 */
export type BuildVariantProps = {
  beforeClasses?: string
  afterClasses?: string
  outlined?: boolean
  variant?: Partial<CompositeVariant>
}

/**
 * Пропсы для создателя классов
 * @namespace Shared.Lib.StyleApi.MakerClassesProps
 */
export type MakerClassesProps = ClassValue[]
