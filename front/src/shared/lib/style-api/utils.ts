import { cn, cva } from "@utils/jsxtools"
import type {
  ColorSchemeVariants,
  PaddingVariants,
  TextSizeVariants,
  RoundedVariants,
  ComposeVariantsProps,
  MakerClassesProps,
  BaseVariants
} from "./types"
import type { VariantProps } from "class-variance-authority"

/**
 * Сделать базовые варианты
 * @namespace Shared.Lib.StyleApi.makeBaseVariants
 */
export const makeBaseVariants = (): BaseVariants => {
  return { none: "" }
}

/**
 * Сделать варианты цветовой схемы
 * @namespace Shared.Lib.StyleApi.makeColorSchemeVariants
 */
export const makeColorSchemeVariants = (): ColorSchemeVariants => {
  return {
    ...makeBaseVariants(),
    ghost: cn("bg-ghost", "text-ghost-foreground", "fill-ghost"),
    soft: cn("bg-soft", "text-soft-foreground", "fill-soft"),
    hard: cn("bg-hard", "text-hard-foreground", "fill-hard"),
    primary: cn("bg-primary", "text-primary-foreground", "fill-primary"),
    secondary: cn("bg-secondary", "text-secondary-foreground", "fill-secondary"),
    warning: cn("bg-warning", "text-warning-foreground", "fill-warning"),
    danger: cn("bg-danger", "text-danger-foreground", "fill-danger")
  }
}

/**
 * Сделать варианты цветовой схемы (с обводкой)
 * @namespace Shared.Lib.StyleApi.makeColorSchemeOutlinedVariants
 */
export const makeColorSchemeOutlinedVariants = (): ColorSchemeVariants => {
  return {
    ...makeBaseVariants(),
    ghost: cn("bg-ghost", "text-ghost-foreground", "fill-ghost", "border-foreground"),
    soft: cn("bg-background", "text-soft-foreground", "fill-background", "border-soft-foreground"),
    hard: cn("bg-background", "text-hard", "fill-background", "border-hard"),
    primary: cn("bg-background", "text-primary", "fill-background", "border-primary"),
    secondary: cn("bg-background", "text-secondary", "fill-background", "border-secondary"),
    warning: cn("bg-absolute-white", "text-warning", "fill-background", "border-warning"),
    danger: cn("bg-background", "text-danger", "fill-background", "border-danger")
  }
}

/**
 * Сделать варианты цветовой схемы (состояние hover)
 * @namespace Shared.Lib.StyleApi.makeColorSchemeHoverVariants
 */
export const makeColorSchemeHoverVariants = (): ColorSchemeVariants => {
  return {
    ...makeBaseVariants(),
    ghost: cn("hover:bg-ghost-accent", "hover:text-ghost-foreground-accent"),
    soft: cn("hover:bg-soft-accent", "hover:text-soft-foreground-accent"),
    hard: cn("hover:bg-hard-accent", "hover:text-hard-foreground-accent"),
    primary: cn("hover:bg-primary-accent", "hover:text-primary-foreground-accent"),
    secondary: cn("hover:bg-secondary-accent", "hover:text-secondary-foreground-accent"),
    warning: cn("hover:bg-warning-accent", "hover:text-warning-foreground-accent"),
    danger: cn("hover:bg-danger-accent", "hover:text-danger-foreground-accent")
  }
}

/**
 * Сделать варианты цветовой схемы (с обводкой)
 * @namespace Shared.Lib.StyleApi.makeColorSchemeOutlinedVariants
 */
export const makeColorSchemeOutlinedHoverVariants = (): ColorSchemeVariants => {
  return {
    ...makeBaseVariants(),
    ghost: cn("hover:border-ghost-accent"),
    soft: cn("hover:border-soft-accent"),
    hard: cn("hover:border-hard-accent"),
    primary: cn("hover:border-primary-accent"),
    secondary: cn("hover:border-secondary-accent"),
    warning: cn("hover:border-warning-accent"),
    danger: cn("hover:border-danger-accent")
  }
}

/**
 * Сделать варианты отступов
 * @namespace Shared.Lib.StyleApi.makePaddingVariants
 */
export const makePaddingVariants = (): PaddingVariants => {
  return {
    ...makeBaseVariants(),
    xs: "px-3 py-1 text-xs",
    sm: "px-4 py-1 text-sm",
    md: "px-5 py-1.5 text-base",
    lg: "px-6 py-2 text-lg",
    xl: "px-8 py-3.5 text-xl"
  }
}

/**
 * Сделать варианты размера
 * @namespace Shared.Lib.StyleApi.makeTextSizeVariants
 */
export const makeTextSizeVariants = (): TextSizeVariants => {
  return {
    ...makeBaseVariants(),
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl"
  }
}

/**
 * Сделать варианты скругления краев
 * @namespace Shared.Lib.StyleApi.makeRoundedVariants
 */
export const makeRoundedVariants = (): RoundedVariants => {
  return {
    ...makeBaseVariants(),
    none: "rounded-0",
    xs: "rounded-xs",
    sm: "rounded-lg",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full"
  }
}

/**
 * Сделать классы (сделай классы, детка 😁🤦‍♀️)
 * @namespace Shared.Lib.StyleApi.makeUiClasses
 */
export const makeClasses = (...classes: MakerClassesProps) => {
  return cn(...classes)
}

/**
 * Сделать базовые классы
 * @namespace Shared.Lib.StyleApi.makeBaseClasses
 */
export const makeUiBaseClasses = (...classes: MakerClassesProps) => {
  return makeClasses(
    "flex",
    "items-center",
    "justify-center",
    "gap-3",
    "w-fit",
    "h-fit",
    "transition-colors",
    "duration-(--duration-default)",
    "border-2",
    "border-transparent",
    // "shadow-xs",
    ...classes
  )
}

/**
 * Сделать классы для кликабельных элементов
 * @namespace Shared.Lib.StyleApi.makeClickableClasses
 */
export const makeUiClickableClasses = (...classes: MakerClassesProps) => {
  return makeClasses(
    "cursor-pointer",
    "select-none",
    // "active:scale-95",
    // "transition-transform",
    // "duration-(--duration-default)",
    ...classes
  )
}

/**
 * Извлечь вариант из коллекции вариантов
 * @namespace Shared.Lib.StyleApi.extractVariant
 */
export const extractVariant = (variants: Record<string, string>, variant: string) => {
  return variants[variant] ?? variants.none ?? ""
}

/**
 * Компоновать варианты
 * @namespace Shared.Lib.StyleApi.composeVariants
 */
export const composeVariants = ({
  beforeClasses = "",
  afterClasses = "",
  outlined = false,
  variants = {},
  defaultVariants = {}
}: ComposeVariantsProps) => {
  const useVariants = cva(beforeClasses, {
    variants: {
      scheme: outlined ? makeColorSchemeOutlinedVariants() : makeColorSchemeVariants(),
      schemeHover: outlined ? makeColorSchemeOutlinedHoverVariants() : makeColorSchemeHoverVariants(),
      padding: makePaddingVariants(),
      textSize: makeTextSizeVariants(),
      rounded: makeRoundedVariants(),
      ...variants
    },
    defaultVariants: {
      scheme: defaultVariants.scheme ?? "none",
      schemeHover: defaultVariants.schemeHover ?? "none",
      padding: defaultVariants.padding ?? "none",
      textSize: defaultVariants.textSize ?? "none",
      rounded: defaultVariants.rounded ?? "none"
    }
  })

  return (options: Partial<VariantProps<typeof useVariants>>): string => cn(useVariants(options), afterClasses)
}
