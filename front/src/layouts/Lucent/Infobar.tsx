import type { ComponentProps, FC, ReactNode } from "react"
import styles from "./Lucent.module.css"

/**
 * Пропсы инфобара
 * @namespace Layouts.Lucent.Infobar.Props
 */
type Props = ComponentProps<"aside"> & {
  shown?: boolean
}

/**
 * Инфобар макета
 * @namespace Layouts.Lucent.Infobar
 * @param {Props} props.children - контент
 * @param {Props} props.shown - состояние видимости
 * @param {Props} props.className - классы инфобара
 * @returns {ReactNode}
 */
export const Infobar: FC<Props> = ({ children, ...props }: Props): ReactNode => {
  return (
    <aside {...props}>
      <div className={styles.inner}>{children}</div>
    </aside>
  )
}
