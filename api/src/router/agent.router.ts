import { Router } from "express"
import * as agentController from "@controllers/agent.controller"

const router: Router = Router()

// Роуты для агентов
router.get("/", agentController.getAgents)
router.get("/:agentId", agentController.getAgent)
router.post("/", agentController.createAgent)
router.put("/:agentId", agentController.updateAgent)
router.delete("/:agentId", agentController.deleteAgent)
router.post("/:agentId/rules", agentController.addRule)
router.delete("/:agentId/rules/:ruleId", agentController.deleteRule)
router.put("/:agentId/rules-sort", agentController.sortRules)

export { router as agentRouter }
