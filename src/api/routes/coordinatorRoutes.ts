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

coordinatorRoutes.get("/", (req, res) => getAllCoordinatorsController.Handle(req, res))
coordinatorRoutes.get("/:id", (req, res) => getCoordinatorByIdController.Handle(req, res))
coordinatorRoutes.post("/", EnsureAuthenticatedUserMiddleware, (req, res) => createCoordinatorController.Handle(req, res))
coordinatorRoutes.put("/:id", EnsureAuthenticatedUserMiddleware, (req, res) => updateCoordinatorController.Handle(req, res))
coordinatorRoutes.delete("/:id", (req, res) => deleteCoordinatorController.Handle(req, res))

export default coordinatorRoutes