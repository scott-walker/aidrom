import { useContext, type ComponentProps, type FC, type ReactNode } from "react"
import { IconButton } from "@ui/IconButton"
import { LayoutContext, type ILayoutContext } from "./context"

/**
 * Пропсы для триггера переключения темы
 * @namespace Layouts.Lucent.ThemeTrigger.Props
 * @property {string} className
 * @property {ComponentProps<"button">} props
 */
type Props = ComponentProps<"button">

/**
 * Триггер для переключения темы
 * @namespace Layouts.Lucent.ThemeTrigger
 * @returns {ReactNode}
 */
export const ThemeTrigger: FC<Props> = ({ className, ...props }: Props): ReactNode => {
  const { isDarkTheme, toggleTheme } = useContext(LayoutContext) as ILayoutContext
  const icon = isDarkTheme() ? "sun" : "moon"

  return <IconButton variant="hard" icon={icon} onClick={toggleTheme} className={className} {...props} />
}
