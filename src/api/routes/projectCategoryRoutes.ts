import { Router } from "express";
import { container } from "tsyringe";
import BaseController from "../controllers/baseController";
import EnsureAuthenticatedUserMiddleware from "api/middlewares/ensureAuthenticatedUserMiddleware";

const projectCategoriesRoutes = Router()
const getAllProjectCategoriesController = container.resolve<BaseController>("GetAllProjectCategoriesController")
const getProjectCategoryByIdController = container.resolve<BaseController>("GetProjectCategoryByIdController")
const createProjectCategoryController = container.resolve<BaseController>("CreateProjectCategoryController")
const updateProjectCategoryController = container.resolve<BaseController>("UpdateProjectCategoryController")
const deleteProjectCategoryController = container.resolve<BaseController>("DeleteProjectCategoryController")

projectCategoriesRoutes.get("/", (req, res) => getAllProjectCategoriesController.Handle(req, res))
projectCategoriesRoutes.get("/:id", (req, res) => getProjectCategoryByIdController.Handle(req, res))
projectCategoriesRoutes.post("/", EnsureAuthenticatedUserMiddleware, (req, res) => createProjectCategoryController.Handle(req, res))
projectCategoriesRoutes.put("/:id", EnsureAuthenticatedUserMiddleware, (req, res) => updateProjectCategoryController.Handle(req, res))
projectCategoriesRoutes.delete("/:id", EnsureAuthenticatedUserMiddleware, (req, res) => deleteProjectCategoryController.Handle(req, res))

export default projectCategoriesRoutes
