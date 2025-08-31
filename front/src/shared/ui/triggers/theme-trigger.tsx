import type { ComponentProps, FC, ReactNode } from "react"
import { useLayout } from "@scottwalker/lucent"
import { IconButton } from "@shared/ui/icon-button"

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
      variant="hard"
      circle={true}
      icon={iconName}
      iconSize={24}
      iconStrokeWidth={2}
      hoverVariant={null}
      onClick={toggleThemeMode}
      {...props}
    />
  )
}
