import type { JSX } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components_old/ui/avatar"
import { mergeClasses } from "@/utils/jsxtools"
import {
  userMessageClasses,
  assistantMessageClasses,
  userMessageContentClasses,
  assistantMessageContentClasses,
  messageTimeClasses
} from "./assets"
import type { MessageProps } from "./types"

/**
 * Компонент сообщения чата
 * @namespace Chat.Message
 * @param {MessageProps} props - Свойства компонента
 * @returns {JSX.Element} - Компонент сообщения
 */
export default function Message({ message, className }: MessageProps): JSX.Element {
  const isUser = message.sender === "user"
  const messageClasses = isUser ? userMessageClasses : assistantMessageClasses
  const contentClasses = isUser ? userMessageContentClasses : assistantMessageContentClasses

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  return (
    <div className={mergeClasses(messageClasses, className)}>
      {!isUser && (
        <Avatar className="w-8 h-8">
          <AvatarImage src={message.avatar} alt={message.name || "Assistant"} />
          <AvatarFallback>{message.name?.charAt(0) || "A"}</AvatarFallback>
        </Avatar>
      )}

      <div className="flex flex-col">
        <div className={contentClasses}>{message.content}</div>
        <div className={messageTimeClasses}>{formatTime(message.timestamp)}</div>
      </div>

      {isUser && (
        <Avatar className="w-8 h-8">
          <AvatarImage src={message.avatar} alt={message.name || "User"} />
          <AvatarFallback>{message.name?.charAt(0) || "U"}</AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}
