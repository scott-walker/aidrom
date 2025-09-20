/**
 * Роли отправляющих сообщения
 * @namespace Entities.Chat.Lib.Constants.Roles
 */
export enum Roles {
  Client = "client",
  Agent = "agent"
}

/**
 * Тип данных SSE
 * @namespace Entities.Chat.Lib.Constants.SSEDataType
 */
export enum SSEDataType {
  Start = "start",
  Error = "error",
  Chunk = "chunk",
  End = "end"
}
