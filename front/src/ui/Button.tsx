import type { ComponentProps, FC, ReactNode } from "react"
import { cn, cva } from "@utils/jsxtools"

/**
 * Пропсы кнопки
 * @namespace Ui.Button.Props
 */
type Props = ComponentProps<"button"> & {
  children: ReactNode
  variant?: "default" | "brand" | "primary" | "warning" | "danger"
}

/**
 * Кнопка
 * @namespace Ui.Button
 * @param {Props} props.children - контент
 * @param {Props} props.variant - вариант
 * @param {Props} props.className - CSS-классы
 * @returns {ReactNode}
 */
export const Button: FC<Props> = ({ children, variant = "default", className = "", ...props }: Props): ReactNode => {
  const baseClasses = cn(
    "rounded-lg",
    "px-2.5 py-1.5",
    "w-fit",
    "h-fit",
    "transition-colors",
    "transition-transform",
    "duration-100",
    "cursor-pointer",
    "font-medium",
    "border-2",
    "border-transparent",
    "shadow-sm",
    "hover:scale-105",
    "active:scale-95",
    "select-none",
    className
  )
  const variants = cva(baseClasses, {
    variants: {
      variant: {
        default: cn(
          "bg-background-closer",
          "text-foreground",
          "hover:bg-background-closer/80",
          "dark:hover:bg-background-closer"
        ),
        brand: "bg-brand text-brand-foreground hover:bg-brand-accent hover:text-brand-foreground-accent",
        primary: "bg-primary text-primary-foreground hover:bg-primary-accent hover:text-primary-foreground-accent",
        warning: "bg-warning text-warning-foreground hover:bg-warning-accent hover:text-warning-foreground-accent",
        danger: "bg-danger text-danger-foreground hover:bg-danger-accent hover:text-danger-foreground-accent"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  })

  return (
    <button className={cn(variants({ variant }), className)} {...props}>
      {children}
    </button>
  )
}
