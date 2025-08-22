import type { ComponentProps, FC, ReactNode } from "react"

/**
 * Пропсы страницы макета
 * @namespace Layouts.Lucent.Page.Props
 */
type Props = ComponentProps<"div">

/**
 * Страница макета
 * @namespace Layouts.Lucent.Page
 * @param {Props} props.children - контент страницы
 * @returns {ReactNode}
 */
export const Page: FC<Props> = ({ children, ...props }: Props): ReactNode => {
  return <div {...props}>{children}</div>
}
