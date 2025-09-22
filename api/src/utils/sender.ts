import { EventEmitter } from "events"
import { createSenderLogger, ILogger } from "@utils/logger"
import { SenderError } from "@utils/errors"

/**
 * События эмиттера отправки сообщения
 * @namespace Services.SenderEvents
 */
export enum SenderEvents {
  START = "start",
  END = "end",
  CONTENT = "content",
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
  emit: <K extends keyof ISenderEventMap>(event: K, data: ISenderEventMap[K]) => ReturnType<EventEmitter["emit"]>
  on: <K extends keyof ISenderEventMap>(
    event: K,
    listener: (data: ISenderEventMap[K]) => Promise<void>
  ) => ReturnType<EventEmitter["on"]>
}

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
  [SenderEvents.CONTENT]: ISenderContentEventData
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
  error: SenderError
}

/**
 * Интерфейс данных события "получение содержимого ответа"
 * @namespace Services.ISenderContentEventData
 */
export interface ISenderContentEventData extends ISenderEventData {
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
 * Отправщик сообщений
 * @namespace Drivers.Sender
 */
export class Sender implements ISender {
  /**
   * Эмиттер
   * @namespace Drivers.Sender.emitter
   */
  private readonly emitter: EventEmitter

  /**
   * Логгер
   * @namespace Drivers.Sender.logger
   */
  private readonly logger: ILogger

  /**
   * Обработчик запроса
   * @namespace Drivers.Sender.handler
   */
  private readonly handler: ISenderHandler

  /**
   * Конструктор
   * @namespace Drivers.Sender.constructor
   */
  public constructor(handler: ISenderHandler, emitter: EventEmitter, logger: ILogger) {
    logger.info("Инициализация отправщика сообщений")

    this.handler = handler
    this.emitter = emitter
    this.logger = logger
  }

  /**
   * Обработка запроса
   * @namespace Drivers.Sender.process
   */
  public async process(): Promise<void> {
    try {
      this.logger.info("Обработка запроса")

      await this.handler.call(this, this)

      this.logger.info("Запрос успешно обработан")
    } catch (error) {
      this.logger.error("Ошибка при обработке запроса", { error: error.message })

      throw error
    }
  }

  /**
   * Эммитеть событие
   * @namespace Drivers.Sender.emit
   */
  emit: ISender["emit"] = (event, data) => {
    /**
     * Обернуть данные события
     * @namespace Drivers.Sender.emit.wrap
     */
    const wrap = (data: ISenderEventData) => {
      // Обернуть ошибку в SenderError
      if (event === SenderEvents.ERROR) {
        let error: SenderError

        if (data.error instanceof Error) {
          error = new SenderError(data.error.message, data.error.stack)
        } else {
          error = new SenderError(data.error as string)
        }

        return { error }
      }

      return data
    }

    return this.emitter.emit(event as string, wrap(data))
  }

  /**
   * Обработчик событий
   * @namespace Drivers.Sender.on
   */
  on: ISender["on"] = (event, listener) => {
    /**
     * Обернуть обработчик событий
     * @namespace Drivers.Sender.on.wrap
     */
    const wrap = (listener: (data: ISenderEventData) => Promise<void>) => {
      return async (data: ISenderEventData) => {
        try {
          this.logger.info("Обработка события", { event })

          await listener(data)

          this.logger.info("Событие успешно обработано", { event })
        } catch (error) {
          this.logger.error("Ошибка при обработке события", { event, error: error.message })

          this.emit(SenderEvents.ERROR, { error })
        }
      }
    }

    return this.emitter.on(event as string, wrap(listener))
  }
}

/**
 * Создать отправщик сообщений
 * @namespace Drivers.createSender
 */
export const createSender: ISenderFactory = (handler: ISenderHandler): ISender => {
  const logger = createSenderLogger()
  const emitter = new EventEmitter()

  logger.info("Создание отправщика сообщений")

  return new Sender(handler, emitter, logger)
}
