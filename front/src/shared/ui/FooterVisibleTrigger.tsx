import type { ComponentProps, FC, ReactNode } from "react"
import { useLayout } from "@packages/Lucent"
import { IconButton } from "@ui/IconButton"
import { cn } from "@utils/jsxtools"

/**
 * Пропсы триггера футера
 * @namespace Shared.UI.FooterVisibleTrigger.Props
 */
type Props = ComponentProps<"button">

/**
 * Триггер для футера
 * @namespace Shared.UI.FooterVisibleTrigger
 * @returns {ReactNode}
 */
export const FooterVisibleTrigger: FC<Props> = ({ ...props }: Props): ReactNode => {
  const { isFooterHidden, toggleFooterVisibleMode } = useLayout()
  const iconClasses = cn("rotate-270")
  const iconName = isFooterHidden() ? "sidebar-open" : "sidebar-close"

  return <IconButton icon={iconName} iconClassName={iconClasses} onClick={toggleFooterVisibleMode} {...props} />
}
