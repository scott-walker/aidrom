import type { ComponentProps, FC, ReactNode } from "react"
import { useLayout } from "@scottwalker/lucent"
import { IconButton } from "@shared/ui/icon-button"
import { cn } from "@utils/jsxtools"

/**
 * Пропсы триггера хедера
 * @namespace Shared.UI.HeaderVisibleTrigger.Props
 */
type Props = ComponentProps<"button">

/**
 * Триггер для хедера
 * @namespace Shared.UI.HeaderVisibleTrigger
 * @returns {ReactNode}
 */
export const HeaderVisibleTrigger: FC<Props> = ({ ...props }: Props): ReactNode => {
  const { isHeaderHidden, toggleHeaderVisibleMode } = useLayout()
  const iconClasses = cn("rotate-90")
  const iconName = isHeaderHidden ? "sidebar-open" : "sidebar-close"

  return <IconButton icon={iconName} iconClassName={iconClasses} onClick={toggleHeaderVisibleMode} {...props} />
}
