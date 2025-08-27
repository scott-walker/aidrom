import { type ComponentProps, type FC, type ReactNode } from "react"
import { IconButton } from "@ui/IconButton"
import { useLayout } from "@packages/Lucent/context"

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
  const icon = isThemeDark() ? "sun" : "moon"

  return <IconButton variant="hard" icon={icon} onClick={toggleThemeMode} {...props} />
}
