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

professorsRoutes.get("/", (req, res) => getAllProfessorsController.Handle(req, res))
professorsRoutes.get("/:id", (req, res) => getProfessorByIdController.Handle(req, res))
professorsRoutes.put("/", EnsureAuthenticatedUserMiddleware, (req, res) => createProfessorController.Handle(req, res))
professorsRoutes.patch("/:id", EnsureAuthenticatedUserMiddleware, (req, res) => updateProfessorController.Handle(req, res))
professorsRoutes.delete("/:id", (req, res) => deleteProfessorController.Handle(req, res))

export default professorsRoutes