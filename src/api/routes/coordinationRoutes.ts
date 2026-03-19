import BaseController from "api/controllers/baseController";
import { Router } from "express";
import { container } from "tsyringe";

const coordinationRoutes = Router()
const coordinationController = container.resolve<BaseController>("GetAllCoordinationController")
coordinationRoutes.get("/", (req, res) => coordinationController.Handle(req, res))

export default coordinationRoutes