import { Router } from "express";
import { container } from "tsyringe";
import BaseController from "../controllers/baseController";
import EnsureAuthenticatedUserMiddleware from "@/api/middlewares/ensureAuthenticatedUserMiddleware";
import { EnsureCorrectFieldsValidationMiddleware } from "@/api/middlewares/ensureCorrectFieldsValidationMiddleware";
import { CreateProjectPayload } from "@/api/middlewares/validations/project/createProjectPayload";
import { UpdateProjectPayload } from "@/api/middlewares/validations/project/updateProjectPayload";
import { DeleteByIdPayload } from "@/api/middlewares/validations/shared/deleteByIdPayload";

const projectRoutes = Router()
const getAllProjectsController = container.resolve<BaseController>("GetAllProjectsController")
const getProjectByIdController = container.resolve<BaseController>("GetProjectByIdController")
const createProjectController = container.resolve<BaseController>("CreateProjectController")
const updateProjectController = container.resolve<BaseController>("UpdateProjectController")
const deleteProjectController = container.resolve<BaseController>("DeleteProjectController")

projectRoutes.get("/", (req, res) => getAllProjectsController.Handle(req, res))
projectRoutes.get("/:id", (req, res) => getProjectByIdController.Handle(req, res))
projectRoutes.post("/", EnsureAuthenticatedUserMiddleware, EnsureCorrectFieldsValidationMiddleware(CreateProjectPayload), (req, res) => createProjectController.Handle(req, res))
projectRoutes.put("/:id", EnsureAuthenticatedUserMiddleware, EnsureCorrectFieldsValidationMiddleware(UpdateProjectPayload), (req, res) => updateProjectController.Handle(req, res))
projectRoutes.delete("/:id", EnsureAuthenticatedUserMiddleware, EnsureCorrectFieldsValidationMiddleware(DeleteByIdPayload), (req, res) => deleteProjectController.Handle(req, res))

export default projectRoutes
