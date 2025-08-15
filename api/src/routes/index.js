import { Router } from "express"
import requestRoutes from "./request.routes.js"
import chatRoutes from "./chat.routes.js"
import messagePairRoutes from "./messagePair.routes.js"
import clientRoutes from "./client.routes.js"
import agentRoutes from "./agent.routes.js"

const router = Router()

// Роуты для запросов к AI
router.use("/requests", requestRoutes)

// Роуты для чатов
router.use("/chats", chatRoutes)

// Роуты для пар сообщений (вложенные в чаты)
router.use("/chats/:chatId/message-pairs", messagePairRoutes)

// Роуты для клиентов
router.use("/clients", clientRoutes)

// Роуты для агентов
router.use("/agents", agentRoutes)

export default router
