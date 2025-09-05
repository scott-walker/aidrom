import { Router } from "express"
import * as requestController from "@controllers/request.controller"

const router: Router = Router()

// Роуты для запросов
router.get("/", requestController.getRequests)
router.get("/:requestId", requestController.getRequest)

export { router as requestRouter }
