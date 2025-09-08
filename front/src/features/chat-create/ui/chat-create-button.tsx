import { Button } from "@ui/button"
import { useCreateNewChat } from "../lib/use-create-chat"

/**
 * Пропсы кнопки создания чата
 * @namespace Features.ChatCreate.UI.ChatCreateButton.Props
 */
type ChatCreateButtonProps = {
  text?: string
}

/**
 * Кнопка создания чата
 * @namespace Features.ChatCreate.UI.ChatCreateButton
 */
export const ChatCreateButton = ({ text = "Создать чат" }: ChatCreateButtonProps) => {
  const { createChat } = useCreateNewChat()

  return (
    <Button schema="brand" className="px-6 py-4 rounded-4xl font-bold text-2xl" onClick={createChat}>
      {text}
    </Button>
  )
}
