import { cn } from "@utils/jsxtools"
import type {
  ColorSchemeVariants,
  PaddingVariants,
  TextSizeVariants,
  RoundedVariants,
  BuildVariantProps,
  MakerClassesProps,
  BaseVariants
} from "./types"

/**
 * Сделать базовые варианты
 * @namespace Shared.Lib.StyleApi.makeBaseVariants
 */
export const makeBaseVariants = (): BaseVariants => {
  return { none: "", default: "" }
}

/**
 * Сделать варианты цветовой схемы
 * @namespace Shared.Lib.StyleApi.makeColorSchemeVariants
 */
export const makeColorSchemeVariants = (): ColorSchemeVariants => {
  return {
    ...makeBaseVariants(),
    default: cn("bg-soft", "text-soft-foreground", "fill-soft"),
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
    default: cn("bg-background", "text-soft-foreground", "fill-background", "border-background"),
    ghost: cn("bg-ghost", "text-ghost-foreground", "fill-ghost", "border-background"),
    soft: cn("bg-background", "text-soft-foreground", "fill-background", "border-background"),
    hard: cn("bg-background", "text-hard", "fill-background", "border-foreground"),
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
    default: cn("hover:bg-background", "hover:text-soft-foreground-accent"),
    ghost: cn("hover:bg-ghost-accent", "hover:text-ghost-foreground-accent"),
    soft: cn("hover:soft-background-accent", "hover:text-soft-foreground-accent"),
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
    default: "",
    ghost: "",
    soft: "",
    hard: "",
    primary: "",
    secondary: "",
    warning: "",
    danger: ""
    // default: cn("hover:border-background"),
    // ghost: cn("hover:border-ghost-accent"),
    // soft: cn("hover:bg-background", "hover:border-soft-accent"),
    // hard: cn("hover:border-hard-accent"),
    // primary: cn("hover:border-primary-accent"),
    // secondary: cn("hover:border-secondary-accent"),
    // warning: cn("hover:border-warning-accent"),
    // danger: cn("hover:border-danger-accent")
  }
}

/**
 * Сделать варианты отступов
 * @namespace Shared.Lib.StyleApi.makePaddingVariants
 */
export const makePaddingVariants = (): PaddingVariants => {
  return {
    ...makeBaseVariants(),
    default: "px-5 py-1.5 text-base",
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
    default: "text-base",
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
    default: "rounded-md",
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

export const makeUiHoverableClasses = (...classes: MakerClassesProps) => {
  return makeClasses("hover:border-primary", "disabled:opacity-50", "disabled:cursor-not-allowed", ...classes)
}

/**
 * Сделать классы для кликабельных элементов
 * @namespace Shared.Lib.StyleApi.makeClickableClasses
 */
export const makeUiClickableClasses = (...classes: MakerClassesProps) => {
  return makeClasses(
    "cursor-pointer",
    "select-none",
    "active:scale-90",
    "transition-transform",
    "duration-(--duration-default)",
    ...classes
  )
}
export const makeUiFocusableClasses = (...classes: MakerClassesProps) => {
  return makeClasses(
    "focus:outline-none",
    "focus:border-primary",
    // "focus:-rotate-3",
    // "transition-transform",
    // "duration-(--duration-default)",
    // "hover:border-primary",
    // "disabled:opacity-50",
    // "disabled:cursor-not-allowed",
    ...classes
  )
}

/**
 * Извлечь вариант из коллекции вариантов
 * @namespace Shared.Lib.StyleApi.extractVariant
 */
export const extractVariant = (variants: Record<string, string>, variant: string) => {
  return variants[variant] ?? variants.default ?? ""
}

/**
 * Собрать CSS классы варианта
 * @namespace Shared.Lib.StyleApi.buildVariant
 */
export const buildVariant = ({
  beforeClasses = "",
  afterClasses = "",
  outlined = false,
  variant = {}
}: BuildVariantProps): string => {
  const classes: string[] = []
  const variantsMap = {
    scheme: outlined ? makeColorSchemeOutlinedVariants() : makeColorSchemeVariants(),
    schemeHover: outlined ? makeColorSchemeOutlinedHoverVariants() : makeColorSchemeHoverVariants(),
    padding: makePaddingVariants(),
    textSize: makeTextSizeVariants(),
    rounded: makeRoundedVariants()
  }

  Object.entries(variantsMap).forEach(([key, variants]) => {
    const variantKey = key as keyof typeof variantsMap
    const variantValue = (variant as Record<string, string>)[variantKey] ?? "default"
    const className = extractVariant(variants, variantValue)

    classes.push(className)
  })

  return cn(beforeClasses, classes, afterClasses)
}
