import type { ReactNode } from "react"
import { Button } from "@ui/button"
import { useCreateChat } from "../lib/use-create-chat"

/**
 * Пропсы кнопки создания чата
 * @namespace Features.ChatCreate.UI.ChatCreateNiceButton.Props
 */
type ChatCreateNiceButtonProps = {
  agentId: number
  text?: string
}

/**
 * Кнопка создания чата
 * @namespace Features.ChatCreate.UI.ChatCreateNiceButton
 */
export const ChatCreateNiceButton = ({ agentId, text = "Создать чат" }: ChatCreateNiceButtonProps): ReactNode => {
  const { createChat } = useCreateChat({ agentId, clientId: 1 })

  return (
    <Button schema="brand" className="px-6 py-4 rounded-4xl font-bold text-2xl" onClick={() => createChat("Новый чат")}>
      {text}
    </Button>
  )
}
