import { Router } from "express"
import userRoutes from "./request.routes.js"

const router = Router()

router.use("/requests", userRoutes)

export default router
