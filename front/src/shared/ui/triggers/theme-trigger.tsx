import type { ComponentProps, FC, ReactNode } from "react"
import { useLayout } from "@scottwalker/lucent"
import { IconButton } from "@ui/icon-button"

/**
 * Пропсы для триггера переключения темы
 * @namespace Shared.UI.ThemeTrigger.Props
 */
type Props = ComponentProps<"button">

/**
 * Триггер для переключения темы
 * @namespace Shared.UI.ThemeTrigger
 */
export const ThemeTrigger: FC<Props> = ({ ...props }): ReactNode => {
  const { isThemeDark, toggleThemeMode } = useLayout()
  const iconName = isThemeDark ? "sun" : "moon"

  return (
    <IconButton
      schema="hard"
      circle
      icon={iconName}
      iconSize={20}
      iconClassName="m-1.5"
      onClick={toggleThemeMode}
      {...props}
    />
  )
}
