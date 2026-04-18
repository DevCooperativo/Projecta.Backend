import { Router } from "express";
import { container } from "tsyringe";
import BaseController from "../controllers/baseController";
import EnsureAuthenticatedUserMiddleware from "api/middlewares/ensureAuthenticatedUserMiddleware";

const projectRoutes = Router()
const getAllProjectsController = container.resolve<BaseController>("GetAllProjectsController")
const getProjectByIdController = container.resolve<BaseController>("GetProjectByIdController")
const createProjectController = container.resolve<BaseController>("CreateProjectController")
const updateProjectController = container.resolve<BaseController>("UpdateProjectController")
const deleteProjectController = container.resolve<BaseController>("DeleteProjectController")

projectRoutes.get("/", (req, res, next) => getAllProjectsController.Handle(req, res, next))
projectRoutes.get("/:id", (req, res, next) => getProjectByIdController.Handle(req, res, next))
projectRoutes.post("/", EnsureAuthenticatedUserMiddleware, (req, res, next) => createProjectController.Handle(req, res, next))
projectRoutes.put("/:id", EnsureAuthenticatedUserMiddleware, (req, res, next) => updateProjectController.Handle(req, res, next))
projectRoutes.delete("/:id", (req, res, next) => deleteProjectController.Handle(req, res, next))

export default projectRoutes
