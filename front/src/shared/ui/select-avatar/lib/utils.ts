import { createAvatar } from "@dicebear/core"
import { bottts } from "@dicebear/collection"

/**
 * Опции для создания аватара
 * @namespace Shared.UI.AvatarSelect.Lib.Options
 */
type Options = {
  size?: number
  color?: string
}

/**
 * Создать аватар
 * @namespace Shared.UI.AvatarSelect.Lib.makeAvatar
 */
export const makeAvatar = (seed: string, options: Options = {}) => {
  const color = (options.color ?? "#00acc1").replace("#", "")

  const avatar = createAvatar(bottts, {
    seed: seed,
    size: options.size ?? 128,
    baseColor: [color]
  })

  return avatar.toDataUri()
}

/**
 * Список аватаров
 * @namespace Shared.UI.AvatarSelect.Lib.avatarList
 */
export const avatarList = [
  { label: "Роберт", value: "Robert" },
  { label: "Айвери", value: "Avery" },
  { label: "Сара", value: "Sara" },
  { label: "Сади", value: "Sadie" },
  { label: "Анека", value: "Aneka" },
  { label: "Феликс", value: "Felix" }
]
