/**
 * Контроллер для работы с провайдерами
 * @namespace Provider.Controller
 */

import { createControllerLogger } from "@utils/logger.js"
import * as providerService from "@services/provider.service.js"

// Создаем логгер для контроллера провайдеров
const logger = createControllerLogger("ProviderController")

/**
 * Получает список всех провайдеров
 * @memberof Provider.Controller
 * @param {Object} req - Объект запроса Express
 * @param {Object} res - Объект ответа Express
 * @param {Function} next
 * @returns {void}
 */
export const getProviders = async (req, res, next) => {
  try {
    logger.info("Получение списка всех провайдеров")

    const providers = await providerService.getProviders()

    logger.info("Список провайдеров успешно получен", {
      count: providers.length
    })

    res.json(providers)
  } catch (err) {
    logger.error("Ошибка при получении списка провайдеров", {
      error: err.message
    })

    next(err)
  }
}

/**
 * Получает провайдера по ID
 * @memberof Provider.Controller
 * @param {Object} req - Объект запроса Express
 * @param {Object} res - Объект ответа Express
 * @param {Function} next
 * @returns {void}
 */
export const getProvider = async (req, res, next) => {
  const providerId = req.params.providerId

  try {
    logger.info("Получение провайдера по ID", {
      providerId
    })

    const provider = await providerService.getProviderById(providerId)

    logger.info("Провайдер успешно получен", {
      providerId
    })

    res.json(provider)
  } catch (err) {
    logger.error("Ошибка при получении провайдера", {
      error: err.message,
      providerId
    })

    next(err)
  }
}

/**
 * Получает провайдера по алиасу
 * @memberof Provider.Controller
 * @param {Object} req - Объект запроса Express
 * @param {Object} res - Объект ответа Express
 * @param {Function} next
 * @returns {void}
 */
export const getProviderByAlias = async (req, res, next) => {
  const alias = req.params.alias

  try {
    logger.info("Получение провайдера по алиасу", {
      alias
    })

    const provider = await providerService.getProviderByAlias(alias)

    logger.info("Провайдер по алиасу успешно получен", {
      alias
    })

    res.json(provider)
  } catch (err) {
    logger.error("Ошибка при получении провайдера по алиасу", {
      error: err.message,
      alias
    })

    next(err)
  }
}

/**
 * Создает нового провайдера
 * @memberof Provider.Controller
 * @param {Object} req - Объект запроса Express
 * @param {string} req.body.alias - Алиас провайдера
 * @param {string} req.body.name - Название провайдера
 * @param {string} [req.body.description] - Описание провайдера
 * @param {Object} [req.body.params] - Параметры провайдера (JSON)
 * @param {Object} res - Объект ответа Express
 * @param {Function} next
 * @returns {void}
 */
export const createProvider = async (req, res, next) => {
  try {
    logger.info("Создание нового провайдера", req.body)

    const provider = await providerService.createProvider(req.body)

    logger.info("Провайдер успешно создан", {
      providerId: provider.id
    })

    res.status(201).json(provider)
  } catch (err) {
    logger.error("Ошибка при создании провайдера", {
      error: err.message
    })

    next(err)
  }
}

/**
 * Обновляет данные провайдера
 * @memberof Provider.Controller
 * @param {Object} req - Объект запроса Express
 * @param {string|number} req.params.providerId - ID провайдера
 * @param {Object} req.body - Данные для обновления
 * @param {string} [req.body.alias] - Алиас провайдера
 * @param {string} [req.body.name] - Название провайдера
 * @param {string} [req.body.description] - Описание провайдера
 * @param {Object} [req.body.params] - Параметры провайдера (JSON)
 * @param {Object} res - Объект ответа Express
 * @param {Function} next
 * @returns {void}
 */
export const updateProvider = async (req, res, next) => {
  const providerId = req.params.providerId

  try {
    logger.info("Обновление провайдера", {
      providerId,
      data: req.body
    })

    const provider = await providerService.updateProvider(providerId, req.body)

    logger.info("Провайдер успешно обновлен", {
      providerId
    })

    res.json(provider)
  } catch (err) {
    logger.error("Ошибка при обновлении провайдера", {
      error: err.message,
      providerId
    })

    next(err)
  }
}

/**
 * Удаляет провайдера
 * @memberof Provider.Controller
 * @param {Object} req - Объект запроса Express
 * @param {string|number} req.params.providerId - ID провайдера
 * @param {Object} res - Объект ответа Express
 * @param {Function} next
 * @returns {void}
 */
export const deleteProvider = async (req, res, next) => {
  const providerId = req.params.providerId

  try {
    logger.info("Удаление провайдера", {
      providerId
    })

    const provider = await providerService.deleteProvider(providerId)

    logger.info("Провайдер успешно удален", {
      providerId
    })

    res.json(provider)
  } catch (err) {
    logger.error("Ошибка при удалении провайдера", {
      error: err.message,
      providerId
    })

    next(err)
  }
}

/**
 * Получает провайдеров по фильтрам
 * @memberof Provider.Controller
 * @param {Object} req - Объект запроса Express
 * @param {Object} req.query - Параметры запроса для фильтрации
 * @param {string} [req.query.name] - Фильтр по названию
 * @param {string} [req.query.alias] - Фильтр по алиасу
 * @param {Object} res - Объект ответа Express
 * @param {Function} next
 * @returns {void}
 */
export const getProvidersByFilters = async (req, res, next) => {
  try {
    logger.info("Поиск провайдеров по фильтрам", req.query)

    const providers = await providerService.getProvidersByFilters(req.query)

    logger.info("Поиск провайдеров по фильтрам выполнен успешно", {
      filters: req.query,
      count: providers.length
    })

    res.json(providers)
  } catch (err) {
    logger.error("Ошибка при поиске провайдеров по фильтрам", {
      error: err.message,
      filters: req.query
    })

    next(err)
  }
}
