import { Router } from "express";
import { container } from "tsyringe";
import BaseController from "../controllers/baseController";
import EnsureAuthenticatedUserMiddleware from "api/middlewares/ensureAuthenticatedUserMiddleware";

const professorsRoutes = Router()
const getAllProfessorsController = container.resolve<BaseController>("GetAllProfessorsController")
const getProfessorByIdController = container.resolve<BaseController>("GetProfessorByIdController")
const createProfessorController = container.resolve<BaseController>("CreateProfessorController")
const updateProfessorController = container.resolve<BaseController>("UpdateProfessorController")
const deleteProfessorController = container.resolve<BaseController>("DeleteProfessorController")

professorsRoutes.get("/", (req, res, next) => getAllProfessorsController.Handle(req, res, next))
professorsRoutes.get("/:id", (req, res, next) => getProfessorByIdController.Handle(req, res, next))
professorsRoutes.post("/", EnsureAuthenticatedUserMiddleware, (req, res, next) => createProfessorController.Handle(req, res, next))
professorsRoutes.patch("/:id", EnsureAuthenticatedUserMiddleware, (req, res, next) => updateProfessorController.Handle(req, res, next))
professorsRoutes.delete("/:id", (req, res, next) => deleteProfessorController.Handle(req, res, next))

export default professorsRoutes