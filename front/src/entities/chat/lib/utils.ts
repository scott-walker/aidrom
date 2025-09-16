import { Roles } from "./constants"
import type { Message } from "./schema"

/**
 * Создать последнее сообщение клиента
 * @namespace Entities.Chat.Lib.Utils.makeLastClientMessage
 */
export const makeLastClientMessage = (content: string): Message => {
  return {
    id: crypto.randomUUID(),
    role: Roles.Client,
    content,
    createdAt: new Date()
  }
}
