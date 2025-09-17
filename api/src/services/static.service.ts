import { resolve } from "node:path"
import { readFileSync } from "node:fs"
import { getConfigParam } from "@config"

/**
 * Получить содержимое статического файла
 * @namespace Services.StaticService.getStatic
 * @param {string} path относительный путь к файлу
 */
export const getStatic = (path: string): string => {
  const staticDir = getConfigParam("staticDir") as string
  const absolutePath = resolve(staticDir, path)

  return readFileSync(absolutePath, "utf-8")
}
