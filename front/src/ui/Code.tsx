import type { ComponentProps, FC, ReactNode } from "react"
import { cn, cva } from "@utils/jsxtools"

/**
 * Пропсы компонента для отображения кода
 * @namespace Ui.Code.Props
 */
type Props = ComponentProps<"pre"> & {
  accent?: boolean
}

/**
 * Компонент для отображения кода
 * @namespace Ui.Code
 * @param {Props} props.children - контент
 * @param {Props} props.accent - стилевой акцент
 * @param {Props} props.className - CSS-классы
 * @returns {ReactNode}
 */
export const Code: FC<Props> = ({ children, accent = false, className = "", ...props }: Props): ReactNode => {
  const classes = cn(
    "overflow-x-auto",
    "px-8",
    "py-6",
    "text-base",
    "font-family-mono",
    "font-semibold",
    "rounded-2xl",
    className
  )
  const variants = cva(classes, {
    variants: {
      accent: {
        true: "bg-background-closer text-foreground",
        false: "bg-background text-foreground"
      }
    },
    defaultVariants: {
      accent: false
    }
  })

  return (
    <pre className={variants({ accent })} {...props}>
      <code>{children}</code>
    </pre>
  )
}
