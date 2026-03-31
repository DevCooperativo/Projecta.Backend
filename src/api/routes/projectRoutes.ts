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

projectRoutes.get("/", (req, res) => getAllProjectsController.Handle(req, res))
projectRoutes.get("/:id", (req, res) => getProjectByIdController.Handle(req, res))
projectRoutes.put("/", EnsureAuthenticatedUserMiddleware, (req, res) => createProjectController.Handle(req, res))
projectRoutes.patch("/:id", EnsureAuthenticatedUserMiddleware, (req, res) => updateProjectController.Handle(req, res))
projectRoutes.delete("/:id", (req, res) => deleteProjectController.Handle(req, res))

export default projectRoutes
