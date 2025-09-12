import type { Value } from "./types"

/**
 * Преобразовать значение в строку
 * @namespace Shared.UI.Json.Utils.toString
 */
export const formatValue = (value: Value) => {
  value = typeof value === "undefined" ? "" : value

  try {
    value = typeof value === "string" ? JSON.parse(value) : value

    return JSON.stringify(value, null, 2)
  } catch {
    return value?.toString() ?? ""
  }
}

/**
 * Нормализовать значение
 * @namespace Shared.UI.Json.Utils.normalizeValue
 */
export const normalizeValue = (value: Value) => {
  value = typeof value === "undefined" ? "" : value

  return JSON.stringify(value, null, 2)
}
