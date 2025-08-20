import type { JSX } from "react"
import { ScrollArea } from "@/components_old/ui/scroll-area"
import { mergeClasses } from "@/utils/jsxtools"
import { chatMessagesClasses } from "./assets"
import Message from "./Message"
import type { Message as MessageType } from "./types"

/**
 * Тип пропсов для компонента сообщений
 * @namespace Chat.Messages.MessagesProps
 */
interface MessagesProps {
  messages: MessageType[]
  className?: string
}

/**
 * Компонент области сообщений чата
 * @namespace Chat.Messages
 * @param {MessagesProps} props - Свойства компонента
 * @returns {JSX.Element} - Компонент области сообщений
 */
export default function Messages({ messages, className }: MessagesProps): JSX.Element {
  return (
    <ScrollArea className={mergeClasses(chatMessagesClasses, className)}>
      <div className="space-y-4">
        {messages.map(message => (
          <Message key={message.id} message={message} />
        ))}
      </div>
    </ScrollArea>
  )
}
