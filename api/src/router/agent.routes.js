import { Router } from "express"
import * as agentController from "@controllers/agent.controller.js"

const router = Router()

// Роуты для агентов
router.get("/", agentController.getAgents)
router.get("/:agentId", agentController.getAgent)
router.get("/alias/:alias", agentController.getAgentByAlias)
router.post("/", agentController.createAgent)
router.put("/:agentId", agentController.updateAgent)
router.delete("/:agentId", agentController.deleteAgent)

export default router
