import type { ComponentProps, FC, ReactNode } from "react"
import { useContext } from "react"
import { LayoutContext, type ILayoutContext } from "./context"
import { cn } from "@utils/jsxtools"
import styles from "./Lucent.module.css"

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
  const { sidebarCollapsed } = useContext(LayoutContext) as ILayoutContext
  const pageClasses = cn(styles.layoutPage, sidebarCollapsed && styles.expanded)

  return (
    <div className={pageClasses} {...props}>
      {children}
    </div>
  )
}
