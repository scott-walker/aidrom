import type { ComponentProps, FC, ReactNode } from "react"
import { cn } from "@utils/jsxtools"
import styles from "./typography.module.css"

/**
 * Пропсы компонента
 * @namespace UI.Typography.Props
 */
type Props = ComponentProps<"div">

/**
 * Компонент контейнер для верного отображения текста
 * @namespace UI.Typography
 * @param {Props} props
 * @returns {ReactNode}
 */
export const Typography: FC<Props> = ({ children, className, ...props }: Props): ReactNode => {
  return (
    <div className={cn(styles.container, className)} {...props}>
      {children}
    </div>
  )
}
