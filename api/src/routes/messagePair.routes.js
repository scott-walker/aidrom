import { Router } from "express"
import * as messagePairController from "#controllers/messagePair.controller.js"

const router = Router()

// Роуты для пар сообщений
router.get("/", messagePairController.getMessagePairs)
router.get("/:messagePairId", messagePairController.getMessagePair)
router.post("/", messagePairController.createMessagePair)
router.put("/:messagePairId", messagePairController.updateMessagePair)
router.delete("/:messagePairId", messagePairController.deleteMessagePair)
router.patch("/:messagePairId/favorite", messagePairController.toggleFavorite)

export default router
