import type { ComponentProps, FC, JSX } from "react"
import { Icon } from "@ui/Icon"
import { Button } from "@ui/Button"
import { useHover } from "@hooks/useHover"
import { cn } from "@utils/jsxtools"

/**
 * Пропсы
 * @namespace Layouts.Lucent.Sidebar.Trigger.Props
 */
type Props = ComponentProps<"button">

/**
 * Названия иконок
 * @namespace Layouts.Lucent.Sidebar.Trigger.IconName
 */
type IconName = "menu" | "chevron-left" | "chevron-right"

/**
 * Триггер для сайдбара
 * @namespace Layouts.Lucent.Sidebar.Trigger
 * @param {Props} props
 * @returns {JSX.Element}
 */
export const Trigger: FC<Props> = ({ ...props }: Props): JSX.Element => {
  const { isHovered, handlers } = useHover()
  const iconName: IconName = isHovered ? "chevron-left" : "menu"
  const classes = cn("transition-transform duration-100 ease-in-out", isHovered && "rotate-360")

  return (
    <Button variant="primary" {...props} {...handlers}>
      <Icon name={iconName} size={24} strokeWidth={3} className={classes} />
    </Button>
  )
}
