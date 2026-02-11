import { Router } from "express";
import { container } from "tsyringe";
import BaseController from "../controllers/baseController";

const coordinatorRoutes = Router()
// const coordinatorController = container.resolve<BaseController>("CoordinatorController")
// coordinatorRoutes.get("/", (req, res) => coordinatorController.Handle(req, res))

export default coordinatorRoutes