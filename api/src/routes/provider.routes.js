import { Router } from "express"
import * as providerController from "#controllers/provider.controller.js"

const router = Router()

// Роуты для провайдеров
router.get("/", providerController.getProviders)
router.get("/:providerId", providerController.getProvider)
router.get("/alias/:alias", providerController.getProviderByAlias)
router.post("/", providerController.createProvider)
router.put("/:providerId", providerController.updateProvider)
router.delete("/:providerId", providerController.deleteProvider)

export default router
