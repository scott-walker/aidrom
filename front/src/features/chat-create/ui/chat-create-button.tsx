import { useNavigate } from "react-router"
import { Button } from "@ui/button"
import { type Chat, useCreateChat } from "@entities/chat"
import { useToast } from "@features/toasts"

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
  const { mutate: createChat } = useCreateChat()
  const navigate = useNavigate()
  const toast = useToast()

  const onCreate = () => {
    createChat(
      { title: "Новый чат", agentId: 10, clientId: 1 },
      {
        onSuccess: (chat: Chat) => {
          toast.success("Чат создан")
          navigate(`/chat/${chat.id}`)
        }
      }
    )
  }

  return (
    <Button schema="brand" className="px-6 py-4 rounded-4xl font-bold text-2xl" onClick={onCreate}>
      {text}
    </Button>
  )
}
