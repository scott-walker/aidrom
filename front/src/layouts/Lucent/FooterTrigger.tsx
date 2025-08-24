import { useContext, type ComponentProps, type FC, type ReactNode } from "react"
import { LayoutContext, type ILayoutContext } from "./context"
import { cn } from "@utils/jsxtools"
import { IconButton } from "@ui/IconButton"

/**
 * Пропсы триггера футера
 * @namespace Layouts.Lucent.FooterTrigger.Props
 */
type Props = ComponentProps<"button">

/**
 * Триггер для футера
 * @namespace Layouts.Lucent.FooterTrigger
 * @returns {ReactNode}
 */
export const FooterTrigger: FC<Props> = ({ ...props }: Props): ReactNode => {
  const { isFooterVisible, toggleFooterVisible } = useContext(LayoutContext) as ILayoutContext
  const iconClasses = cn("rotate-270")
  const iconName = isFooterVisible() ? "sidebar-close" : "sidebar-open"

  return <IconButton icon={iconName} iconClassName={iconClasses} onClick={toggleFooterVisible} {...props} />
}
