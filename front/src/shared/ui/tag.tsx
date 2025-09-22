import type { ReactNode } from "react"
import { makeClasses, makeVariants } from "@lib/style-api"

/**
 * Пропсы тега
 * @namespace Shared.UI.Tag.TagProps
 */
type TagProps = {
  children: ReactNode
  className?: string
  schema?: "soft" | "hard" | "positive" | "danger"
}

/**
 * Тег
 * @namespace Shared.UI.Tag
 * @param {TagProps} props
 * @returns {ReactNode}
 */
export const Tag = ({ schema = "soft", children, className = "" }: TagProps): ReactNode => {
  const getVariant = makeVariants({
    beforeClasses: makeClasses(
      "inline-flex",
      "items-center",
      "justify-center",
      "gap-2",
      "px-3",
      "py-1",
      "rounded-xl",
      "text-sm",
      "font-bold"
    ),
    afterClasses: className,
    variants: {
      soft: makeClasses("bg-primary-ghost-hard", "text-primary/60", "dark:bg-primary/20", "dark:text-primary"),
      hard: makeClasses("bg-secondary", "text-secondary-foreground"),
      positive: makeClasses("bg-positive", "text-positive-foreground"),
      danger: makeClasses("bg-danger", "text-danger-foreground")
    }
  })

  return <div className={getVariant(schema)}>{children}</div>
}
