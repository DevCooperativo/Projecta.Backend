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

equipmentsRoutes.get("/", (req, res) => getAllEquipmentsController.Handle(req, res))
equipmentsRoutes.get("/:id", (req, res) => getEquipmentByIdController.Handle(req, res))
equipmentsRoutes.put("/", EnsureAuthenticatedUserMiddleware, (req, res) => createEquipmentController.Handle(req, res))
equipmentsRoutes.patch("/:id", EnsureAuthenticatedUserMiddleware, (req, res) => updateEquipmentController.Handle(req, res))
equipmentsRoutes.delete("/:id", (req, res) => deleteEquipmentController.Handle(req, res))

export default equipmentsRoutes