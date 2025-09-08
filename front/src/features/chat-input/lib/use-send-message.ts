import { useState } from "react"

/**
 * Хук для отправки сообщения
 * @namespace Features.Chat.SendMessage.Lib.UseSendMessage
 */
export const useSendMessage = () => {
  const [input, setInput] = useState("") // Состояние текста - часть фичи!
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    setIsLoading(true)
    setInput("")

    // try {
    //   // 1. Вызываем API из сущности
    //   // const response = await postMessage(activeChat.id, userMessage)
    //   // 2. Если API поддерживает стриминг, обрабатываем его через фичу
    //   // await handleStream(response, activeChat.id)
    // } catch (error) {
    //   // Обработка ошибок
    //   // addMessage({ role: "assistant", content: "Извините, произошла ошибка." })
    // } finally {
    //   setIsLoading(false)
    // }
  }

  return {
    input,
    setInput,
    isLoading,
    sendMessage
  }
}
