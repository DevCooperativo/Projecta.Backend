import BaseController from "api/controllers/baseController";
import GetAllCoordinationController from "api/controllers/getAllCoordinationController";
import CreateProfessorController from "api/controllers/professor/createProfessorController";
import DeleteProfessorController from "api/controllers/professor/deleteProfessorController";
import GetAllProfessorsController from "api/controllers/professor/getAllProfessorsController";
import GetProfessorByIdController from "api/controllers/professor/getProfessorByIdController";
import UpdateProfessorController from "api/controllers/professor/updateProfessorController";
import GetAllCoordinatorsController from "api/controllers/coordinator/getAllCoordinatorsController";
import GetCoordinatorByIdController from "api/controllers/coordinator/getCoordinatorByIdController";
import CreateCoordinatorController from "api/controllers/coordinator/createCoordinatorController";
import UpdateCoordinatorController from "api/controllers/coordinator/updateCoordinatorController";
import DeleteCoordinatorController from "api/controllers/coordinator/deleteCoordinatorController";
import GetAllProjectsController from "api/controllers/project/getAllProjectsController";
import GetProjectByIdController from "api/controllers/project/getProjectByIdController";
import CreateProjectController from "api/controllers/project/createProjectController";
import UpdateProjectController from "api/controllers/project/updateProjectController";
import DeleteProjectController from "api/controllers/project/deleteProjectController";
import GetAllResearchersController from "api/controllers/researcher/getAllResearchersController";
import GetResearcherByIdController from "api/controllers/researcher/getResearcherByIdController";
import CreateResearcherController from "api/controllers/researcher/createResearcherController";
import UpdateResearcherController from "api/controllers/researcher/updateResearcherController";
import DeleteResearcherController from "api/controllers/researcher/deleteResearcherController";
import ICoordinationServices from "application/interfaces/iCoordinationServices";
import ICoordinatorServices from "application/interfaces/iCoordinatorServices";
import IEquipmentCategoryServices from "application/interfaces/iEquipmentCategoryServices";
import ILaboratoryServices from "application/interfaces/iLaboratoryServices";
import IProfessorServices from "application/interfaces/iProfessorServices";
import IProjectCategoryServices from "application/interfaces/iProjectCategoryServices";
import IProjectServices from "application/interfaces/iProjectServices";
import IResearcherServices from "application/interfaces/iResearcherServices";
import CoordinationServices from "application/services/CoordinationServices";
import CoordinatorServices from "application/services/CoordinatorServices";
import EquipmentCategoryServices from "application/services/EquipmentCategoryServices";
import LaboratoryServices from "application/services/LaboratoryServices";
import ProfessorServices from "application/services/professorServices";
import ProjectCategoryServices from "application/services/ProjectCategoryServices";
import ProjectServices from "application/services/ProjectServices";
import ResearcherServices from "application/services/ResearcherServices";
import ICoordinationRepository from "domain/repositories/iCoordinationRepository";
import ICoordinatorRepository from "domain/repositories/iCoordinatorRepository";
import IEquipmentCategoryRepository from "domain/repositories/iEquipmentCategoryRepository";
import ILaboratoryRepository from "domain/repositories/iLaboratoryRepository";
import IProfessorRepository from "domain/repositories/iProfessorRepository";
import IProjectCategoryRepository from "domain/repositories/iProjectCategoryRepository";
import IProjectRepository from "domain/repositories/iProjectRepository";
import IResearcherRepository from "domain/repositories/iResearcherRepository";
import CoordinationRepository from "infrastructure/repositories/coordinationRepository";
import CoordinatorRepository from "infrastructure/repositories/coordinatorRepository";
import EquipmentCategoryRepository from "infrastructure/repositories/equipmentCategoryRepository";
import LaboratoryRepository from "infrastructure/repositories/laboratoryRepository";
import ProfessorRepository from "infrastructure/repositories/professorRepository";
import ProjectCategoryRepository from "infrastructure/repositories/projectCategoryRepository";
import ProjectRepository from "infrastructure/repositories/projectRepository";
import ResearcherRepository from "infrastructure/repositories/researcherRepository";
import { container } from "tsyringe";

// Repositories
container.registerSingleton<IProfessorRepository>("ProfessorRepository", ProfessorRepository)
container.registerSingleton<ICoordinationRepository>("CoordinationRepository", CoordinationRepository)
container.registerSingleton<ICoordinatorRepository>("CoordinatorRepository", CoordinatorRepository)
container.registerSingleton<ILaboratoryRepository>("LaboratoryRepository", LaboratoryRepository)
container.registerSingleton<IEquipmentCategoryRepository>("EquipmentCategoryRepository", EquipmentCategoryRepository)
container.registerSingleton<IProjectCategoryRepository>("ProjectCategoryRepository", ProjectCategoryRepository)
container.registerSingleton<IProjectRepository>("ProjectRepository", ProjectRepository)
container.registerSingleton<IResearcherRepository>("ResearcherRepository", ResearcherRepository)

// Services
container.registerSingleton<IProfessorServices>("ProfessorServices", ProfessorServices)
container.registerSingleton<ICoordinationServices>("CoordinationServices", CoordinationServices)
container.registerSingleton<ICoordinatorServices>("CoordinatorServices", CoordinatorServices)
container.registerSingleton<ILaboratoryServices>("LaboratoryServices", LaboratoryServices)
container.registerSingleton<IEquipmentCategoryServices>("EquipmentCategoryServices", EquipmentCategoryServices)
container.registerSingleton<IProjectCategoryServices>("ProjectCategoryServices", ProjectCategoryServices)
container.registerSingleton<IProjectServices>("ProjectServices", ProjectServices)
container.registerSingleton<IResearcherServices>("ResearcherServices", ResearcherServices)

// Controllers - Coordination
container.registerSingleton<BaseController>("GetAllCoordinationController", GetAllCoordinationController)

// Controllers - Professor
container.registerSingleton<BaseController>("GetAllProfessorsController", GetAllProfessorsController)
container.registerSingleton<BaseController>("GetProfessorByIdController", GetProfessorByIdController)
container.registerSingleton<BaseController>("CreateProfessorController", CreateProfessorController)
container.registerSingleton<BaseController>("UpdateProfessorController", UpdateProfessorController)
container.registerSingleton<BaseController>("DeleteProfessorController", DeleteProfessorController)

// Controllers - Coordinator
container.registerSingleton<BaseController>("GetAllCoordinatorsController", GetAllCoordinatorsController)
container.registerSingleton<BaseController>("GetCoordinatorByIdController", GetCoordinatorByIdController)
container.registerSingleton<BaseController>("CreateCoordinatorController", CreateCoordinatorController)
container.registerSingleton<BaseController>("UpdateCoordinatorController", UpdateCoordinatorController)
container.registerSingleton<BaseController>("DeleteCoordinatorController", DeleteCoordinatorController)

// Controllers - Project
container.registerSingleton<BaseController>("GetAllProjectsController", GetAllProjectsController)
container.registerSingleton<BaseController>("GetProjectByIdController", GetProjectByIdController)
container.registerSingleton<BaseController>("CreateProjectController", CreateProjectController)
container.registerSingleton<BaseController>("UpdateProjectController", UpdateProjectController)
container.registerSingleton<BaseController>("DeleteProjectController", DeleteProjectController)

// Controllers - Researcher
container.registerSingleton<BaseController>("GetAllResearchersController", GetAllResearchersController)
container.registerSingleton<BaseController>("GetResearcherByIdController", GetResearcherByIdController)
container.registerSingleton<BaseController>("CreateResearcherController", CreateResearcherController)
container.registerSingleton<BaseController>("UpdateResearcherController", UpdateResearcherController)
container.registerSingleton<BaseController>("DeleteResearcherController", DeleteResearcherController)