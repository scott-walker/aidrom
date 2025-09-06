/**
 * Ключи запросов для провайдеров
 * @namespace Entities.Provider.Lib.queryKeys
 */
export const queryKeys = {
  all: ["providers"] as const,
  list: (filters: Record<string, string>) => [...queryKeys.all, "list", filters] as const,
  details: (id: string) => [...queryKeys.all, "details", id] as const
  // mutations: {
  //   create: ["providers", "create"] as const,
  //   update: ["providers", "update"] as const,
  //   delete: ["providers", "delete"] as const
  // }
}
