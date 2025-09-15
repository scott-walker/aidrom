import type { ReactNode } from "react"
import { makeClasses } from "@lib/style-api"

/**
 * Пропсы тега
 * @namespace Shared.UI.Tag.TagProps
 */
type TagProps = {
  children: ReactNode
  className?: string
  schema?: "soft" | "hard"
}

/**
 * Тег
 * @namespace Shared.UI.Tag
 * @param {TagProps} props
 * @returns {ReactNode}
 */
export const Tag = ({ schema = "soft", children, className = "" }: TagProps): ReactNode => {
  const classes = makeClasses(
    "inline-flex",
    "items-center",
    "justify-center",
    "gap-2",
    "px-3",
    "py-1",
    "rounded-xl",
    "text-sm",
    "font-bold",
    schema === "soft" && "bg-primary-ghost-hard",
    schema === "soft" && "text-primary/60",
    schema === "hard" && "bg-secondary",
    schema === "hard" && "text-secondary-foreground",
    className
  )

  return <div className={classes}>{children}</div>
}
