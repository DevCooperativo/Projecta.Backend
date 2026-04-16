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

laboratoriesRoutes.get("/", (req, res) => getAllLaboratoriesController.Handle(req, res))
laboratoriesRoutes.get("/:id", (req, res) => getLaboratoryByIdController.Handle(req, res))
laboratoriesRoutes.post("/", EnsureAuthenticatedUserMiddleware, (req, res) => createLaboratoryController.Handle(req, res))
laboratoriesRoutes.put("/:id", EnsureAuthenticatedUserMiddleware, (req, res) => updateLaboratoryController.Handle(req, res))
laboratoriesRoutes.delete("/:id", EnsureAuthenticatedUserMiddleware, (req, res) => deleteLaboratoryController.Handle(req, res))

export default laboratoriesRoutes
