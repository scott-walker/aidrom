import type { FC, JSX } from "react"
import { DynamicIcon, type IconName } from "lucide-react/dynamic"

/**
 * Пропсы
 * @namespace Ui.Icon.Props
 * @param {IconName} props.name - Название иконки (https://lucide.dev/icons/)
 * @param {string} props.color - Цвет иконки
 * @param {number} props.size - Размер иконки (по умолчанию: 24)
 * @param {number} props.strokeWidth - Толщина обводки иконки (по умолчанию: 2)
 * @param {boolean} props.absoluteStrokeWidth - Использовать абсолютную толщину обводки (по умолчанию: false)
 * @param {string} props.className - CSS-класс иконки (по умолчанию: "")
 * @param {IconNode} props.children - Дочерние элементы иконки (по умолчанию: undefined)
 * @param {IconNode} props.iconNode - Узел иконки (по умолчанию: undefined)
 */
type Props = {
  name: IconName
  className?: string
  size?: number | string
  strokeWidth?: number
  color?: string
  fill?: string
  stroke?: string
  strokeOpacity?: number
  strokeLinecap?: "butt" | "round" | "square"
  strokeLinejoin?: "miter" | "round" | "bevel"
  strokeMiterlimit?: number
}

/**
 * Иконка
 * @namespace Ui.Icon
 * @param {Props} props
 * @returns {JSX.Element}
 */
export const Icon: FC<Props> = ({ name, ...props }: Props): JSX.Element => {
  return <DynamicIcon name={name} {...props} />
}
