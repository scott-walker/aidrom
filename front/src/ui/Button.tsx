import type { ComponentProps, FC, ReactNode } from "react"
import { cn, cva } from "@utils/jsxtools"

/**
 * Пропсы кнопки
 * @namespace Ui.Button.Props
 */
type Props = ComponentProps<"button"> & {
  children: ReactNode
  variant?: "soft" | "hard" | "primary" | "secondary" | "warning" | "danger"
  size?: "xs" | "sm" | "md" | "lg" | "xl"
}

/**
 * Кнопка
 * @namespace Ui.Button
 * @param {Props} props.children - контент
 * @param {Props} props.variant - вариант
 * @param {Props} props.className - CSS-классы
 * @returns {ReactNode}
 */
export const Button: FC<Props> = ({
  children,
  variant = "hard",
  size = "md",
  className = "",
  ...props
}: Props): ReactNode => {
  const buttonBaseClasses = cn(
    "w-fit",
    "h-fit",
    "rounded-lg",
    "transition-colors",
    "transition-transform",
    "duration-100",
    "cursor-pointer",
    "font-medium",
    "border-2",
    "border-transparent",
    "hover:scale-105",
    "active:scale-95",
    "select-none",
    "dark:shadow-ghost-xs"
  )
  const buttonVariants = cva(buttonBaseClasses, {
    variants: {
      variant: {
        soft: cn("bg-background-soft", "text-foreground", "shadow-ghost-xs"),
        hard: cn("bg-foreground", "text-background", "dark:bg-foreground-hard"),
        primary: cn(
          "bg-primary",
          "text-primary-foreground",
          "shadow-ghost-2xl",
          "shadow-color-danger",
          "hover:bg-primary-accent",
          "hover:text-primary-foreground-accent"
        ),
        secondary: cn(
          "bg-secondary",
          "text-secondary-foreground",
          "shadow-ghost-2xl",
          "shadow-color-danger",
          "hover:bg-secondary-accent",
          "hover:text-secondary-foreground-accent"
        ),
        warning: cn(
          "bg-warning",
          "text-warning-foreground",
          "hover:bg-warning-accent",
          "hover:text-warning-foreground-accent"
        ),
        danger: cn(
          "bg-danger",
          "text-danger-foreground",
          "hover:bg-danger-accent",
          "hover:text-danger-foreground-accent"
        )
      },
      size: {
        xs: "px-3 py-1 text-xs",
        sm: "px-4 py-1 text-sm",
        md: "px-5 py-1.5 text-base",
        lg: "px-6 py-2 text-lg",
        xl: "px-8 py-3.5 text-xl"
      }
    },
    defaultVariants: {
      variant: "hard",
      size: "md"
    }
  })
  const innerClasses = cn("flex items-center justify-center gap-4")

  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props}>
      <span className={innerClasses}>{children}</span>
    </button>
  )
}
