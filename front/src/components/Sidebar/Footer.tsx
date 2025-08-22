import type { ComponentProps, FC, ReactNode } from "react"

/**
 * Пропсы футера
 * @namespace Components.Sidebar.Footer.Props
 */
type Props = ComponentProps<"footer">

/**
 * Футер сайдбара
 * @namespace Components.Sidebar.Footer
 * @param {Props} props.children - контент
 * @returns {ReactNode}
 */
export const Footer: FC<Props> = ({ children, ...props }: Props): ReactNode => {
  return <footer {...props}>{children}</footer>
}
