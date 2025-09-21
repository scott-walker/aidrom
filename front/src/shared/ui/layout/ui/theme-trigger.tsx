import type { ReactNode } from "react"
import { useToggleTheme } from "@lib/layout-api"
import { IconButton } from "@ui/icon-button"

/**
 * Пропсы для триггера переключения темы
 * @namespace Shared.UI.ThemeTrigger.Props
 */
interface ThemeTriggerProps {
  className?: string
}

/**
 * Триггер для переключения темы
 * @namespace Shared.UI.ThemeTrigger
 */
export const ThemeTrigger = ({ className = "" }: ThemeTriggerProps): ReactNode => {
  const { isDark, toggleTheme } = useToggleTheme()
  const iconName = isDark ? "sun" : "moon"

  return (
    <IconButton
      schema="hard"
      circle
      icon={iconName}
      iconSize={18}
      onClick={() => toggleTheme()}
      className={className}
    />
  )
}
