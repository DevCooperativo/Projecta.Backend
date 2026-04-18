import { Router } from "express";
import { container } from "tsyringe";
import BaseController from "../controllers/baseController";
import EnsureAuthenticatedUserMiddleware from "api/middlewares/ensureAuthenticatedUserMiddleware";

const coordinatorRoutes = Router()
const getAllCoordinatorsController = container.resolve<BaseController>("GetAllCoordinatorsController")
const getCoordinatorByIdController = container.resolve<BaseController>("GetCoordinatorByIdController")
const createCoordinatorController = container.resolve<BaseController>("CreateCoordinatorController")
const updateCoordinatorController = container.resolve<BaseController>("UpdateCoordinatorController")
const deleteCoordinatorController = container.resolve<BaseController>("DeleteCoordinatorController")

coordinatorRoutes.get("/", (req, res, next) => getAllCoordinatorsController.Handle(req, res, next))
coordinatorRoutes.get("/:id", (req, res, next) => getCoordinatorByIdController.Handle(req, res, next))
coordinatorRoutes.post("/", EnsureAuthenticatedUserMiddleware, (req, res, next) => createCoordinatorController.Handle(req, res, next))
coordinatorRoutes.put("/:id", EnsureAuthenticatedUserMiddleware, (req, res, next) => updateCoordinatorController.Handle(req, res, next))
coordinatorRoutes.delete("/:id", (req, res, next) => deleteCoordinatorController.Handle(req, res, next))

export default coordinatorRoutes