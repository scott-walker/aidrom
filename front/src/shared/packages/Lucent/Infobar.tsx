import { useContext, type ComponentProps, type FC, type ReactNode } from "react"
import { cn } from "@utils/jsxtools"
import { Code } from "@ui/Code"
import { LayoutContext, type ILayoutContext } from "./context"
import styles from "./Lucent.module.css"

/**
 * Пропсы инфобара
 * @namespace Layouts.Lucent.Infobar.Props
 */
type Props = ComponentProps<"aside"> & {
  visible?: boolean
}

/**
 * Инфобар макета
 * @namespace Layouts.Lucent.Infobar
 * @param {Props} props.children - контент
 * @returns {ReactNode}
 */
export const Infobar: FC<Props> = ({ children, ...props }: Props): ReactNode => {
  const { isInfobarVisible } = useContext(LayoutContext) as ILayoutContext
  const hidden = !isInfobarVisible()
  const infobarClasses = cn(styles.layoutInfobar, hidden && styles.infobarHidden)
  const infobarInnerClasses = cn(styles.layoutInfobarInner, hidden && styles.infobarHidden)

  return (
    <aside {...props} className={infobarClasses}>
      <div className={infobarInnerClasses}>
        <h2>Это инфобар</h2>
        <Code className="mt-10">console.log("Hello, world!")</Code>
        {children}
      </div>
    </aside>
  )
}
