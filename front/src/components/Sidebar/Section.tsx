import type { ComponentProps, FC, ReactNode } from "react"

/**
 * Пропсы секции
 * @namespace Components.Sidebar.Section.Props
 */
type Props = ComponentProps<"section">

/**
 * Секция сайдбара
 * @namespace Components.Sidebar.Section
 * @param {Props} props.children - контент
 * @returns {ReactNode}
 */
export const Section: FC<Props> = ({ children, ...props }: Props): ReactNode => {
  return <section {...props}>{children}</section>
}
