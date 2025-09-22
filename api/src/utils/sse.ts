import { Request, Response } from "express"
import { createSession, Session } from "better-sse"
import { SseError } from "@utils/errors"

/**
 * Время для переподключения
 * @namespace Utils.createSSE.RECONNECT_TIME
 */
const RECONNECT_TIME = 30000

/**
 * Хранилище сессий
 * @namespace Utils.createSSE.sessionStorage
 */
const sessionStorage = new Map<number, Session>()

/**
 * Тип данных сообщения SSE
 * @namespace Utils.createSSE.SSEMessageType
 */
export enum SSEMessageType {
  Start = "start",
  Content = "content",
  Complete = "complete",
  End = "end",
  Error = "error"
}

/**
 * Интерфейс менеджера SSE сессий
 * @namespace Utils.createSSE.ISSEManager
 */
export interface ISSEManager {
  open: (sessionId: number) => Promise<Session>
  close: (sessionId: number) => void
  get: (sessionId: number) => Session
}

/**
 * SSE сервер
 * @namespace Utils.createSSE
 */
export const createSSE = (req: Request, res: Response): ISSEManager => {
  return {
    /**
     * Открыть SSE сессию
     * @namespace Utils.createSSE.open
     */
    async open(sessionId) {
      const session: Session = await createSession(req, res, {
        retry: RECONNECT_TIME
      })

      sessionStorage.set(sessionId, session)

      return session
    },

    /**
     * Закрыть SSE сессию
     * @namespace Utils.createSSE.close
     */
    close(sessionId) {
      sessionStorage.delete(sessionId)
    },

    /**
     * Получить SSE сессию
     * @namespace Utils.createSSE.get
     */
    get(sessionId) {
      if (!sessionStorage.has(sessionId)) {
        throw new SseError(`SSE сессия с ID #${sessionId} не найдена`)
      }

      return sessionStorage.get(sessionId)
    }
  }
}

/**
 * SSE сессия
 * @namespace Utils.createSSE.SSESession
 */
export { Session as SSESession }
