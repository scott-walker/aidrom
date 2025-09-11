import type { Value } from "./types"

/**
 * Подсчитать количество строк в строке
 * @namespace Shared.UI.Json.Utils.countLines
 */
export const countLines = (value: string) => {
  return value.split("\n").length
}

/**
 * Преобразовать значение в строку
 * @namespace Shared.UI.Json.Utils.toString
 */
export const toString = (value: Value) => {
  value = typeof value === "undefined" ? "" : value

  return typeof value === "string" ? value : JSON.stringify(value, null, 2)
}

/**
 * Нормализовать значение
 * @namespace Shared.UI.Json.Utils.normalizeValue
 */
export const normalizeValue = (value: Value) => {
  value = toString(value)

  // const MIN_LINES = 3
  // const lines = countLines(value)

  // if (lines < MIN_LINES) {
  //   return value + "\n".repeat(MIN_LINES - lines)
  // }

  return value
}
