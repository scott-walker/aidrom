import { cva } from "@shared/utils/jsxtools"
import { type ReactNode, createElement } from "react"

/**
 * Пропсы заголовка
 * @namespace Shared.UI.Heading.Props
 */
type Props = {
  children: ReactNode
  level?: 1 | 2 | 3 | 4 | 5 | 6
}

/**
 * Заголовок
 * @namespace Shared.UI.Heading
 * @param {Props} props
 * @returns {ReactNode}
 */
export const Heading = ({ children, level = 3 }: Props): ReactNode => {
  const variants = cva("font-family-display font-bold text-foreground", {
    variants: {
      level: {
        1: "text-4xl",
        2: "text-3xl",
        3: "text-2xl",
        4: "text-xl",
        5: "text-lg",
        6: "text-md"
      }
    },
    defaultVariants: {
      level: 3
    }
  })
  const classes = variants({ level })

  return createElement(`h${level}`, { className: classes }, children)
}
