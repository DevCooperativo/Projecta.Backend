import { Router } from "express";
import { container } from "tsyringe";
import BaseController from "../controllers/baseController";
import EnsureAuthenticatedUserMiddleware from "api/middlewares/ensureAuthenticatedUserMiddleware";

const coordinationRoutes = Router()
const getAllCoordinationsController = container.resolve<BaseController>("GetAllCoordinationsController")
const getCoordinationByIdController = container.resolve<BaseController>("GetCoordinationByIdController")
const createCoordinationController = container.resolve<BaseController>("CreateCoordinationController")
const updateCoordinationController = container.resolve<BaseController>("UpdateCoordinationController")
const deleteCoordinationController = container.resolve<BaseController>("DeleteCoordinationController")

coordinationRoutes.get("/", (req, res) => getAllCoordinationsController.Handle(req, res))
coordinationRoutes.get("/:id", (req, res) => getCoordinationByIdController.Handle(req, res))
coordinationRoutes.post("/", EnsureAuthenticatedUserMiddleware, (req, res) => createCoordinationController.Handle(req, res))
coordinationRoutes.put("/:id", EnsureAuthenticatedUserMiddleware, (req, res) => updateCoordinationController.Handle(req, res))
coordinationRoutes.delete("/:id", (req, res) => deleteCoordinationController.Handle(req, res))

export default coordinationRoutes
