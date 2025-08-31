import type { ComponentProps, FC, ReactNode } from "react"
import { useLayout } from "@scottwalker/lucent"
import { IconButton } from "@shared/ui/icon-button"

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
  const iconName = isHeaderHidden ? "panel-top-open" : "panel-top-close"

  return (
    <IconButton
      icon={iconName}
      iconSize={36}
      iconStrokeWidth={2}
      full={true}
      onClick={toggleHeaderVisibleMode}
      {...props}
    />
  )
}
