import type { ComponentProps, FC, ReactNode } from "react"
import { useLayout } from "@packages/Lucent"
import { IconButton } from "@ui/IconButton"
import { cn } from "@utils/jsxtools"

/**
 * Пропсы триггера футера
 * @namespace Lucent.FooterTrigger.Props
 */
type Props = ComponentProps<"button">

/**
 * Триггер для футера
 * @namespace Lucent.FooterTrigger
 * @returns {ReactNode}
 */
export const FooterTrigger: FC<Props> = ({ ...props }: Props): ReactNode => {
  const { isFooterVisible, toggleFooterMode } = useLayout()
  const iconClasses = cn("rotate-270")
  const iconName = isFooterVisible() ? "sidebar-close" : "sidebar-open"

  return <IconButton icon={iconName} iconClassName={iconClasses} onClick={toggleFooterMode} {...props} />
}
