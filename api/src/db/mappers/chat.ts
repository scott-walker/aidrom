import { Chat } from "../types"

/**
 * Маппер для чата
 * @namespace Db.Mappers.ChatMapper
 */
export interface MapChatParams {
  withContext?: boolean
}

/**
 * Маппер для агента
 * @namespace Db.Mappers.AgentMapper
 */
export const mapChat = (chat: Partial<Chat>, { withContext = false }: MapChatParams = {}): Chat => {
  if (!withContext) {
    delete chat.context
  }

  return chat as Chat
  // const agent = chat.agent ?? null
  // const client = chat.client ?? null
  // const messagePairs = chat.messagePairs ?? []
  // const context = chat.context ?? []

  // return { ...chat, agent, client, messagePairs, context } as Chat
}
