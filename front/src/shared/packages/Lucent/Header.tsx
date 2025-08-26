import type { ComponentProps, FC, ReactNode } from "react"
import { cn } from "@utils/jsxtools"
import { SidebarTrigger } from "./SidebarTrigger"
import { InfobarTrigger } from "./InfobarTrigger"
import { ThemeTrigger } from "./ThemeTrigger"
import { FooterTrigger } from "./FooterTrigger"
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
        <InfobarTrigger className="ml-auto" />
        <FooterTrigger />
        <ThemeTrigger />
      </div>
    </header>
  )
}
