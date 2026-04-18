import { Router } from "express";
import { container } from "tsyringe";
import BaseController from "../controllers/baseController";
import EnsureAuthenticatedUserMiddleware from "api/middlewares/ensureAuthenticatedUserMiddleware";

const laboratoriesRoutes = Router()
const getAllLaboratoriesController = container.resolve<BaseController>("GetAllLaboratoriesController")
const getLaboratoryByIdController = container.resolve<BaseController>("GetLaboratoryByIdController")
const createLaboratoryController = container.resolve<BaseController>("CreateLaboratoryController")
const updateLaboratoryController = container.resolve<BaseController>("UpdateLaboratoryController")
const deleteLaboratoryController = container.resolve<BaseController>("DeleteLaboratoryController")

laboratoriesRoutes.get("/", (req, res, next) => getAllLaboratoriesController.Handle(req, res, next))
laboratoriesRoutes.get("/:id", (req, res, next) => getLaboratoryByIdController.Handle(req, res, next))
laboratoriesRoutes.post("/", EnsureAuthenticatedUserMiddleware, (req, res, next) => createLaboratoryController.Handle(req, res, next))
laboratoriesRoutes.put("/:id", EnsureAuthenticatedUserMiddleware, (req, res, next) => updateLaboratoryController.Handle(req, res, next))
laboratoriesRoutes.delete("/:id", EnsureAuthenticatedUserMiddleware, (req, res, next) => deleteLaboratoryController.Handle(req, res, next))

export default laboratoriesRoutes
