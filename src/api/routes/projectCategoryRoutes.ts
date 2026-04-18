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

projectCategoriesRoutes.get("/", (req, res, next) => getAllProjectCategoriesController.Handle(req, res, next))
projectCategoriesRoutes.get("/:id", (req, res, next) => getProjectCategoryByIdController.Handle(req, res, next))
projectCategoriesRoutes.post("/", EnsureAuthenticatedUserMiddleware, (req, res, next) => createProjectCategoryController.Handle(req, res, next))
projectCategoriesRoutes.put("/:id", EnsureAuthenticatedUserMiddleware, (req, res, next) => updateProjectCategoryController.Handle(req, res, next))
projectCategoriesRoutes.delete("/:id", EnsureAuthenticatedUserMiddleware, (req, res, next) => deleteProjectCategoryController.Handle(req, res, next))

export default projectCategoriesRoutes
