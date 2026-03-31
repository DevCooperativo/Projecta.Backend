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

researcherRoutes.get("/", (req, res) => getAllResearchersController.Handle(req, res))
researcherRoutes.get("/:id", (req, res) => getResearcherByIdController.Handle(req, res))
researcherRoutes.put("/", EnsureAuthenticatedUserMiddleware, (req, res) => createResearcherController.Handle(req, res))
researcherRoutes.patch("/:id", EnsureAuthenticatedUserMiddleware, (req, res) => updateResearcherController.Handle(req, res))
researcherRoutes.delete("/:id", (req, res) => deleteResearcherController.Handle(req, res))

export default researcherRoutes
