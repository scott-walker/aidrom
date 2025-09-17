import fs from "fs"
import { resolve } from "node:path"
import { getConfigParam } from "@config"

/**
 * Сохранение изображения в файл
 * @namespace Utils.Imager.save
 * @param {string} name Имя файла
 * @param {string} image Изображение
 */
export const save = (name: string, image: string): string => {
  const staticDir = getConfigParam("staticDir") as string
  const filePath = resolve(staticDir, name)

  try {
    fs.writeFileSync(filePath, image, "binary")

    return filePath
  } catch (error) {
    console.error(error)
  }
}
