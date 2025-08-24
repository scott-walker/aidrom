import { useContext, type ComponentProps, type FC, type ReactNode } from "react"
import { cn } from "@utils/jsxtools"
import { Code } from "@ui/Code"
import styles from "./Lucent.module.css"
import { LayoutContext, type ILayoutContext } from "./context"

/**
 * Пропсы инфобара
 * @namespace Layouts.Lucent.Infobar.Props
 */
type Props = ComponentProps<"aside"> & {
  collapsed?: boolean
}

/**
 * Инфобар макета
 * @namespace Layouts.Lucent.Infobar
 * @param {Props} props.children - контент
 * @returns {ReactNode}
 */
export const Infobar: FC<Props> = ({ children, ...props }: Props): ReactNode => {
  const { infobarCollapsed } = useContext(LayoutContext) as ILayoutContext
  const infobarClasses = cn(styles.layoutInfobar, infobarCollapsed && styles.collapsed)

  return (
    <aside {...props} className={infobarClasses}>
      <div className={styles.layoutInfobarInner}>
        <h2>Это инфобар</h2>
        <Code className="mt-10">console.log("Hello, world!")</Code>
        {children}
      </div>
    </aside>
  )
}
