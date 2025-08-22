import type { ComponentProps, FC, ReactNode } from "react"
import styles from "./Lucent.module.css"

/**
 * Пропсы тела макета
 * @namespace Layouts.Lucent.Body.Props
 */
type Props = ComponentProps<"div">

/**
 * Тело макета
 * @namespace Layouts.Lucent.Body
 * @param {Props} props.children - контент
 * @returns {ReactNode}
 */
export const Body: FC<Props> = ({ children, ...props }: Props): ReactNode => {
  return (
    <div className={styles.layoutBody} {...props}>
      {children}
    </div>
  )
}
