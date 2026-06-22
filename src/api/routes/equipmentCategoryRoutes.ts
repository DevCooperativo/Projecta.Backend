import { Router } from "express";
import { container } from "tsyringe";
import BaseController from "../controllers/baseController";
import EnsureAuthenticatedUserMiddleware from "@/api/middlewares/ensureAuthenticatedUserMiddleware";
import { EnsureCorrectFieldsValidationMiddleware } from "@/api/middlewares/ensureCorrectFieldsValidationMiddleware";
import { CreateEquipmentCategoryPayload } from "@/api/middlewares/validations/equipmentCategory/createEquipmentCategoryPayload";
import { UpdateEquipmentCategoryPayload } from "@/api/middlewares/validations/equipmentCategory/updateEquipmentCategoryPayload";
import { DeleteByIdPayload } from "@/api/middlewares/validations/shared/deleteByIdPayload";
import { EnsureUserRoleMiddleware } from "../middlewares/ensureUserRoleMiddleware";

const equipmentCategoriesRoutes = Router()
const getAllEquipmentCategoriesController = container.resolve<BaseController>("GetAllEquipmentCategoriesController")
const getEquipmentCategoryByIdController = container.resolve<BaseController>("GetEquipmentCategoryByIdController")
const createEquipmentCategoryController = container.resolve<BaseController>("CreateEquipmentCategoryController")
const updateEquipmentCategoryController = container.resolve<BaseController>("UpdateEquipmentCategoryController")
const deleteEquipmentCategoryController = container.resolve<BaseController>("DeleteEquipmentCategoryController")

equipmentCategoriesRoutes.get("/", EnsureAuthenticatedUserMiddleware, (req, res) => getAllEquipmentCategoriesController.Handle(req, res))
equipmentCategoriesRoutes.get("/:id", EnsureAuthenticatedUserMiddleware, (req, res) => getEquipmentCategoryByIdController.Handle(req, res))
equipmentCategoriesRoutes.post("/", EnsureAuthenticatedUserMiddleware,EnsureUserRoleMiddleware(["professor", "administrator"]), EnsureCorrectFieldsValidationMiddleware(CreateEquipmentCategoryPayload), (req, res) => createEquipmentCategoryController.Handle(req, res))
equipmentCategoriesRoutes.put("/:id", EnsureAuthenticatedUserMiddleware, EnsureCorrectFieldsValidationMiddleware(UpdateEquipmentCategoryPayload), (req, res) => updateEquipmentCategoryController.Handle(req, res))
equipmentCategoriesRoutes.delete("/:id", EnsureAuthenticatedUserMiddleware, EnsureCorrectFieldsValidationMiddleware(DeleteByIdPayload), (req, res) => deleteEquipmentCategoryController.Handle(req, res))

export default equipmentCategoriesRoutes
