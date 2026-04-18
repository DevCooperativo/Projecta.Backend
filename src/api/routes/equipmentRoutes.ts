import { Router } from "express";
import { container } from "tsyringe";
import BaseController from "../controllers/baseController";
import EnsureAuthenticatedUserMiddleware from "api/middlewares/ensureAuthenticatedUserMiddleware";

const equipmentsRoutes = Router()
const getAllEquipmentsController = container.resolve<BaseController>("GetAllEquipmentsController")
const getEquipmentByIdController = container.resolve<BaseController>("GetEquipmentByIdController")
const createEquipmentController = container.resolve<BaseController>("CreateEquipmentController")
const updateEquipmentController = container.resolve<BaseController>("UpdateEquipmentController")
const deleteEquipmentController = container.resolve<BaseController>("DeleteEquipmentController")

equipmentsRoutes.get("/", (req, res, next) => getAllEquipmentsController.Handle(req, res, next))
equipmentsRoutes.get("/:id", (req, res, next) => getEquipmentByIdController.Handle(req, res, next))
equipmentsRoutes.post("/", EnsureAuthenticatedUserMiddleware, (req, res, next) => createEquipmentController.Handle(req, res, next))
equipmentsRoutes.put("/:id", EnsureAuthenticatedUserMiddleware, (req, res, next) => updateEquipmentController.Handle(req, res, next))
equipmentsRoutes.delete("/:id", EnsureAuthenticatedUserMiddleware, (req, res, next) => deleteEquipmentController.Handle(req, res, next))

export default equipmentsRoutes