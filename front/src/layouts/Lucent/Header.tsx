import type { ComponentProps, FC, ReactNode } from "react"
import { cn } from "@utils/jsxtools"
import { SidebarTrigger } from "./SidebarTrigger"
import { ThemeTrigger } from "./ThemeTrigger"
import styles from "./Lucent.module.css"

/**
 * Пропсы шапки макета
 * @namespace Layouts.Lucent.Header.Props
 */
type Props = ComponentProps<"header">

/**
 * Шапка макета
 * @namespace Layouts.Lucent.Header
 * @param {Props} props.children - контент
 * @returns {ReactNode}
 */
export const Header: FC<Props> = ({ children, ...props }: Props): ReactNode => {
  const headerClasses = cn(styles.layoutHeader)
  const headerInnerClasses = cn(styles.layoutHeaderInner)

  return (
    <header className={headerClasses} {...props}>
      <div className={headerInnerClasses}>
        <SidebarTrigger />
        <h1 className="text-2xl font-family-display">Панель</h1>
        {children}
        <ThemeTrigger className="ml-auto" />
      </div>
    </header>
  )
}
