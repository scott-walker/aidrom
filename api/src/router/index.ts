import { Router } from "express"
import chatRoutes from "./chat.routes.js"
import clientRoutes from "./client.routes.js"
import agentRoutes from "./agent.routes.js"
import providerRoutes from "./provider.routes.js"

const router: Router = Router()

router.get("/", (req, res) => res.json({ message: "API is running" }))
router.use("/providers", providerRoutes)
router.use("/agents", agentRoutes)
router.use("/clients", clientRoutes)
router.use("/chats", chatRoutes)

export { router }
