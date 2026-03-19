import BaseController from "api/controllers/baseController";
import GetAllCoordinationController from "api/controllers/getAllCoordinationController";
import CreateProfessorController from "api/controllers/professor/createProfessorController";
import DeleteProfessorController from "api/controllers/professor/deleteProfessorController";
import GetAllProfessorsController from "api/controllers/professor/getAllProfessorsController";
import GetProfessorByIdController from "api/controllers/professor/getProfessorByIdController";
import UpdateProfessorController from "api/controllers/professor/updateProfessorController";
import ICoordinationServices from "application/interfaces/iCoordinationServices";
import IProfessorServices from "application/interfaces/iProfessorServices";
import CoordinationServices from "application/services/CoordinationServices";
import ProfessorServices from "application/services/professorServices";
import ICoordinationRepository from "domain/repositories/iCoordinationRepository";
import IProfessorRepository from "domain/repositories/iProfessorRepository";
import CoordinationRepository from "infrastructure/repositories/coordinationRepository";
import ProfessorRepository from "infrastructure/repositories/professorRepository";
import { container } from "tsyringe";


container.registerSingleton<IProfessorRepository>("ProfessorRepository", ProfessorRepository)
container.registerSingleton<ICoordinationRepository>("CoordinationRepository", CoordinationRepository)
container.registerSingleton<IProfessorServices>("ProfessorServices", ProfessorServices)
container.registerSingleton<ICoordinationServices>("CoordinationServices", CoordinationServices)
container.registerSingleton<BaseController>("GetAllCoordinationController", GetAllCoordinationController)
container.registerSingleton<BaseController>("GetAllProfessorsController", GetAllProfessorsController)
container.registerSingleton<BaseController>("GetProfessorByIdController", GetProfessorByIdController)
container.registerSingleton<BaseController>("CreateProfessorController", CreateProfessorController)
container.registerSingleton<BaseController>("UpdateProfessorController", UpdateProfessorController)
container.registerSingleton<BaseController>("DeleteProfessorController", DeleteProfessorController)