import { Router } from "express"
import * as providerController from "@controllers/provider.controller"

const router: Router = Router()

// Роуты для провайдеров
router.get("/", providerController.getProviders)
router.get("/drivers", providerController.getDrivers)
router.get("/:providerId", providerController.getProvider)
router.post("/", providerController.createProvider)
router.put("/:providerId", providerController.updateProvider)
router.delete("/:providerId", providerController.deleteProvider)

export { router as providerRouter }
