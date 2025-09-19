/**
 * Безопасная сериализация объекта в JSON с обработкой циклических ссылок
 * @namespace Utils.safeStringify
 */
export const safeStringify = (data: any, space?: number): string => {
  const seen = new WeakSet()

  return JSON.stringify(
    data,
    (key, val) => {
      if (val != null && typeof val === "object") {
        if (seen.has(val)) {
          return "[Circular]"
        }
        seen.add(val)
      }
      return val
    },
    space
  )
}
