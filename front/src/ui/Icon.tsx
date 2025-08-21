import type { ComponentProps, FC, ReactNode } from "react"
import { DynamicIcon, type IconName } from "lucide-react/dynamic"

/**
 * Пропсы иконки
 * @namespace Ui.Icon.Props
 */
type Props = ComponentProps<typeof DynamicIcon>

/**
 * Иконка (https://lucide.dev/icons)
 * @namespace Ui.Icon
 * @param {Props} props
 * @returns {ReactNode}
 */
export const Icon: FC<Props> = ({ name, ...props }: Props): ReactNode => {
  return <DynamicIcon name={name} {...props} />
}

export type { IconName }
