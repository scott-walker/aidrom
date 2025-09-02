import type { ComponentProps, ReactNode } from "react"
import {
  makeClasses,
  makeUiBox,
  makeUiClickable,
  makeUiHoverableAnimation,
  makeUiShadow,
  makeUiTransition,
  makeVariants
} from "@lib/style-api"

/**
 * Пропсы кнопки
 * @namespace Shared.Ui.Button.Props
 */
export type ButtonProps = ComponentProps<"button"> & {
  children: ReactNode
  scheme?: "ghost" | "soft" | "hard" | "primary" | "outline" | "brand"
}

/**
 * Кнопка
 * @namespace Shared.Ui.Button
 */
export const Button = ({ children, scheme = "primary", className = "", ...props }: ButtonProps): ReactNode => {
  const useScheme = makeVariants({
    beforeClasses: makeClasses(
      makeUiBox(),
      makeUiShadow(),
      makeUiTransition(),
      makeUiClickable(),
      makeUiHoverableAnimation()
    ),
    afterClasses: className,
    variants: {
      soft: makeClasses(
        "bg-soft",
        "text-soft-foreground"
        //"hover:bg-soft-accent",
        // "hover:text-soft-foreground-accent"
      ),
      hard: makeClasses(
        "bg-hard",
        "text-hard-foreground"
        //"hover:bg-hard-accent",
        // "hover:text-hard-foreground-accent"
      ),
      primary: makeClasses(
        "bg-primary",
        "text-primary-foreground"
        // "hover:bg-primary-accent",
        // "hover:text-primary-foreground-accent"
      ),
      brand: makeClasses(
        "bg-brand-gradient",
        "text-primary-foreground",
        "border-none",
        "px-[calc(var(--ui-offset-x)+var(--ui-border-width))]",
        "py-[calc(var(--ui-offset-y)+var(--ui-border-width))]"
      ),
      outline: makeClasses(
        "bg-transparent",
        "border-primary",
        "text-primary"
        // "hover:border-primary-accent",
        // "hover:text-primary-accent"
      )
    }
  })

  return (
    <button {...props} className={useScheme(scheme)}>
      {children}
    </button>
  )
}
