import type { ComponentProps, FC, ReactNode } from "react"

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
export const Content: FC<Props> = ({ children, ...props }: Props): ReactNode => {
  return <main {...props}>{children}</main>
}
