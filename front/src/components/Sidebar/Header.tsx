import type { ComponentProps, FC, ReactNode } from "react"

/**
 * Пропсы шапки сайдбара
 * @namespace Components.Sidebar.Header.Props
 */
type Props = ComponentProps<"header">

/**
 * Шапка сайдбара
 * @namespace Components.Sidebar.Header
 * @param {Props} props.children - контент
 * @returns {ReactNode}
 */
export const Header: FC<Props> = ({ children, ...props }: Props): ReactNode => {
  return <header {...props}>{children}</header>
}
