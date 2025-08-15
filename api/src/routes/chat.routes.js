import { Router } from "express"
import * as chatController from "#controllers/chat.controller.js"

const router = Router()

// Роуты для чатов
router.get("/", chatController.getChats)
router.get("/:chatId", chatController.getChat)
router.post("/", chatController.createChat)
router.put("/:chatId", chatController.updateChat)
router.delete("/:chatId", chatController.deleteChat)
router.post("/:chatId/send", chatController.sendMessage)

export default router
