import type { ComponentProps, FC, ReactNode } from "react"
import { cn } from "@utils/jsxtools"

/**
 * Пропсы контента
 * @namespace Layouts.Lucent.Content.Props
 */
type Props = ComponentProps<"div">

/**
 * Контент макета
 * @namespace Layouts.Lucent.Content
 * @returns {ReactNode}
 */
export const Content: FC<Props> = ({ children, className = "", ...props }: Props): ReactNode => {
  const classes = cn("p-10", className)

  return (
    <main className={classes} {...props}>
      {children}
    </main>
  )
}
