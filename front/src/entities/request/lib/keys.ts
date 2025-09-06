/**
 * Ключи запросов для записей запросов к провайдерам
 * @namespace Entities.Request.Lib.QueryKeys
 */
export const queryKeys = {
  all: ["requests"] as const,
  list: (filters: Record<string, string>) => [...queryKeys.all, "list", filters] as const,
  details: (id: number) => [...queryKeys.all, "details", id] as const
  // mutations: {
  //   create: ["requests", "create"] as const,
  //   update: ["requests", "update"] as const,
  //   delete: ["requests", "delete"] as const
  // }
}
