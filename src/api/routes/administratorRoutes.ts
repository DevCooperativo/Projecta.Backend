import BaseController from "@/api/controllers/baseController";
import EnsureAuthenticatedUserMiddleware from "@/api/middlewares/ensureAuthenticatedUserMiddleware";
import { EnsureCorrectFieldsValidationMiddleware } from "@/api/middlewares/ensureCorrectFieldsValidationMiddleware";
import { CreateAdministratorPayload } from "@/api/middlewares/validations/administrator/createAdministratorPayload";
import { UpdateAdministratorPayload } from "@/api/middlewares/validations/administrator/updateAdministratorPayload";
import { DeleteByIdPayload } from "@/api/middlewares/validations/shared/deleteByIdPayload";
import { Router } from "express";
import { container } from "tsyringe";

const administratorRoutes = Router()
const getAllAdministratorsController = container.resolve<BaseController>("GetAllAdministratorsController")
const getAdministratorByIdController = container.resolve<BaseController>("GetAdministratorByIdController")
const createAdministratorController = container.resolve<BaseController>("CreateAdministratorController")
const updateAdministratorController = container.resolve<BaseController>("UpdateAdministratorController")
const deleteAdministratorController = container.resolve<BaseController>("DeleteAdministratorController")

administratorRoutes.get("/", (req, res) => getAllAdministratorsController.Handle(req, res))
administratorRoutes.get("/:id", (req, res) => getAdministratorByIdController.Handle(req, res))
administratorRoutes.post("/", EnsureAuthenticatedUserMiddleware, EnsureCorrectFieldsValidationMiddleware(CreateAdministratorPayload), (req, res) => createAdministratorController.Handle(req, res))
administratorRoutes.put("/:id", EnsureAuthenticatedUserMiddleware, EnsureCorrectFieldsValidationMiddleware(UpdateAdministratorPayload), (req, res) => updateAdministratorController.Handle(req, res))
administratorRoutes.delete("/:id", EnsureCorrectFieldsValidationMiddleware(DeleteByIdPayload), (req, res) => deleteAdministratorController.Handle(req, res))

export default administratorRoutes
