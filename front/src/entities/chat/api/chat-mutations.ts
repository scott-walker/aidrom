import { useMutation, useQueryClient, type UseMutationResult } from "@tanstack/react-query"
import { createChat, updateChat, sendMessage, deleteChat } from "./chat-api"
import type { Chat, ChatListItem, Message } from "../lib/schema"
import type { ChatCreateData, ChatUpdateData, MessageSendData, MessageSendResult } from "../lib/types"
import { makeClientMessage } from "../lib/utils"
import { queryKeys } from "./chat-queries"

/**
 * Хук для создания чата
 * @namespace Entities.Chat.Api.ChatMutations.useCreateChat
 */
export const useCreateChat = (): UseMutationResult<ChatListItem, Error, ChatCreateData> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: ChatCreateData) => createChat(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.list })
    }
  })
}

/**
 * Хук для обновления чата
 * @namespace Entities.Chat.Api.ChatMutations.useUpdateChat
 */
export const useUpdateChat = (): UseMutationResult<ChatListItem, Error, { chatId: number; data: ChatUpdateData }> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ chatId, data }: { chatId: number; data: ChatUpdateData }) => updateChat(chatId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    }
  })
}

/**
 * Хук для удаления чата
 * @namespace Entities.Chat.Api.ChatMutations.useDeleteChat
 */
export const useDeleteChat = (): UseMutationResult<void, Error, number> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (chatId: number) => deleteChat(chatId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    }
  })
}

/**
 * Хук для оптимистичной обработки сообщений
 * @namespace Entities.Chat.Api.Queries.useOptimisticMessage
 */
export const useOptimisticMessage = () => {
  const queryClient = useQueryClient()

  /**
   * Добавить сообщение в чат
   * @namespace Entities.Chat.Api.Queries.useOptimisticMessage.addMessage
   */
  const addMessage = (chatId: number, message: Message) => {
    queryClient.setQueryData(queryKeys.details(chatId), (previousChat: Chat) => {
      const previousMessages = previousChat?.messages ?? []
      const newChat = { ...previousChat, messages: [...previousMessages, message] }

      queryClient.setQueryData(queryKeys.details(chatId), newChat)

      return newChat
    })
  }

  /**
   * Обновить сообщение в чате
   * @namespace Entities.Chat.Api.Queries.useOptimisticMessage.updateMessage
   */
  const updateMessage = (chatId: number, message: Message) => {
    queryClient.setQueryData(queryKeys.details(chatId), (previousChat: Chat) => {
      const previousMessages = previousChat?.messages ?? []
      const newMessages = previousMessages.map(msg => (msg.id === message.id ? message : msg))
      const newChat = { ...previousChat, messages: newMessages }

      queryClient.setQueryData(queryKeys.details(chatId), newChat)

      return newChat
    })
  }

  /**
   * Обновить последнее сообщение в чате
   * @namespace Entities.Chat.Api.Queries.useOptimisticMessage.updateLastMessage
   */
  const updateLastMessage = (chatId: number, message: Message) => {
    queryClient.setQueryData(queryKeys.details(chatId), (previousChat: Chat) => {
      const previousMessages = previousChat?.messages ?? []
      const newMessages = [...previousMessages.slice(0, -1), message]
      const newChat = { ...previousChat, messages: newMessages }

      queryClient.setQueryData(queryKeys.details(chatId), newChat)

      return newChat
    })
  }

  return { addMessage, updateMessage, updateLastMessage }
}

/**
 * Хук для отправки сообщения
 * @namespace Entities.Chat.Api.ChatMutations.useSendMessage
 */
export const useSendMessage = (): UseMutationResult<
  MessageSendResult,
  Error,
  { chatId: number; data: MessageSendData }
> => {
  const queryClient = useQueryClient()
  const { addMessage } = useOptimisticMessage()

  return useMutation({
    mutationFn: ({ chatId, data }: { chatId: number; data: MessageSendData }) => sendMessage(chatId, data),
    onMutate: ({ chatId, data }: { chatId: number; data: MessageSendData }) => {
      const previousChat = queryClient.getQueryData<Chat>(queryKeys.details(chatId))
      const clientMessage = makeClientMessage(chatId, data.message)

      queryClient.cancelQueries({ queryKey: queryKeys.details(chatId) })

      addMessage(chatId, clientMessage)

      return { previousChat }
    },
    onError: (_error, { chatId }, context) => {
      queryClient.setQueryData(queryKeys.details(chatId), context?.previousChat)
    },
    onSuccess: ({ chatId, messages }: MessageSendResult) => {
      const previousChat = queryClient.getQueryData<Chat>(queryKeys.details(chatId))
      const previousMessages = previousChat?.messages ?? []
      const newMessages = [...previousMessages, ...messages]

      queryClient.setQueryData(queryKeys.details(chatId), { ...previousChat, messages: newMessages })
      // queryClient.invalidateQueries({ queryKey: queryKeys.details(chatId) })
    }
  })
}
