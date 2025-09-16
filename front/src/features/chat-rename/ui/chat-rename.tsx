import { Popover } from "@ui/popover"
import { InputLight } from "@ui/input-light"
import { IconButton } from "@ui/icon-button"
import type { Chat } from "@entities/chat"
import { useRename } from "../lib/use-rename"

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
  const trigger = <IconButton icon="pencil-line" iconSize={20} />
  const { isOpen, setIsOpen, handleChange, handleSave, handleCancel, isPending } = useRename(chat)

  return (
    <Popover trigger={trigger} open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex gap-2">
        <InputLight
          value={chat.title}
          autoFocus
          autoSelect
          onChange={handleChange}
          onEnter={handleSave}
          maxLength={40}
          placeholder="Название чата"
        />
        <IconButton icon="check" schema="primary" circle onClick={handleSave} disabled={isPending} />
        <IconButton icon="x" onClick={handleCancel} />
      </div>
    </Popover>
  )
}
