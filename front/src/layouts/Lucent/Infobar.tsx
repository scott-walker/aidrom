import type { ComponentProps, FC, JSX } from "react"
import { cn } from "@utils/jsxtools"

/**
 * Пропсы
 * @namespace Layouts.Lucent.Infobar.Props
 */
type Props = ComponentProps<"aside">

/**
 * Инфобар (основной компонент)
 * @namespace Layouts.Lucent.Infobar
 * @returns {JSX.Element}
 */
export const Infobar: FC<Props> = ({ children, className, ...props }: Props): JSX.Element => {
  const classes = cn(
    "m-5",
    "p-7",
    "bg-background-accent",
    "rounded-sm",
    "shadow-2xl",
    "shadow-foreground-accent/10",
    className
  )

  return (
    <aside className={classes} {...props}>
      {children}
    </aside>
  )
}
