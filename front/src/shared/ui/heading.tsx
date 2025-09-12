import { type ReactNode, createElement } from "react"
import { makeClasses } from "@lib/style-api"
import { cva } from "@utils/jsxtools"

/**
 * Пропсы заголовка
 * @namespace Shared.UI.Heading.Props
 */
type Props = {
  children: ReactNode
  level?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
  className?: string
}

/**
 * Заголовок
 * @namespace Shared.UI.Heading
 * @param {Props} props
 * @returns {ReactNode}
 */
export const Heading = ({ children, level = 6, className = "" }: Props): ReactNode => {
  const variants = cva("font-family-display font-semibold text-foreground", {
    variants: {
      level: {
        1: "text-5xl",
        2: "text-4xl",
        3: "text-3xl",
        4: "text-2xl",
        5: "text-xl",
        6: "text-lg",
        7: "text-base",
        8: "text-sm",
        9: "text-xs"
      }
    },
    defaultVariants: {
      level: 3
    }
  })
  const classes = makeClasses(variants({ level }), className)

  return createElement(`h${level}`, { className: classes }, children)
}
