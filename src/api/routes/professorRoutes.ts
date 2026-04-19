import { Router } from "express";
import { container } from "tsyringe";
import BaseController from "../controllers/baseController";
import EnsureAuthenticatedUserMiddleware from "@/api/middlewares/ensureAuthenticatedUserMiddleware";
import { EnsureCorrectFieldsValidationMiddleware } from "@/api/middlewares/ensureCorrectFieldsValidationMiddleware";
import { CreateProfessorPayload } from "@/api/middlewares/validations/professor/createProfessorPayload";
import { UpdateProfessorPayload } from "@/api/middlewares/validations/professor/updateProfessorPayload";
import { DeleteByIdPayload } from "@/api/middlewares/validations/shared/deleteByIdPayload";

const professorsRoutes = Router()
const getAllProfessorsController = container.resolve<BaseController>("GetAllProfessorsController")
const getProfessorByIdController = container.resolve<BaseController>("GetProfessorByIdController")
const createProfessorController = container.resolve<BaseController>("CreateProfessorController")
const updateProfessorController = container.resolve<BaseController>("UpdateProfessorController")
const deleteProfessorController = container.resolve<BaseController>("DeleteProfessorController")

professorsRoutes.get("/", (req, res) => getAllProfessorsController.Handle(req, res))
professorsRoutes.get("/:id", (req, res) => getProfessorByIdController.Handle(req, res))
professorsRoutes.post("/", EnsureAuthenticatedUserMiddleware, EnsureCorrectFieldsValidationMiddleware(CreateProfessorPayload), (req, res) => createProfessorController.Handle(req, res))
professorsRoutes.patch("/:id", EnsureAuthenticatedUserMiddleware, EnsureCorrectFieldsValidationMiddleware(UpdateProfessorPayload), (req, res) => updateProfessorController.Handle(req, res))
professorsRoutes.delete("/:id", EnsureCorrectFieldsValidationMiddleware(DeleteByIdPayload), (req, res) => deleteProfessorController.Handle(req, res))

export default professorsRoutes