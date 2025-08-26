import { useContext, type ComponentProps, type FC, type ReactNode } from "react"
import { cn } from "@utils/jsxtools"
import { useHover } from "@hooks/useHover"
import { IconButton } from "@ui/IconButton"
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
  const { isHovered, handlers } = useHover()
  const { isSidebarCollapsed, toggleSidebarCollapsed } = useContext(LayoutContext) as ILayoutContext
  // const isCollapsed = isSidebarCollapsed()

  const actionIconName = isSidebarCollapsed() ? "chevron-right" : "chevron-left"
  const iconName: IconName = isHovered ? actionIconName : "menu"
  // const iconName = "panel-right"
  const buttonClasses = cn("p-0 w-10 h-10")
  const iconClasses = cn("transition-transform", "duration-200", "ease-in-out", isHovered && "rotate-360")
  // const iconClasses = cn("rotate-180")

  return (
    <IconButton
      icon={iconName}
      iconClassName={iconClasses}
      className={buttonClasses}
      onClick={toggleSidebarCollapsed}
      {...props}
      {...handlers}
    />
  )
}
