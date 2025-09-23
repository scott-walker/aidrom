import { Router } from "express"
import * as requestController from "@controllers/request.controller"

const router: Router = Router()

// Роуты для запросов
router.get("/", requestController.getRequests)
router.get("/:requestId", requestController.getRequest)
router.delete("/", requestController.deleteRequests)
router.post("/clear-broken-requests", requestController.clearBrokenRequests)

export { router as requestRouter }
