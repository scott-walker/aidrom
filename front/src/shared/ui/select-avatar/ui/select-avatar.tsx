import { useState, useEffect } from "react"
import { Avatar } from "@ui/avatar"
import { Select, type SelectProps } from "@shared/ui/select-old"
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
  const [avatar, setAvatar] = useState<string | undefined>(value ?? undefined)
  const [seed, setSeed] = useState(avatarList[0].value)
  const [color, setColor] = useState("#ffffff")

  useEffect(() => {
    const avatar = makeAvatar(seed, { color })

    setAvatar(avatar)
    onChangeValue?.(avatar)
  }, [seed, color, onChangeValue])

  const handleSeedChange = (value: string | null) => {
    if (value) setSeed(value)
  }

  const handleColorChange = (value: string | null) => {
    if (value) setColor(value)
  }

  return (
    <div className="flex items-center justify-center gap-4">
      <Avatar src={avatar} size="xl" />
      <Select
        className="w-fit"
        {...props}
        items={avatarList}
        value={seed}
        onChangeValue={handleSeedChange}
        disabled={disabled}
      />
      <SelectColor className="w-fit" value={color} onChangeValue={handleColorChange} disabled={disabled} />
    </div>
  )
}
