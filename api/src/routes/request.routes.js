import { Router } from "express"
import * as requestController from "#controllers/request.controller.js"

const router = Router()

router.get("/:requestId", requestController.getRequest)
router.get("/", requestController.getRequests)
router.post("/", requestController.createRequest)

export default router
