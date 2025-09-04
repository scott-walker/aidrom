import { Router, Request, Response } from "express"
import { chatRouter } from "./chat.router"
import { clientRouter } from "./client.router"
import { agentRouter } from "./agent.router"
import { providerRouter } from "./provider.router"
import { driverRouter } from "./driver.router"

const router: Router = Router()

router.get("/", (req: Request, res: Response) => res.json({ message: "API is running" }))
router.use("/providers", providerRouter)
router.use("/agents", agentRouter)
router.use("/clients", clientRouter)
router.use("/chats", chatRouter)
router.use("/drivers", driverRouter)

export { router }
