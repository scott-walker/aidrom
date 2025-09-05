import type { ComponentProps, FC, ReactNode } from "react"
import { cn, cva } from "@utils/jsxtools"

/**
 * Пропсы компонента для отображения кода
 * @namespace Ui.Code.Props
 */
type Props = ComponentProps<"pre"> & {
  children?: ReactNode
  data?: string | object
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
export const Code: FC<Props> = ({ children, data, accent = false, className = "", ...props }: Props): ReactNode => {
  const content = children || (typeof data === "string" ? data : JSON.stringify(data, null, 2))

  /**
   * Классы для компонента Code, чтобы строки переносились и не появлялся скролл
   */
  const classes = cn(
    "px-8",
    "py-6",
    "font-family-mono",
    "font-semibold",
    "rounded-2xl",
    "break-words", // перенос длинных слов
    "whitespace-pre-wrap", // сохраняет пробелы и переносит строки
    "overflow-hidden", // скрывает скролл
    className
  )
  const variants = cva(classes, {
    variants: {
      accent: {
        true: "bg-background-soft text-foreground",
        false: "bg-background text-foreground"
      }
    },
    defaultVariants: {
      accent: false
    }
  })

  return (
    <pre className={variants({ accent })} {...props}>
      <code>{content}</code>
    </pre>
  )
}
