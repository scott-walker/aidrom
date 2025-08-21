import { useContext, type ComponentProps, type FC, type ReactNode } from "react"
import { cn } from "@utils/jsxtools"
import { useHover } from "@hooks/useHover"
import { Icon } from "@ui/Icon"
import { Button } from "@ui/Button"
import { LayoutContext, type ILayoutContext } from "./context"

/**
 * Пропсы триггера сайдбара
 * @namespace Layouts.Lucent.SidebarTrigger.Props
 */
type Props = ComponentProps<"button">

/**
 * Названия иконок триггера сайдбара
 * @namespace Layouts.Lucent.SidebarTrigger.IconName
 */
type IconName = "menu" | "chevron-left" | "chevron-right"

/**
 * Триггер для сайдбара
 * @namespace Layouts.Lucent.SidebarTrigger
 * @param {Props} props
 * @returns {ReactNode}
 */
export const SidebarTrigger: FC<Props> = ({ ...props }: Props): ReactNode => {
  const { sidebarCollapsed, setSidebarCollapsed } = useContext(LayoutContext) as ILayoutContext
  const { isHovered, handlers } = useHover()

  const toggleCollapsed = (): void => setSidebarCollapsed(!sidebarCollapsed)

  const iconName: IconName = isHovered ? "chevron-left" : "menu"
  const classes = cn("transition-transform duration-200 ease-in-out", isHovered && "rotate-360")

  return (
    <Button variant="primary" {...props} {...handlers} onClick={toggleCollapsed}>
      <Icon name={iconName} size={24} strokeWidth={3} className={classes} />
    </Button>
  )
}
