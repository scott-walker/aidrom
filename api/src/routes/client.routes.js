import { Router } from "express"
import * as clientController from "#controllers/client.controller.js"

const router = Router()

// Роуты для клиентов
router.get("/", clientController.getClients)
router.get("/:clientId", clientController.getClient)
router.get("/email/:email", clientController.getClientByEmail)
router.post("/", clientController.createClient)
router.put("/:clientId", clientController.updateClient)
router.delete("/:clientId", clientController.deleteClient)
router.patch("/:clientId/balance", clientController.updateClientBalance)

export default router
