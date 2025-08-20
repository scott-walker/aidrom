import Chat from "./Root"
import ChatHeader from "./Header"
import ChatInput from "./Input"
import Messages from "./Messages"
import Message from "./Message"
import ChatExample from "./example"

// Экспорт типов
export type { Message as ChatMessage, ChatProps, MessageProps, ChatInputProps, ChatHeaderProps } from "./types"

// Экспорт компонентов
export { Chat, ChatHeader, ChatInput, Messages, Message, ChatExample }
