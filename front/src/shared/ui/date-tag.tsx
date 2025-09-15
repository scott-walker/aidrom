import { makeClasses } from "@lib/style-api"
import type { ComponentProps } from "react"

type DateTagProps = ComponentProps<"div"> & {
  date: Date
  label?: string
  year?: Intl.DateTimeFormatOptions["year"]
  month?: Intl.DateTimeFormatOptions["month"]
  day?: Intl.DateTimeFormatOptions["day"]
  hour?: Intl.DateTimeFormatOptions["hour"]
  minute?: Intl.DateTimeFormatOptions["minute"]
}

/**
 * Тег даты
 * @namespace Shared.UI.DateTag
 */
export const DateTag = ({
  date,
  label = "",
  year = "numeric",
  month = "long",
  day = "numeric",
  hour = "numeric",
  minute = "numeric",
  className = "",
  ...props
}: DateTagProps) => {
  const classes = makeClasses("text-sm", "text-foreground-soft/60", "font-bold", className)

  return (
    <div className={classes} {...props}>
      {label && <div className="text-foreground-soft">{label}</div>}
      {new Date(date).toLocaleString("ru-RU", {
        year,
        month,
        day,
        hour,
        minute
      })}
    </div>
  )
}
