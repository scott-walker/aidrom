// Lib
export { Roles, SSEDataType } from "./lib/constants"
export { type Chat, type ChatListItem, type Message } from "./lib/schema"
export type { ChatCreateData, ChatUpdateData, MessageSendData, MessageSendResult } from "./lib/types"
export { makeClientMessage, makeAgentMessage } from "./lib/utils"

// API
export { useChats, useChatById } from "./api/chat-queries"
export { useCreateChat, useUpdateChat, useSendMessage, useDeleteChat, useOptimisticMessage } from "./api/chat-mutations"

// Store
export { useChatStore } from "./store/chat-store"
export { useChatMessages } from "./store/chat-selectors"

// UI
export { ChatPending } from "./ui/chat-pending"
export { MessageBubble } from "./ui/message-bubble"
export { MessageEmptyList } from "./ui/message-empty-list"
