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

coordinationRoutes.get("/", (req, res, next) => getAllCoordinationsController.Handle(req, res, next))
coordinationRoutes.get("/:id", (req, res, next) => getCoordinationByIdController.Handle(req, res, next))
coordinationRoutes.post("/", EnsureAuthenticatedUserMiddleware, (req, res, next) => createCoordinationController.Handle(req, res, next))
coordinationRoutes.put("/:id", EnsureAuthenticatedUserMiddleware, (req, res, next) => updateCoordinationController.Handle(req, res, next))
coordinationRoutes.delete("/:id", (req, res, next) => deleteCoordinationController.Handle(req, res, next))

export default coordinationRoutes
