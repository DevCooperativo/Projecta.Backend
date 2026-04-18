import { Router } from "express";
import { container } from "tsyringe";
import BaseController from "../controllers/baseController";
import EnsureAuthenticatedUserMiddleware from "api/middlewares/ensureAuthenticatedUserMiddleware";

const researcherRoutes = Router()
const getAllResearchersController = container.resolve<BaseController>("GetAllResearchersController")
const getResearcherByIdController = container.resolve<BaseController>("GetResearcherByIdController")
const createResearcherController = container.resolve<BaseController>("CreateResearcherController")
const updateResearcherController = container.resolve<BaseController>("UpdateResearcherController")
const deleteResearcherController = container.resolve<BaseController>("DeleteResearcherController")

researcherRoutes.get("/", (req, res, next) => getAllResearchersController.Handle(req, res, next))
researcherRoutes.get("/:id", (req, res, next) => getResearcherByIdController.Handle(req, res, next))
researcherRoutes.post("/", EnsureAuthenticatedUserMiddleware, (req, res, next) => createResearcherController.Handle(req, res, next))
researcherRoutes.put("/:id", EnsureAuthenticatedUserMiddleware, (req, res, next) => updateResearcherController.Handle(req, res, next))
researcherRoutes.delete("/:id", (req, res, next) => deleteResearcherController.Handle(req, res, next))

export default researcherRoutes
