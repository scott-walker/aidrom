import { Router } from "express"
import { getRequest, getRequests, createRequest } from "#controllers/request.controller.js"

const router = Router()

router.get("/:requestId", getRequest)
router.get("/", getRequests)
router.post("/", createRequest)

export default router
