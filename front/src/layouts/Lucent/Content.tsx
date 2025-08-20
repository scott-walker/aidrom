import type { ComponentProps, FC, JSX } from "react"
import { cn } from "@utils/jsxtools"

/**
 * Пропсы
 * @namespace Layouts.Lucent.Content.Props
 */
type Props = ComponentProps<"div">

/**
 * Тело (основной компонент)
 * @namespace Layouts.Lucent.Content
 * @returns {JSX.Element}
 */
export const Content: FC<Props> = ({ children, className, ...props }: Props): JSX.Element => {
  return (
    <main className={cn("p-10", className)} {...props}>
      {children}
    </main>
  )
}
