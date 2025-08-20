import type { ComponentProps, FC, JSX } from "react"

/**
 * Пропсы
 * @namespace Layouts.Lucent.Sidebar.Header.Props
 */
type Props = ComponentProps<"header">

/**
 * Шапка сайдбара
 * @namespace Layouts.Lucent.Sidebar.Header
 * @returns {JSX.Element}
 */
export const Header: FC<Props> = ({ children, ...props }: Props): JSX.Element => {
  return (
    <header className="flex items-center justify-center p-6" {...props}>
      {children}
    </header>
  )
}
