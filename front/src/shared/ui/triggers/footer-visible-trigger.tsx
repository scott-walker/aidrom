import type { ComponentProps, FC, ReactNode } from "react"
import { useLayout } from "@scottwalker/lucent"
import { IconButton } from "@shared/ui/icon-button"

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
  const iconName = isFooterHidden ? "panel-bottom-open" : "panel-bottom-close"

  return (
    <IconButton
      icon={iconName}
      iconSize={36}
      iconStrokeWidth={2}
      full={true}
      onClick={toggleFooterVisibleMode}
      {...props}
    />
  )
}
