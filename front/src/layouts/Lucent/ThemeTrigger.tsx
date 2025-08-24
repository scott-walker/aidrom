import { useContext, type ComponentProps, type FC, type ReactNode } from "react"
import { Button } from "@ui/Button"
import { Icon } from "@ui/Icon"
import { LayoutContext, type ILayoutContext, THEME_LIGHT, THEME_DARK } from "./context"

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
  const { theme, setTheme } = useContext(LayoutContext) as ILayoutContext
  const icon = theme === THEME_LIGHT ? "moon" : "sun"

  const toggleTheme = (): void => {
    const newTheme = theme === THEME_LIGHT ? THEME_DARK : THEME_LIGHT

    setTheme(newTheme)

    document.body.removeAttribute("data-theme")
    document.body.setAttribute("data-theme", newTheme)
  }

  return (
    <Button variant="soft" onClick={toggleTheme} className={className} {...props}>
      <Icon name={icon} size={24} strokeWidth={3} />
    </Button>
  )
}
