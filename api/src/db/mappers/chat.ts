import { Chat } from "../types"

/**
 * Маппер для агента
 * @namespace Db.Mappers.AgentMapper
 */
export const mapChat = (chat: Partial<Chat>): Chat => {
  const agent = chat.agent ?? null
  const client = chat.client ?? null
  const messagePairs = chat.messagePairs ?? []

  return { ...chat, agent, client, messagePairs } as Chat
}
