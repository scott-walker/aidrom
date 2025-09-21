import type { ReactNode } from "react"
import { makeClasses } from "@lib/style-api"

/**
 * Пропсы бренда
 * @namespace Components.Brand.Props
 */
interface BrandProps {
  className?: string
}

/**
 * Бренд
 * @namespace Components.Brand
 */
export const Brand = ({ className = "" }: BrandProps): ReactNode => {
  const containerClasses = makeClasses(
    "relative",
    "flex",
    "flex-col",
    "items-start",
    "justify-center",
    "select-none",
    "font-family-display",
    className
  )
  const titleClasses = makeClasses("font-mega-bold", "text-foreground-hard", "text-2xl")
  const subtitleClasses = makeClasses("relative text-foreground -top-1 text-xs")

  return (
    <div className={containerClasses}>
      <span className={titleClasses}>AIDrom</span>
      <span className={subtitleClasses}>version 0.1</span>
    </div>
  )
}
