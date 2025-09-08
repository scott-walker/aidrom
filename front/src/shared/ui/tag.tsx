import type { ReactNode } from "react"
import { makeClasses } from "@lib/style-api"

/**
 * Пропсы тега
 * @namespace Shared.UI.Tag.TagProps
 */
type TagProps = {
  children: ReactNode
  className?: string
}

/**
 * Тег
 * @namespace Shared.UI.Tag
 * @param {TagProps} props
 * @returns {ReactNode}
 */
export const Tag = ({ children, className = "" }: TagProps): ReactNode => {
  const classes = makeClasses(
    "inline-flex",
    "items-center",
    "justify-center",
    "gap-2",
    "px-3",
    "py-0",
    "rounded-xl",
    "bg-primary-ghost-hard",
    "text-primary/60",
    className
  )

  return <div className={classes}>{children}</div>
}
