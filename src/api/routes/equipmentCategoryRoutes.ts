import { Router } from "express";
import { container } from "tsyringe";
import BaseController from "../controllers/baseController";
import EnsureAuthenticatedUserMiddleware from "api/middlewares/ensureAuthenticatedUserMiddleware";

const equipmentCategoriesRoutes = Router()
const getAllEquipmentCategoriesController = container.resolve<BaseController>("GetAllEquipmentCategoriesController")
const getEquipmentCategoryByIdController = container.resolve<BaseController>("GetEquipmentCategoryByIdController")
const createEquipmentCategoryController = container.resolve<BaseController>("CreateEquipmentCategoryController")
const updateEquipmentCategoryController = container.resolve<BaseController>("UpdateEquipmentCategoryController")
const deleteEquipmentCategoryController = container.resolve<BaseController>("DeleteEquipmentCategoryController")

equipmentCategoriesRoutes.get("/", (req, res, next) => getAllEquipmentCategoriesController.Handle(req, res, next))
equipmentCategoriesRoutes.get("/:id", (req, res, next) => getEquipmentCategoryByIdController.Handle(req, res, next))
equipmentCategoriesRoutes.post("/", EnsureAuthenticatedUserMiddleware, (req, res, next) => createEquipmentCategoryController.Handle(req, res, next))
equipmentCategoriesRoutes.put("/:id", EnsureAuthenticatedUserMiddleware, (req, res, next) => updateEquipmentCategoryController.Handle(req, res, next))
equipmentCategoriesRoutes.delete("/:id", EnsureAuthenticatedUserMiddleware, (req, res, next) => deleteEquipmentCategoryController.Handle(req, res, next))

export default equipmentCategoriesRoutes
