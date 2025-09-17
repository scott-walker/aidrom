/**
 * Контроллер для работы со статическими файлами
 * @namespace Static.Controller
 */

import { Request, Response, NextFunction } from "express"
import { createControllerLogger } from "@utils/logger"
import * as staticService from "@services/static.service"

// Создаем логгер для контроллера статических файлов
const logger = createControllerLogger("StaticController")

/**
 * Получить список всех статических файлов
 * @namespace Static.Controller.getStatic
 */
export const getStatic = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info("Получение статического файла", { path: req.params.path })

    const content = staticService.getStatic(req.params.path)

    logger.info("Статический файл успешно получен", { path: req.params.path })

    res.json(content)
  } catch (err) {
    logger.error("Ошибка при получении статического файла", { error: err.message })

    next(err)
  }
}
