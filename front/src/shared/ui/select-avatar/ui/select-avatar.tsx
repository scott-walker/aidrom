import { useState, useEffect } from "react"
import { Avatar } from "@ui/avatar"
import { Select, type SelectProps } from "@ui/select"
import { avatarList, makeAvatar } from "../lib/utils"
import { SelectColor } from "@shared/ui/select-color"

/**
 * Пропсы компонента выбора аватара
 * @namespace Shared.UI.AvatarSelect.Props
 */
type SelectAvatarProps = Omit<SelectProps, "items"> & {
  disabled?: boolean
}

/**
 * Компонент выбора аватара
 * @namespace Shared.UI.AvatarSelect
 */
export const SelectAvatar = ({ value, onChangeValue, disabled, ...props }: SelectAvatarProps) => {
  const [avatar, setAvatar] = useState(value)
  const [seed, setSeed] = useState(avatarList[0].value)
  const [color, setColor] = useState("#ffffff")

  useEffect(() => {
    const avatar = makeAvatar(seed, { color })

    setAvatar(avatar)
    onChangeValue?.(avatar)
  }, [seed, color, onChangeValue])

  return (
    <div className="flex items-center justify-center gap-4">
      <Avatar src={avatar} size="xl" />
      <Select
        className="w-fit"
        {...props}
        items={avatarList}
        value={seed}
        onChangeValue={setSeed}
        disabled={disabled}
      />
      <SelectColor className="w-fit" value={color} onChangeValue={setColor} disabled={disabled} />
    </div>
  )
}
