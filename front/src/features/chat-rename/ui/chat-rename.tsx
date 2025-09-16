import { Popover } from "@ui/popover"
import { InputLight } from "@ui/input-light"
import { IconButton } from "@ui/icon-button"
import type { Chat } from "@entities/chat"
import { useRename } from "../lib/use-rename"
import { Tooltip } from "@shared/ui/tooltip"

/**
 * Пропсы для компонента
 * @namespace Features.ChatRename.UI.ChatRenameProps
 */
type ChatRenameProps = {
  chat: Chat
}

/**
 * Редактируемое название чата
 * @namespace Features.ChatRename.UI.ChatRename
 */
export const ChatRename = ({ chat }: ChatRenameProps) => {
  const { isOpen, setIsOpen, handleChange, handleSave, handleCancel, isPending } = useRename(chat)

  const trigger = (
    <div className="flex items-center">
      <Tooltip text="Изменить название чата">
        <IconButton icon="pencil-line" iconSize={20} />
      </Tooltip>
    </div>
  )

  return (
    <Popover trigger={trigger} open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex items-center gap-2">
        <InputLight
          value={chat.title}
          autoFocus
          autoSelect
          onChange={handleChange}
          onEnter={handleSave}
          maxLength={40}
          placeholder="Название чата"
        />
        <IconButton icon="check" iconSize={18} schema="primary" circle onClick={handleSave} disabled={isPending} />
        <IconButton icon="x" iconSize={18} onClick={handleCancel} />
      </div>
    </Popover>
  )
}
