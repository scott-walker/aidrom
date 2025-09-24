import { Router } from "express"
import * as chatController from "@controllers/chat.controller"

const router: Router = Router()

// Роуты для чатов
router.get("/", chatController.getChats)
router.get("/:chatId", chatController.getChat)
router.get("/:chatId/messages", chatController.getChatMessages)
router.post("/", chatController.createChat)
router.put("/:chatId", chatController.updateChat)
router.delete("/:chatId", chatController.deleteChat)
router.put("/:chatId/context-clear", chatController.clearChatContext)
router.put("/:chatId/context-optimize", chatController.optimizeChatContext)
router.post("/:chatId/send", chatController.sendMessage)
router.get("/:chatId/stream", chatController.initStream)
// router.post("/:chatId/send-stream", chatController.sendStreamMessage)

export { router as chatRouter }
