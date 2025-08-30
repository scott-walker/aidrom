import type { ComponentProps, FC, ReactNode } from "react"
import { useLayout } from "@scottwalker/lucent"
import { useHover } from "@shared/hooks/use-hover"
import { cn } from "@utils/jsxtools"
import { IconButton } from "@shared/ui/icon-button"

/**
 * Пропсы триггера сайдбара
 * @namespace Shared.UI.SidebarVisibleTrigger.Props
 */
type Props = ComponentProps<"button">

/**
 * Названия иконок триггера сайдбара
 * @namespace Shared.UI.SidebarVisibleTrigger.IconName
 */
type IconName = "menu" | "chevron-left" | "chevron-right"

/**
 * Триггер для сайдбара
 * @namespace Shared.UI.SidebarVisibleTrigger
 */
export const SidebarVisibleTrigger: FC<Props> = ({ ...props }): ReactNode => {
  const { isHovered, handlers } = useHover()
  const { isSidebarHidden, toggleSidebarVisibleMode } = useLayout()

  const actionIconName = isSidebarHidden ? "chevron-right" : "chevron-left"
  const iconName: IconName = isHovered ? actionIconName : "menu"
  const buttonClasses = cn("p-0 w-10 h-10")
  const iconClasses = cn("transition-transform", "duration-200", "ease-in-out", isHovered && "rotate-360")

  return (
    <IconButton
      icon={iconName}
      iconClassName={iconClasses}
      className={buttonClasses}
      onClick={toggleSidebarVisibleMode}
      {...props}
      {...handlers}
    />
  )
}
