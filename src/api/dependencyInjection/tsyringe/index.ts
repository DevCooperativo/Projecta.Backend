import BaseController from "api/controllers/baseController";
import GetAllCoordinationController from "api/controllers/getAllCoordinationController";
import CreateProfessorController from "api/controllers/professor/createProfessorController";
import DeleteProfessorController from "api/controllers/professor/deleteProfessorController";
import GetAllProfessorsController from "api/controllers/professor/getAllProfessorsController";
import GetProfessorByIdController from "api/controllers/professor/getProfessorByIdController";
import UpdateProfessorController from "api/controllers/professor/updateProfessorController";
import ICoordinationServices from "application/interfaces/iCoordinationServices";
import IEquipmentCategoryServices from "application/interfaces/iEquipmentCategoryServices";
import ILaboratoryServices from "application/interfaces/iLaboratoryServices";
import IProfessorServices from "application/interfaces/iProfessorServices";
import IProjectCategoryServices from "application/interfaces/iProjectCategoryServices";
import CoordinationServices from "application/services/CoordinationServices";
import EquipmentCategoryServices from "application/services/EquipmentCategoryServices";
import LaboratoryServices from "application/services/LaboratoryServices";
import ProfessorServices from "application/services/professorServices";
import ProjectCategoryServices from "application/services/ProjectCategoryServices";
import ICoordinationRepository from "domain/repositories/iCoordinationRepository";
import IEquipmentCategoryRepository from "domain/repositories/iEquipmentCategoryRepository";
import ILaboratoryRepository from "domain/repositories/iLaboratoryRepository";
import IProfessorRepository from "domain/repositories/iProfessorRepository";
import IProjectCategoryRepository from "domain/repositories/iProjectCategoryRepository";
import CoordinationRepository from "infrastructure/repositories/coordinationRepository";
import EquipmentCategoryRepository from "infrastructure/repositories/equipmentCategoryRepository";
import LaboratoryRepository from "infrastructure/repositories/laboratoryRepository";
import ProfessorRepository from "infrastructure/repositories/professorRepository";
import ProjectCategoryRepository from "infrastructure/repositories/projectCategoryRepository";
import { container } from "tsyringe";


container.registerSingleton<IProfessorRepository>("ProfessorRepository", ProfessorRepository)
container.registerSingleton<ICoordinationRepository>("CoordinationRepository", CoordinationRepository)
container.registerSingleton<ILaboratoryRepository>("LaboratoryRepository", LaboratoryRepository)
container.registerSingleton<IEquipmentCategoryRepository>("EquipmentCategoryRepository", EquipmentCategoryRepository)
container.registerSingleton<IProjectCategoryRepository>("ProjectCategoryRepository", ProjectCategoryRepository)
container.registerSingleton<IProfessorServices>("ProfessorServices", ProfessorServices)
container.registerSingleton<ICoordinationServices>("CoordinationServices", CoordinationServices)
container.registerSingleton<ILaboratoryServices>("LaboratoryServices", LaboratoryServices)
container.registerSingleton<IEquipmentCategoryServices>("EquipmentCategoryServices", EquipmentCategoryServices)
container.registerSingleton<IProjectCategoryServices>("ProjectCategoryServices", ProjectCategoryServices)
container.registerSingleton<BaseController>("GetAllCoordinationController", GetAllCoordinationController)
container.registerSingleton<BaseController>("GetAllProfessorsController", GetAllProfessorsController)
container.registerSingleton<BaseController>("GetProfessorByIdController", GetProfessorByIdController)
container.registerSingleton<BaseController>("CreateProfessorController", CreateProfessorController)
container.registerSingleton<BaseController>("UpdateProfessorController", UpdateProfessorController)
container.registerSingleton<BaseController>("DeleteProfessorController", DeleteProfessorController)