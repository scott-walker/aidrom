import type { ComponentProps, FC, ReactNode } from "react"
import { DynamicIcon, type IconName } from "lucide-react/dynamic"

/**
 * Пропсы иконки
 * @namespace Ui.Icon.Props
 */
export type Props = ComponentProps<typeof DynamicIcon>

/**
 * Название иконки
 * @namespace Ui.Icon.IconName
 */
export type { IconName }

/**
 * Иконка (https://lucide.dev/icons)
 * @namespace Ui.Icon
 * @param {Props} props
 * @returns {ReactNode}
 */
export const Icon: FC<Props> = ({ name, ...props }: Props): ReactNode => {
  return <DynamicIcon className="inline-block" color="currentColor" name={name} {...props} />
}
