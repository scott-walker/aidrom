import { Request, Response } from "express"
import { createSession, Session } from "better-sse"

/**
 * Время для переподключения
 * @namespace Utils.createSSE.RECONNECT_TIME
 */
const RECONNECT_TIME = 30000

/**
 * Хранилище сессий
 * @namespace Utils.createSSE.sessionStorage
 */
export const sessionStorage = new Map<number, Session>()

/**
 * SSE сервер
 * @namespace Utils.createSSE
 */
export const createSSE = async (req: Request, res: Response): Promise<Session> => {
  const session: Session = await createSession(req, res, {
    retry: RECONNECT_TIME
  })

  return session
}
