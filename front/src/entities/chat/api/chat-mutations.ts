import { useMutation, useQueryClient, type UseMutationResult } from "@tanstack/react-query"
import { createChat, updateChat, sendMessage } from "./chat-api"
import { queryKeys } from "./chat-queries"
import type { Chat, ChatCreateData, ChatUpdateData, MessageSendData, MessageSendResult } from "../lib/types"

/**
 * Хук для создания чата
 * @namespace Entities.Chat.Api.ChatMutations.useCreateChat
 */
export const useCreateChat = (): UseMutationResult<Chat, Error, ChatCreateData> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: ChatCreateData) => createChat(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.list({}) })
    }
    // onError: (error) => {
    //   throw new Error(error.message)
    // }
  })
}

/**
 * Хук для обновления чата
 * @namespace Entities.Chat.Api.ChatMutations.useUpdateChat
 */
export const useUpdateChat = (): UseMutationResult<Chat, Error, { chatId: number; chat: ChatUpdateData }> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ chatId, chat }: { chatId: number; chat: ChatUpdateData }) => updateChat(chatId, chat),
    onSuccess: (updatedChat: Chat) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.list({}) })
      queryClient.invalidateQueries({ queryKey: queryKeys.details(updatedChat.id) })
    }
    // onError: (error) => {
    //   throw new Error(error.message)
    // }
  })
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
    onSuccess: ({ chatId }: MessageSendResult) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.details(chatId) })
    }
    // onError: (error) => {
    //   throw new Error(error.message)
    // }
  })
}
