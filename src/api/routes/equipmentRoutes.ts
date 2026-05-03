import { Router } from "express";
import { container } from "tsyringe";
import BaseController from "../controllers/baseController";
import EnsureAuthenticatedUserMiddleware from "@/api/middlewares/ensureAuthenticatedUserMiddleware";
import { EnsureCorrectFieldsValidationMiddleware } from "@/api/middlewares/ensureCorrectFieldsValidationMiddleware";
import { CreateEquipmentPayload } from "@/api/middlewares/validations/equipment/createEquipmentPayload";
import { UpdateEquipmentPayload } from "@/api/middlewares/validations/equipment/updateEquipmentPayload";
import { DeleteByIdPayload } from "@/api/middlewares/validations/shared/deleteByIdPayload";
import { AccountType } from "@/infrastructure/authentication/constants/accountType";
import { EnsureUserRoleMiddleware } from "../middlewares/ensureUserRoleMiddleware";

const equipmentsRoutes = Router()
const getAllEquipmentsController = container.resolve<BaseController>("GetAllEquipmentsController")
const getEquipmentByIdController = container.resolve<BaseController>("GetEquipmentByIdController")
const createEquipmentController = container.resolve<BaseController>("CreateEquipmentController")
const updateEquipmentController = container.resolve<BaseController>("UpdateEquipmentController")
const deleteEquipmentController = container.resolve<BaseController>("DeleteEquipmentController")

equipmentsRoutes.get("/", (req, res) => getAllEquipmentsController.Handle(req, res))
equipmentsRoutes.get("/:id", (req, res) => getEquipmentByIdController.Handle(req, res))
equipmentsRoutes.post("/", EnsureAuthenticatedUserMiddleware, EnsureCorrectFieldsValidationMiddleware(CreateEquipmentPayload), EnsureUserRoleMiddleware([AccountType.professor]), (req, res) => createEquipmentController.Handle(req, res))
equipmentsRoutes.put("/:id", EnsureAuthenticatedUserMiddleware, EnsureCorrectFieldsValidationMiddleware(UpdateEquipmentPayload), EnsureUserRoleMiddleware([AccountType.professor]), (req, res) => updateEquipmentController.Handle(req, res))
equipmentsRoutes.delete("/:id", EnsureAuthenticatedUserMiddleware, EnsureCorrectFieldsValidationMiddleware(DeleteByIdPayload), EnsureUserRoleMiddleware([AccountType.professor]), (req, res) => deleteEquipmentController.Handle(req, res))

export default equipmentsRoutes
