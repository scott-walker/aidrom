import { Roles, type Message } from "./types"

/**
 * Создать последнее сообщение клиента
 * @namespace Entities.Chat.Lib.Utils.makeLastClientMessage
 */
export const makeLastClientMessage = (content: string): Message => {
  const id = `${Roles.Client}_${Date.now()}`

  return {
    id,
    role: Roles.Client,
    content,
    createdAt: new Date()
  }
}
