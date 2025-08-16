import { mergeClasses, makeVariants } from "@utils/jsxtools"

/**
 * Базовые классы
 * @namespace Ui.Button.Assets.BaseClasses
 */
const baseClasses: string = mergeClasses([
  "inline-flex",
  "items-center",
  "justify-center",
  "gap-2",
  "whitespace-nowrap",
  "rounded-md",
  "text-sm",
  "font-medium",
  "transition-all",
  "disabled:pointer-events-none",
  "disabled:opacity-50",
  "[&_svg]:pointer-events-none",
  "[&_svg:not([class*='size-'])]:size-4",
  "shrink-0",
  "[&_svg]:shrink-0",
  "outline-none",
  "focus-visible:border-ring",
  "focus-visible:ring-ring/50",
  "focus-visible:ring-[3px]",
  "aria-invalid:ring-destructive/20",
  "dark:aria-invalid:ring-destructive/40",
  "aria-invalid:border-destructive",
  "hover:cursor-pointer"
])

/**
 * Классы для вариантов
 * @namespace Ui.Button.Assets.VariantClasses
 */
const variantClasses: Record<string, string> = {
  default: mergeClasses([
    "bg-primary",
    "text-primary-foreground",
    "shadow-xs",
    "hover:bg-primary/90"
  ]),
  destructive: mergeClasses([
    "bg-destructive",
    "text-destructive-foreground",
    "shadow-xs",
    "hover:bg-destructive-dark",
    "focus-visible:ring-destructive/20",
    "dark:focus-visible:ring-destructive/40",
    "dark:bg-destructive/60"
  ]),
  outline: mergeClasses([
    "border",
    "bg-background",
    "shadow-xs",
    "hover:bg-accent",
    "hover:text-accent-foreground",
    "dark:bg-input/30",
    "dark:border-input",
    "dark:hover:bg-input/50"
  ]),
  secondary: mergeClasses([
    "bg-secondary",
    "text-secondary-foreground",
    "shadow-xs",
    "hover:bg-secondary/80"
  ]),
  ghost: mergeClasses([
    "hover:bg-accent",
    "hover:text-accent-foreground",
    "dark:hover:bg-accent/50"
  ]),
  link: mergeClasses(["text-primary", "underline-offset-4", "hover:underline"])
}

/**
 * Классы для размеров
 * @namespace Ui.Button.Assets.SizeClasses
 */
const sizeClasses: Record<string, string> = {
  default: "h-9 px-4 py-2 has-[>svg]:px-3",
  sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
  lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
  icon: "size-9"
}

/**
 * Варианты
 * @namespace Ui.Button.Assets.Variants
 */
const variants = makeVariants(baseClasses, {
  variants: {
    variant: variantClasses,
    size: sizeClasses
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
})

export { baseClasses, variantClasses, sizeClasses, variants }
