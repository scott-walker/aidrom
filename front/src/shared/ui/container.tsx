import type { ReactNode, JSX } from "react"
import { makeClasses } from "@lib/style-api"

/**
 * Пропсы контейнера
 * @namespace Shared.UI.Container.ContainerProps
 */
type ContainerProps = {
  as?: keyof JSX.IntrinsicElements
  children: ReactNode
  className?: string
  [key: string]: unknown
}

/**
 * Контейнер для содержимого страницы
 * @namespace Shared.UI.Container
 */
export const Container = ({ as: Component = "div", children, className, ...props }: ContainerProps) => {
  const classes = makeClasses("px-(--layout-inner-offset-x)", "py-(--layout-inner-offset-y)", className)

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  )
}
