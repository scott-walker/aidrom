import type { ComponentProps, FC, ReactNode } from "react"
import { IconButton } from "@ui/IconButton"
import { useLayout } from "@packages/Lucent"

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
  const iconName = isThemeDark() ? "sun" : "moon"

  return <IconButton variant="hard" icon={iconName} onClick={toggleThemeMode} {...props} />
}
