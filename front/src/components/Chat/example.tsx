import type { JSX } from "react"
import { useState } from "react"
import { Chat, type ChatMessage } from "./index"

/**
 * Пример использования компонента чата
 * @namespace Chat.Example
 * @returns {JSX.Element} - Пример компонента чата
 */
export default function ChatExample(): JSX.Element {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      content: "Привет! Как дела?",
      sender: "user",
      timestamp: new Date(Date.now() - 60000),
      name: "Пользователь"
    },
    {
      id: "2",
      content: "Привет! У меня все хорошо, спасибо! Как у тебя?",
      sender: "assistant",
      timestamp: new Date(Date.now() - 30000),
      name: "Ассистент"
    }
  ])

  const handleSendMessage = (content: string): void => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date(),
      name: "Пользователь"
    }

    setMessages(prev => [...prev, newMessage])

    // Имитация ответа ассистента
    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: "Получил ваше сообщение!",
        sender: "assistant",
        timestamp: new Date(),
        name: "Ассистент"
      }
      setMessages(prev => [...prev, assistantMessage])
    }, 1000)
  }

  return (
    <div className="h-[650px] w-full mx-auto">
      <Chat
        messages={messages}
        onSendMessage={handleSendMessage}
        title="Пример чата"
        placeholder="Введите сообщение..."
      />
    </div>
  )
}
