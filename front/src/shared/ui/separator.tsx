import type { FC, ReactNode } from "react"
import { cn } from "@utils/jsxtools"

/**
 * Пропсы разделителя
 * @namespace UI.Separator.Props
 */
type Props = {
  className?: string
}

/**
 * Разделитель
 * @namespace UI.Separator
 * @returns {ReactNode}
 */
export const Separator: FC<Props> = ({ className }: Props): ReactNode => {
  const classes = cn("w-full", "h-px", "bg-border", className)

  return <div className={classes} />
}
