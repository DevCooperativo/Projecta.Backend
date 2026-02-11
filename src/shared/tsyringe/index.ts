import BaseController from "api/controllers/baseController";
import CreateProfessorController from "api/controllers/professor/createProfessorController";
import DeleteProfessorController from "api/controllers/professor/deleteProfessorController";
import GetAllProfessorsController from "api/controllers/professor/getAllProfessorsController";
import GetProfessorByIdController from "api/controllers/professor/getProfessorByIdController";
import UpdateProfessorController from "api/controllers/professor/updateProfessorController";
import IProfessorServices from "application/interfaces/iProfessorServices";
import ProfessorServices from "application/services/professorServices";
import IProfessorRepository from "domain/repositories/iProfessorRepository";
import ProfessorRepository from "infrastructure/repositories/professorRepository";
import { container } from "tsyringe";


container.registerSingleton<IProfessorRepository>("ProfessorRepository", ProfessorRepository)
container.registerSingleton<IProfessorServices>("ProfessorServices", ProfessorServices)
container.registerSingleton<BaseController>("GetAllProfessorsController", GetAllProfessorsController)
container.registerSingleton<BaseController>("GetProfessorByIdController", GetProfessorByIdController)
container.registerSingleton<BaseController>("CreateProfessorController", CreateProfessorController)
container.registerSingleton<BaseController>("UpdateProfessorController", UpdateProfessorController)
container.registerSingleton<BaseController>("DeleteProfessorController", DeleteProfessorController)