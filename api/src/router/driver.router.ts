import { Router } from "express"
import * as driverController from "@controllers/driver.controller"

const router: Router = Router()

// Роуты для драйверов
router.get("/", driverController.getDrivers)
router.get("/:driverId", driverController.getDriver)

export { router as driverRouter }
