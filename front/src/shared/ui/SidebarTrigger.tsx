import type { ComponentProps, FC, ReactNode } from "react"
import { useHover } from "@hooks/useHover"
import { cn } from "@utils/jsxtools"
import { IconButton } from "@ui/IconButton"
import { useLayout } from "@packages/Lucent/context"

/**
 * Пропсы триггера сайдбара
 * @namespace Shared.UI.SidebarTrigger.Props
 */
type Props = ComponentProps<"button">

/**
 * Названия иконок триггера сайдбара
 * @namespace Shared.UI.SidebarTrigger.IconName
 */
type IconName = "menu" | "chevron-left" | "chevron-right"

/**
 * Триггер для сайдбара
 * @namespace Shared.UI.SidebarTrigger
 */
export const SidebarTrigger: FC<Props> = ({ ...props }): ReactNode => {
  const { isHovered, handlers } = useHover()
  const { isSidebarCollapsed, toggleSidebarMode } = useLayout()

  const actionIconName = isSidebarCollapsed() ? "chevron-right" : "chevron-left"
  const iconName: IconName = isHovered ? actionIconName : "menu"
  const buttonClasses = cn("p-0 w-10 h-10")
  const iconClasses = cn("transition-transform", "duration-200", "ease-in-out", isHovered && "rotate-360")

  return (
    <IconButton
      icon={iconName}
      iconClassName={iconClasses}
      className={buttonClasses}
      onClick={toggleSidebarMode}
      {...props}
      {...handlers}
    />
  )
}
