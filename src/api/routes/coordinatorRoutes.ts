import { Router } from "express";
import { container } from "tsyringe";
import BaseController from "../controllers/baseController";
import EnsureAuthenticatedUserMiddleware from "@/api/middlewares/ensureAuthenticatedUserMiddleware";
import { EnsureCorrectFieldsValidationMiddleware } from "@/api/middlewares/ensureCorrectFieldsValidationMiddleware";
import { CreateCoordinatorPayload } from "@/api/middlewares/validations/coordinator/createCoordinatorPayload";
import { UpdateCoordinatorPayload } from "@/api/middlewares/validations/coordinator/updateCoordinatorPayload";
import { DeleteByIdPayload } from "@/api/middlewares/validations/shared/deleteByIdPayload";

const coordinatorRoutes = Router()
const getAllCoordinatorsController = container.resolve<BaseController>("GetAllCoordinatorsController")
const getCoordinatorByIdController = container.resolve<BaseController>("GetCoordinatorByIdController")
const createCoordinatorController = container.resolve<BaseController>("CreateCoordinatorController")
const updateCoordinatorController = container.resolve<BaseController>("UpdateCoordinatorController")
const deleteCoordinatorController = container.resolve<BaseController>("DeleteCoordinatorController")

coordinatorRoutes.get("/", EnsureAuthenticatedUserMiddleware, (req, res) => getAllCoordinatorsController.Handle(req, res))
coordinatorRoutes.get("/:id", EnsureAuthenticatedUserMiddleware, (req, res) => getCoordinatorByIdController.Handle(req, res))
coordinatorRoutes.post("/", EnsureAuthenticatedUserMiddleware, EnsureCorrectFieldsValidationMiddleware(CreateCoordinatorPayload), (req, res) => createCoordinatorController.Handle(req, res))
coordinatorRoutes.put("/:id", EnsureAuthenticatedUserMiddleware, EnsureCorrectFieldsValidationMiddleware(UpdateCoordinatorPayload), (req, res) => updateCoordinatorController.Handle(req, res))
coordinatorRoutes.delete("/:id", EnsureCorrectFieldsValidationMiddleware(DeleteByIdPayload), (req, res) => deleteCoordinatorController.Handle(req, res))

export default coordinatorRoutes