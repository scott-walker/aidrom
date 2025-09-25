import type { ReactNode } from "react"
import { useToggleTheme } from "@lib/layout-api"
import { IconButton } from "@ui/icon-button"
import { makeClasses } from "@shared/lib/style-api"

/**
 * Пропсы для триггера переключения темы
 * @namespace Features.LayoutThemeTrigger.Props
 */
interface LayoutThemeTriggerProps {
  className?: string
}

/**
 * Триггер для переключения темы
 * @namespace Features.LayoutThemeTrigger
 */
export const LayoutThemeTrigger = ({ className = "" }: LayoutThemeTriggerProps): ReactNode => {
  const classes = makeClasses("w-9 h-9", className)
  const { isDark, toggleTheme } = useToggleTheme()
  const iconName = isDark ? "sun" : "moon"

  return (
    <IconButton schema="hard" circle icon={iconName} iconSize={18} onClick={() => toggleTheme()} className={classes} />
  )
}
