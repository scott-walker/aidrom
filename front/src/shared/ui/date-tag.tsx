import { makeClasses } from "@lib/style-api"
import type { ComponentProps } from "react"

type DateTagProps = ComponentProps<"div"> & {
  date: Date
}

/**
 * Тег даты
 * @namespace Shared.UI.DateTag
 */
export const DateTag = ({ date, className = "", ...props }: DateTagProps) => {
  const classes = makeClasses("text-sm", "text-foreground-soft/60", "font-bold", className)

  return (
    <div className={classes} {...props}>
      {new Date(date).toLocaleString("ru-RU", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
      })}
    </div>
  )
}
