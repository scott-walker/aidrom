import { useMutation, useQueryClient, type UseMutationResult } from "@tanstack/react-query"
import { createChat, updateChat, sendMessage } from "./chat-api"
import type { Chat } from "../lib/schema"
import type { ChatCreateData, ChatUpdateData, MessageSendData, MessageSendResult } from "../lib/types"
import { queryKeys } from "./chat-queries"

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
  })
}

/**
 * Хук для обновления чата
 * @namespace Entities.Chat.Api.ChatMutations.useUpdateChat
 */
export const useUpdateChat = (): UseMutationResult<Chat, Error, { chatId: number; data: ChatUpdateData }> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ chatId, data }: { chatId: number; data: ChatUpdateData }) => updateChat(chatId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    }
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
  })
}
