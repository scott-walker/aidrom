import type { ComponentProps, FC, JSX, ReactNode } from "react"
import { cn, cva } from "@utils/jsxtools"

/**
 * Пропсы
 * @namespace Ui.Button.Props
 */
type Props = ComponentProps<"button"> & {
  children: ReactNode
  variant?: "default" | "primary" | "secondary" | "danger"
  className?: string
}

/**
 * Кнопка
 * @namespace Ui.Button
 * @param {Props} props
 * @returns {JSX.Element}
 */
export const Button: FC<Props> = ({ children, variant, className, ...props }: Props): JSX.Element => {
  const baseClasses = cn(
    "rounded-md",
    "px-2.5 py-1.5",
    "transition-colors",
    "transition-transform",
    "duration-100",
    "cursor-pointer",
    "font-medium",
    "border-none",
    "hover:scale-105",
    "active:scale-95"
  )
  const variants = cva(baseClasses, {
    variants: {
      variant: {
        default: "bg-background text-foreground",
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
