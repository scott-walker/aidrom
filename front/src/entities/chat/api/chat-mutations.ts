import { useMutation, useQueryClient, type UseMutationResult } from "@tanstack/react-query"
import { createChat, updateChat, sendMessage, deleteChat } from "./chat-api"
import type { ChatListItem, Message } from "../lib/schema"
import type { ChatCreateData, ChatUpdateData, MessageSendData, MessageSendResult } from "../lib/types"
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
    queryClient.setQueryData(queryKeys.messages(chatId), (previousMessages: Message[]) => {
      const newMessages = [...previousMessages, message]

      queryClient.setQueryData(queryKeys.messages(chatId), newMessages)

      return newMessages
    })
  }

  /**
   * Обновить сообщение в чате
   * @namespace Entities.Chat.Api.Queries.useOptimisticMessage.updateMessage
   */
  const updateMessage = (chatId: number, message: Message) => {
    queryClient.setQueryData(queryKeys.messages(chatId), (previousMessages: Message[]) => {
      const newMessages = previousMessages.map(msg => (msg.id === message.id ? message : msg))

      queryClient.setQueryData(queryKeys.messages(chatId), newMessages)

      return newMessages
    })
  }

  /**
   * Обновить последнее сообщение в чате
   * @namespace Entities.Chat.Api.Queries.useOptimisticMessage.updateLastMessage
   */
  const updateLastMessage = (chatId: number, message: Message) => {
    queryClient.setQueryData(queryKeys.messages(chatId), (previousMessages: Message[]) => {
      const newMessages = [...previousMessages.slice(0, -1), message]

      queryClient.setQueryData(queryKeys.messages(chatId), newMessages)

      return newMessages
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
  return useMutation({
    mutationFn: ({ chatId, data }: { chatId: number; data: MessageSendData }) => sendMessage(chatId, data),
    onMutate: ({ chatId }: { chatId: number; data: MessageSendData }) => {
      const previousMessages = queryClient.getQueryData<Message[]>(queryKeys.messages(chatId))

      return { previousMessages }
    },
    onError: (_error, { chatId }, context) => {
      queryClient.setQueryData(queryKeys.messages(chatId), context?.previousMessages)
    },
    onSuccess: ({ chatId, messages }: MessageSendResult) => {
      queryClient.setQueryData(queryKeys.messages(chatId), messages)
    }
  })
}
