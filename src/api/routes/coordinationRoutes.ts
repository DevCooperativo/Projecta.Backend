import { Router } from "express";
import { container } from "tsyringe";
import BaseController from "../controllers/baseController";
import EnsureAuthenticatedUserMiddleware from "@/api/middlewares/ensureAuthenticatedUserMiddleware";
import { EnsureCorrectFieldsValidationMiddleware } from "@/api/middlewares/ensureCorrectFieldsValidationMiddleware";
import { CreateCoordinationPayload } from "@/api/middlewares/validations/coordination/createCoordinationPayload";
import { UpdateCoordinationPayload } from "@/api/middlewares/validations/coordination/updateCoordinationPayload";
import { DeleteByIdPayload } from "@/api/middlewares/validations/shared/deleteByIdPayload";

const coordinationRoutes = Router()
const getAllCoordinationsController = container.resolve<BaseController>("GetAllCoordinationsController")
const getCoordinationByIdController = container.resolve<BaseController>("GetCoordinationByIdController")
const createCoordinationController = container.resolve<BaseController>("CreateCoordinationController")
const updateCoordinationController = container.resolve<BaseController>("UpdateCoordinationController")
const deleteCoordinationController = container.resolve<BaseController>("DeleteCoordinationController")

coordinationRoutes.get("/", EnsureAuthenticatedUserMiddleware, (req, res) => getAllCoordinationsController.Handle(req, res))
coordinationRoutes.get("/:id", EnsureAuthenticatedUserMiddleware, (req, res) => getCoordinationByIdController.Handle(req, res))
coordinationRoutes.post("/", EnsureAuthenticatedUserMiddleware, EnsureCorrectFieldsValidationMiddleware(CreateCoordinationPayload), (req, res) => createCoordinationController.Handle(req, res))
coordinationRoutes.put("/:id", EnsureAuthenticatedUserMiddleware, EnsureCorrectFieldsValidationMiddleware(UpdateCoordinationPayload), (req, res) => updateCoordinationController.Handle(req, res))
coordinationRoutes.delete("/:id", EnsureCorrectFieldsValidationMiddleware(DeleteByIdPayload), (req, res) => deleteCoordinationController.Handle(req, res))

export default coordinationRoutes
