import type { ComponentProps, FC, ReactNode } from "react"
import { cn, cva } from "@utils/jsxtools"

/**
 * Пропсы кнопки
 * @namespace Ui.Button.Props
 */
type Props = ComponentProps<"button"> & {
  children: ReactNode
  variant?: "default" | "primary" | "secondary" | "danger"
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
        default: "bg-background-accent text-foreground hover:bg-primary hover:text-primary-foreground",
        primary: "bg-primary text-primary-foreground hover:bg-primary-accent",
        secondary: "bg-secondary text-secondary-foreground",
        danger: "bg-danger text-danger-foreground"
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
