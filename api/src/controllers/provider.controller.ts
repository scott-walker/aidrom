/**
 * Контроллер для работы с провайдерами
 * @namespace Provider.Controller
 */

import { Request, Response, NextFunction } from "express"
import { createControllerLogger } from "@utils/logger"
import * as providerService from "@services/provider.service"

// Создаем логгер для контроллера провайдеров
const logger = createControllerLogger("ProviderController")

/**
 * Получить список всех провайдеров
 * @namespace Provider.Controller.getProviders
 */
export const getProviders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info("Получение списка всех провайдеров")

    const providers = await providerService.getProviders()

    logger.info("Список провайдеров успешно получен", { count: providers.length })

    res.json(providers)
  } catch (err) {
    logger.error("Ошибка при получении списка провайдеров", { error: err.message })

    next(err)
  }
}

/**
 * Получить провайдера по ID
 * @namespace Provider.Controller.getProvider
 */
export const getProvider = async (req: Request, res: Response, next: NextFunction) => {
  const providerId = parseInt(req.params.providerId)

  try {
    logger.info("Получение провайдера по ID", { providerId })

    const provider = await providerService.getProviderById(providerId)

    logger.info("Провайдер успешно получен", { providerId })

    res.json(provider)
  } catch (err) {
    logger.error("Ошибка при получении провайдера", { error: err.message, providerId })

    next(err)
  }
}

/**
 * Создать нового провайдера
 * @namespace Provider.Controller.createProvider
 */
export const createProvider = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info("Создание нового провайдера", req.body)

    const provider = await providerService.createProvider(req.body)

    logger.info("Провайдер успешно создан", { providerId: provider.id })

    res.status(201).json(provider)
  } catch (err) {
    logger.error("Ошибка при создании провайдера", { error: err.message })

    next(err)
  }
}

/**
 * Обновить данные провайдера
 * @namespace Provider.Controller.updateProvider
 */
export const updateProvider = async (req: Request, res: Response, next: NextFunction) => {
  const providerId = parseInt(req.params.providerId)

  try {
    logger.info("Обновление провайдера", { providerId, data: req.body })

    const provider = await providerService.updateProvider(providerId, req.body)

    logger.info("Провайдер успешно обновлен", { providerId })

    res.json(provider)
  } catch (err) {
    logger.error("Ошибка при обновлении провайдера", { error: err.message, providerId })

    next(err)
  }
}

/**
 * Удалить провайдера
 * @namespace Provider.Controller.deleteProvider
 */
export const deleteProvider = async (req: Request, res: Response, next: NextFunction) => {
  const providerId = parseInt(req.params.providerId)

  try {
    logger.info("Удаление провайдера", { providerId })

    const provider = await providerService.deleteProvider(providerId)

    logger.info("Провайдер успешно удален", { providerId })

    res.json(provider)
  } catch (err) {
    logger.error("Ошибка при удалении провайдера", { error: err.message, providerId })

    next(err)
  }
}
