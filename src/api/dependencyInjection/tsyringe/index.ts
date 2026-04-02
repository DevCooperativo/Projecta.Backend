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
import GetAllLaboratoriesController from "api/controllers/laboratory/getAllLaboratoriesController";
import GetLaboratoryByIdController from "api/controllers/laboratory/getLaboratoryByIdController";
import CreateLaboratoryController from "api/controllers/laboratory/createLaboratoryController";
import UpdateLaboratoryController from "api/controllers/laboratory/updateLaboratoryController";
import DeleteLaboratoryController from "api/controllers/laboratory/deleteLaboratoryController";
import GetAllProjectCategoriesController from "api/controllers/projectCategory/getAllProjectCategoriesController";
import GetProjectCategoryByIdController from "api/controllers/projectCategory/getProjectCategoryByIdController";
import CreateProjectCategoryController from "api/controllers/projectCategory/createProjectCategoryController";
import UpdateProjectCategoryController from "api/controllers/projectCategory/updateProjectCategoryController";
import DeleteProjectCategoryController from "api/controllers/projectCategory/deleteProjectCategoryController";
import GetAllEquipmentCategoriesController from "api/controllers/equipmentCategory/getAllEquipmentCategoriesController";
import GetEquipmentCategoryByIdController from "api/controllers/equipmentCategory/getEquipmentCategoryByIdController";
import CreateEquipmentCategoryController from "api/controllers/equipmentCategory/createEquipmentCategoryController";
import UpdateEquipmentCategoryController from "api/controllers/equipmentCategory/updateEquipmentCategoryController";
import DeleteEquipmentCategoryController from "api/controllers/equipmentCategory/deleteEquipmentCategoryController";
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
import IAdministratorRepository from "domain/repositories/iAdministratorRepository";
import AdministratorRepository from "infrastructure/repositories/administratorRepository";
import StudentRepository from "infrastructure/repositories/studentRepository";
import IStudentRepository from "domain/repositories/iStudentRepository";
import StudentServices from "application/services/studentServices";
import IStudentServices from "application/interfaces/iStudentServices";
import AdministratorServices from "application/services/administratorServices";
import IAdministratorServices from "application/interfaces/iAdministratorServices";

// Repositories
container.registerSingleton<IProfessorRepository>("ProfessorRepository", ProfessorRepository)
container.registerSingleton<IAdministratorRepository>("AdministratorRepository", AdministratorRepository)
container.registerSingleton<IStudentRepository>("StudentRepository", StudentRepository)
container.registerSingleton<ICoordinationRepository>("CoordinationRepository", CoordinationRepository)
container.registerSingleton<ICoordinatorRepository>("CoordinatorRepository", CoordinatorRepository)
container.registerSingleton<ILaboratoryRepository>("LaboratoryRepository", LaboratoryRepository)
container.registerSingleton<IEquipmentCategoryRepository>("EquipmentCategoryRepository", EquipmentCategoryRepository)
container.registerSingleton<IProjectCategoryRepository>("ProjectCategoryRepository", ProjectCategoryRepository)
container.registerSingleton<IProjectRepository>("ProjectRepository", ProjectRepository)
container.registerSingleton<IResearcherRepository>("ResearcherRepository", ResearcherRepository)

// Services
container.registerSingleton<IProfessorServices>("ProfessorServices", ProfessorServices)
container.registerSingleton<IAdministratorServices>("AdministratorServices", AdministratorServices)
container.registerSingleton<IStudentServices>("StudentServices", StudentServices)
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

// Controllers - Laboratory
container.registerSingleton<BaseController>("GetAllLaboratoriesController", GetAllLaboratoriesController)
container.registerSingleton<BaseController>("GetLaboratoryByIdController", GetLaboratoryByIdController)
container.registerSingleton<BaseController>("CreateLaboratoryController", CreateLaboratoryController)
container.registerSingleton<BaseController>("UpdateLaboratoryController", UpdateLaboratoryController)
container.registerSingleton<BaseController>("DeleteLaboratoryController", DeleteLaboratoryController)

// Controllers - ProjectCategory
container.registerSingleton<BaseController>("GetAllProjectCategoriesController", GetAllProjectCategoriesController)
container.registerSingleton<BaseController>("GetProjectCategoryByIdController", GetProjectCategoryByIdController)
container.registerSingleton<BaseController>("CreateProjectCategoryController", CreateProjectCategoryController)
container.registerSingleton<BaseController>("UpdateProjectCategoryController", UpdateProjectCategoryController)
container.registerSingleton<BaseController>("DeleteProjectCategoryController", DeleteProjectCategoryController)

// Controllers - EquipmentCategory
container.registerSingleton<BaseController>("GetAllEquipmentCategoriesController", GetAllEquipmentCategoriesController)
container.registerSingleton<BaseController>("GetEquipmentCategoryByIdController", GetEquipmentCategoryByIdController)
container.registerSingleton<BaseController>("CreateEquipmentCategoryController", CreateEquipmentCategoryController)
container.registerSingleton<BaseController>("UpdateEquipmentCategoryController", UpdateEquipmentCategoryController)
container.registerSingleton<BaseController>("DeleteEquipmentCategoryController", DeleteEquipmentCategoryController)