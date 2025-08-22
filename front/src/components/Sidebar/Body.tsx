import type { ComponentProps, FC, ReactNode } from "react"

/**
 * Пропсы тела сайдбара
 * @namespace Components.Sidebar.Body.Props
 */
type Props = ComponentProps<"div">

/**
 * Тело сайдбара
 * @namespace Components.Sidebar.Body
 * @param {Props} props.children - контент
 * @returns {ReactNode}
 */
export const Body: FC<Props> = ({ children, ...props }: Props): ReactNode => {
  return <div {...props}>{children}</div>
}
