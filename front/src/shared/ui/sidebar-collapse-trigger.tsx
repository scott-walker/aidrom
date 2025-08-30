import type { ComponentProps, FC, ReactNode } from "react"
import { useLayout } from "@scottwalker/lucent"
import { useHover } from "@shared/hooks/use-hover"
import { cn } from "@utils/jsxtools"
import { IconButton } from "@shared/ui/icon-button"

/**
 * Пропсы триггера схлопывания сайдбара
 * @namespace Shared.UI.SidebarCollapseTrigger.Props
 */
type Props = ComponentProps<"button">

/**
 * Названия иконок триггера схлопывания сайдбара
 * @namespace Shared.UI.SidebarCollapseTrigger.IconName
 */
type IconName = "chevron-left" | "chevron-right"

/**
 * Триггер для схлопывания сайдбара
 * @namespace Shared.UI.SidebarCollapseTrigger
 */
export const SidebarCollapseTrigger: FC<Props> = ({ ...props }): ReactNode => {
  const { isHovered, handlers } = useHover()
  const { isSidebarCollapsed, toggleSidebarCollapsedMode } = useLayout()

  const actionIconName = isSidebarCollapsed ? "chevron-right" : "chevron-left"
  const iconName: IconName = actionIconName
  const buttonClasses = cn("p-0 w-10 h-10")
  const iconClasses = cn("transition-transform", "duration-200", "ease-in-out", isHovered && "rotate-360")

  return (
    <IconButton
      icon={iconName}
      iconClassName={iconClasses}
      className={buttonClasses}
      onClick={toggleSidebarCollapsedMode}
      {...props}
      {...handlers}
    />
  )
}
