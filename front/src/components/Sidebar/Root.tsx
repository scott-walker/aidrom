import type { ComponentProps, FC, ReactNode } from "react"

/**
 * Пропсы корневого компонента сайдбара
 * @namespace Components.Sidebar.Root.Props
 */
type Props = ComponentProps<"aside">

/**
 * Корневой компонент сайдбара
 * @namespace Components.Sidebar.Root
 * @param {Props} props.children - контент
 * @returns {ReactNode}
 */
export const Root: FC<Props> = ({ children, ...props }: Props): ReactNode => {
  return <aside {...props}>{children}</aside>
}
