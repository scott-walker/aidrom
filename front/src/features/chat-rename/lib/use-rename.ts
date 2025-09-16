import { useState } from "react"
import type { Chat } from "@entities/chat"
import { useUpdateChat } from "@entities/chat"
import { useToast } from "@features/toasts"

/**
 * Хук для переименования чата
 * @namespace Features.ChatRename.Lib.UseRename
 */
export const useRename = (chat: Chat) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const [title, setTitle] = useState(chat.title)
  const { mutate: updateChat } = useUpdateChat()
  const toast = useToast()

  const handleChange = (value: string) => {
    setTitle(value)
  }
  const handleSave = () => {
    setIsPending(true)

    if (!title.trim()) {
      toast.error("Название чата не может быть пустым")
      setTimeout(() => setIsPending(false), 1000)
      return
    }

    updateChat(
      { chatId: chat.id, data: { title } },
      {
        onSuccess: () => {
          setIsOpen(false)
          toast.success("Чат успешно переименован")
        },
        onError: () => {
          toast.error("Не удалось переименовать чат")
        },
        onSettled: () => {
          setIsPending(false)
        }
      }
    )
  }
  const handleCancel = () => {
    setIsOpen(false)
  }

  return {
    isOpen,
    setIsOpen,
    isPending,
    title,
    setTitle,
    handleChange,
    handleSave,
    handleCancel
  }
}
