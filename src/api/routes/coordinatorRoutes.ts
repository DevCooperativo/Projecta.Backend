import { Router } from "express";
import { container } from "tsyringe";

const coordinatorRoutes = Router()

coordinatorRoutes.get("/", (req, res) => container.resolve<BaseController>("CoordinatorController"))

export default coordinatorRoutes