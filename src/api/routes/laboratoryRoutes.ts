import { Router } from "express";
import { container } from "tsyringe";
import BaseController from "../controllers/baseController";
import EnsureAuthenticatedUserMiddleware from "@/api/middlewares/ensureAuthenticatedUserMiddleware";
import { EnsureCorrectFieldsValidationMiddleware } from "@/api/middlewares/ensureCorrectFieldsValidationMiddleware";
import { CreateLaboratoryPayload } from "@/api/middlewares/validations/laboratory/createLaboratoryPayload";
import { UpdateLaboratoryPayload } from "@/api/middlewares/validations/laboratory/updateLaboratoryPayload";
import { DeleteByIdPayload } from "@/api/middlewares/validations/shared/deleteByIdPayload";

const laboratoriesRoutes = Router()
const getAllLaboratoriesController = container.resolve<BaseController>("GetAllLaboratoriesController")
const getLaboratoryByIdController = container.resolve<BaseController>("GetLaboratoryByIdController")
const createLaboratoryController = container.resolve<BaseController>("CreateLaboratoryController")
const updateLaboratoryController = container.resolve<BaseController>("UpdateLaboratoryController")
const deleteLaboratoryController = container.resolve<BaseController>("DeleteLaboratoryController")

laboratoriesRoutes.get("/", EnsureAuthenticatedUserMiddleware, (req, res) => getAllLaboratoriesController.Handle(req, res))
laboratoriesRoutes.get("/:id", EnsureAuthenticatedUserMiddleware, (req, res) => getLaboratoryByIdController.Handle(req, res))
laboratoriesRoutes.post("/", EnsureAuthenticatedUserMiddleware, EnsureCorrectFieldsValidationMiddleware(CreateLaboratoryPayload), (req, res) => createLaboratoryController.Handle(req, res))
laboratoriesRoutes.put("/:id", EnsureAuthenticatedUserMiddleware, EnsureCorrectFieldsValidationMiddleware(UpdateLaboratoryPayload), (req, res) => updateLaboratoryController.Handle(req, res))
laboratoriesRoutes.delete("/:id", EnsureAuthenticatedUserMiddleware, EnsureCorrectFieldsValidationMiddleware(DeleteByIdPayload), (req, res) => deleteLaboratoryController.Handle(req, res))

export default laboratoriesRoutes
