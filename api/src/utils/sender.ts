import { EventEmitter } from "events"
import { createSenderLogger, ILogger } from "@utils/logger"

/**
 * События эмиттера отправки сообщения
 * @namespace Services.SenderEvents
 */
export enum SenderEvents {
  START = "start",
  END = "end",
  CHUNK = "chunk",
  ERROR = "error",
  COMPLETE = "complete",
  REQUEST_STORED = "request-stored"
}

/**
 * Интерфейс отправщика сообщений
 * @namespace Services.Sender
 */
export interface ISender {
  process: () => Promise<void>
  emit<K extends keyof ISenderEventMap>(event: K, data: ISenderEventMap[K]): ReturnType<EventEmitter["emit"]>
  on<K extends keyof ISenderEventMap>(
    event: K,
    listener: (data: ISenderEventMap[K]) => void
  ): ReturnType<EventEmitter["on"]>
}

/**
 * Интерфейс ошибки отправщика сообщений
 * @namespace Services.ISenderError
 */
export interface ISenderError extends Error {}

/**
 * Интерфейс фабрики отправщика сообщений
 * @namespace Services.SenderFactory
 */
export interface ISenderFactory {
  (handler: ISenderHandler): ISender
}

/**
 * Интерфейс обработчика отправщика сообщений
 * @namespace Services.SenderHandler
 */
export interface ISenderHandler {
  (sender: ISender): Promise<void>
}

/**
 * Интерфейс маппинга событий отправщика сообщений
 * @namespace Services.ISenderEventMap
 */
export interface ISenderEventMap {
  [SenderEvents.START]: ISenderStartEventData
  [SenderEvents.END]: ISenderEndEventData
  [SenderEvents.COMPLETE]: ISenderCompleteEventData
  [SenderEvents.ERROR]: ISenderErrorEventData
  [SenderEvents.CHUNK]: ISenderChunkEventData
  [SenderEvents.REQUEST_STORED]: ISenderRequestStoredEventData
  [key: string]: ISenderEventData
}

/**
 * Интерфейс данных события "отправки сообщений"
 * @namespace Services.ISenderEventData
 */
export interface ISenderEventData extends Record<string, unknown> {}

/**
 * Интерфейс данных события "старт отправки сообщений"
 * @namespace Services.ISenderStartEventData
 */
export interface ISenderStartEventData extends ISenderEventData {}

/**
 * Интерфейс данных события "окончание отправки сообщений"
 * @namespace Services.ISenderEndEventData
 */
export interface ISenderEndEventData extends ISenderEventData {}

/**
 * Интерфейс данных события "завершение отправки сообщений"
 * @namespace Services.ISenderCompleteEventData
 */
export interface ISenderCompleteEventData extends ISenderEventData {
  providerRequestId: string
  requestParams: {
    [key: string]: any
  }
  responseData: {
    [key: string]: any
  }
  requestTokens: number
  responseTokens: number
  content: string
}

/**
 * Интерфейс данных события "ошибка отправки сообщений"
 * @namespace Services.ISenderErrorEventData
 */
export interface ISenderErrorEventData extends ISenderEventData {
  error: ISenderError
}

/**
 * Интерфейс данных события "получение фрагмента ответа"
 * @namespace Services.ISenderChunkEventData
 */
export interface ISenderChunkEventData extends ISenderEventData {
  content: string
}

/**
 * Интерфейс данных события "запрос сохранен в БД"
 * @namespace Services.ISenderRequestStoredEventData
 */
export interface ISenderRequestStoredEventData extends ISenderEventData {
  requestId: number
  responseContent: string
}

/**
 * Создать отправщик сообщений
 * @namespace Drivers.createSender
 */
export const createSender: ISenderFactory = (handler: ISenderHandler): ISender => {
  const logger = createSenderLogger()
  const emitter = new EventEmitter()

  logger.info("Создание отправщика сообщений")

  return {
    /**
     * Обработать запрос
     * @namespace Drivers.Sender.process
     */
    async process() {
      try {
        logger.info("Обработка запроса")

        await handler.call(this, this)

        logger.info("Запрос успешно обработан")
      } catch (error) {
        logger.error("Ошибка при обработке запроса", { error: error.message })

        throw error
      }
    },

    /**
     * Эммитеть событие
     * @namespace Drivers.Sender.emit
     */
    emit(event, data) {
      return emitter.emit(event as string, data)
    },

    /**
     * Обработать событие
     * @namespace Drivers.Sender.on
     */
    on(event, listener) {
      return emitter.on(event as string, listener)
    }
  }
}
