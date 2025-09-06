import type { ClassValue } from "@utils/jsxtools"

/**
 * Пропсы для создателя классов
 * @namespace Shared.Lib.StyleApi.MakerClassesProps
 */
export type MakerClassesProps = ClassValue[] | string

/**
 * Пропсы для создания вариантов
 * @namespace Shared.Lib.StyleApi.MakerVariantProps
 */
export type MakerVariantsProps = {
  beforeClasses?: MakerClassesProps
  afterClasses?: MakerClassesProps
  variants: Record<string, string>
}

/**
 * Сделать варианты
 * @namespace Shared.Lib.StyleApi.MakerVariants
 */
export type MakerVariants = (props: MakerVariantsProps) => (variant: string) => string
