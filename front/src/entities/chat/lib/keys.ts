/**
 * Ключи запросов для чатов
 * @namespace Entities.Chat.Lib.queryKeys
 */
export const queryKeys = {
  all: ["chats"] as const,
  list: (filters: Record<string, string>) => [...queryKeys.all, "list", filters] as const,
  details: (id: string) => [...queryKeys.all, "details", id] as const
  // mutations: {
  //   create: ["chats", "create"] as const,
  //   update: ["chats", "update"] as const,
  //   delete: ["chats", "delete"] as const
  // }
}
