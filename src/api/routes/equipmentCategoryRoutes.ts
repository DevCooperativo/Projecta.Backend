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

equipmentCategoriesRoutes.get("/", (req, res) => getAllEquipmentCategoriesController.Handle(req, res))
equipmentCategoriesRoutes.get("/:id", (req, res) => getEquipmentCategoryByIdController.Handle(req, res))
equipmentCategoriesRoutes.put("/", EnsureAuthenticatedUserMiddleware, (req, res) => createEquipmentCategoryController.Handle(req, res))
equipmentCategoriesRoutes.patch("/:id", EnsureAuthenticatedUserMiddleware, (req, res) => updateEquipmentCategoryController.Handle(req, res))
equipmentCategoriesRoutes.delete("/:id", (req, res) => deleteEquipmentCategoryController.Handle(req, res))

export default equipmentCategoriesRoutes
