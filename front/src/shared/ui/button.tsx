import type { ComponentProps, ReactNode } from "react"
import { makeClasses, makeUiBox, makeUiClickable, makeUiShadow, makeUiTransition, makeVariants } from "@lib/style-api"

/**
 * Пропсы кнопки
 * @namespace Shared.Ui.Button.Props
 */
export type ButtonProps = ComponentProps<"button"> & {
  children: ReactNode
  schema?: "ghost" | "soft" | "hard" | "primary" | "outline" | "brand" | "secondary" | "danger" | "warning"
  rounded?: boolean
}

/**
 * Кнопка
 * @namespace Shared.Ui.Button
 */
export const Button = ({
  children,
  schema = "primary",
  className = "",
  disabled = false,
  rounded = false,
  ...props
}: ButtonProps): ReactNode => {
  const useSchema = makeVariants({
    beforeClasses: makeClasses(
      makeUiBox(),
      makeUiShadow(),
      makeUiTransition(),
      !disabled && makeUiClickable(),
      rounded && "rounded-full",
      "ring-2",
      "ring-offset-3",
      "ring-transparent",
      "ring-offset-background",
      "uppercase",
      "text-xs",
      "font-bold",
      // "font-family-display",
      "px-4",
      "py-1.5"
    ),
    afterClasses: makeClasses(
      disabled && "cursor-not-allowed",
      disabled && "opacity-50",
      disabled && "hover:border-transparent",
      disabled && "hover:ring-transparent",
      className
    ),
    variants: {
      ghost: makeClasses(
        "bg-transparent",
        "text-foreground",
        "shadow-none",
        "ring-transparent",
        "ring-offset-transparent"
        // "border-none",
        // "hover:border-hard"
        // "hover:text-primary"
      ),
      soft: makeClasses(
        "bg-soft",
        "text-soft-foreground",
        "ring-offset-background-soft",
        "hover:ring-background-hard"
        //"hover:bg-soft-accent",
        // "hover:text-soft-foreground-accent"
      ),
      hard: makeClasses(
        "bg-hard",
        "text-hard-foreground",
        "hover:ring-hard"
        //"hover:bg-hard-accent",
        // "hover:text-hard-foreground-accent"
      ),
      primary: makeClasses(
        "bg-primary",
        "text-primary-foreground",
        "hover:ring-primary"
        // "hover:border-primary-foreground"
        // "hover:bg-primary-accent",
        // "hover:text-primary-foreground-accent"
      ),
      secondary: makeClasses(
        "bg-secondary",
        "text-secondary-foreground",
        "hover:ring-secondary"
        // "hover:bg-secondary-accent",
        // "hover:text-secondary-foreground-accent"
      ),
      brand: makeClasses(
        "bg-brand-gradient",
        "text-primary-foreground",
        "border-none",
        "px-[calc(var(--ui-offset-x)+var(--ui-border-width))]",
        "py-[calc(var(--ui-offset-y)+var(--ui-border-width))]",
        "hover:ring-secondary"
      ),
      danger: makeClasses(
        "bg-danger",
        "text-danger-foreground",
        "hover:ring-danger"
        // "hover:bg-danger-accent",
        // "hover:text-danger-foreground-accent"
      ),
      outline: makeClasses(
        "bg-transparent",
        "border-primary",
        "text-primary"
        // "hover:border-primary-accent",
        // "hover:text-primary-accent"
      ),
      warning: makeClasses(
        "bg-warning",
        "text-warning-foreground",
        "hover:ring-warning"
        // "hover:bg-warning-accent",
        // "hover:text-warning-foreground-accent"
      )
    }
  })

  return (
    <button {...props} className={useSchema(schema)} disabled={disabled}>
      {children}
    </button>
  )
}
