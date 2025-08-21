import type { ComponentProps, FC, ReactNode } from "react"
import { cn, cva } from "@utils/jsxtools"

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
export const Infobar: FC<Props> = ({ children, shown = false, className = "", ...props }: Props): ReactNode => {
  const infobarClasses = cn(
    "bg-background-accent",
    "rounded-sm",
    "shadow-2xl",
    "shadow-foreground-accent/10",
    "transition-width",
    "transition-margin",
    "duration-100",
    className
  )
  const infobarVariants = cva(infobarClasses, {
    variants: {
      shown: {
        false: "m-0 w-0",
        true: "m-5 w-1/4"
      }
    },
    defaultVariants: {
      shown: false
    }
  })

  const innerClasses = cn("flex", "flex-col", "gap-4", "p-7", "transition-opacity", className)
  const innerVariants = cva(innerClasses, {
    variants: {
      shown: {
        false: "opacity-0 duration-20",
        true: "opacity-100 duration-800"
      }
    },
    defaultVariants: {
      shown: false
    }
  })

  return (
    <aside className={infobarVariants({ shown })} {...props}>
      <div className={innerVariants({ shown })}>{children}</div>
    </aside>
  )
}
