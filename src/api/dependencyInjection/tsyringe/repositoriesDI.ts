import { IUnitOfWork } from "@/application/unitOfWork/iUnitOfWork"
import IAdministratorRepository from "@/domain/repositories/iAdministratorRepository"
import IBorrowRepository from "@/domain/repositories/iBorrowRepository"
import ICoordinationRepository from "@/domain/repositories/iCoordinationRepository"
import ICoordinatorRepository from "@/domain/repositories/iCoordinatorRepository"
import IEquipmentCategoryRepository from "@/domain/repositories/iEquipmentCategoryRepository"
import IEquipmentRepository from "@/domain/repositories/iEquipmentRepository"
import ILaboratoryRepository from "@/domain/repositories/iLaboratoryRepository"
import IProfessorRepository from "@/domain/repositories/iProfessorRepository"
import IProjectCategoryRepository from "@/domain/repositories/iProjectCategoryRepository"
import IProjectRepository from "@/domain/repositories/iProjectRepository"
import IResearcherRepository from "@/domain/repositories/iResearcherRepository"
import IStudentRepository from "@/domain/repositories/iStudentRepository"
import { SequelizeUnitOfWork } from "@/infrastructure/data/unitOfWork"
import AdministratorRepository from "@/infrastructure/repositories/administratorRepository"
import BorrowRepository from "@/infrastructure/repositories/borrowRepository"
import CoordinationRepository from "@/infrastructure/repositories/coordinationRepository"
import CoordinatorRepository from "@/infrastructure/repositories/coordinatorRepository"
import EquipmentCategoryRepository from "@/infrastructure/repositories/equipmentCategoryRepository"
import EquipmentRepository from "@/infrastructure/repositories/equipmentRepository"
import LaboratoryRepository from "@/infrastructure/repositories/laboratoryRepository"
import ProfessorRepository from "@/infrastructure/repositories/professorRepository"
import ProjectCategoryRepository from "@/infrastructure/repositories/projectCategoryRepository"
import ProjectRepository from "@/infrastructure/repositories/projectRepository"
import ResearcherRepository from "@/infrastructure/repositories/researcherRepository"
import StudentRepository from "@/infrastructure/repositories/studentRepository"
import { container } from "tsyringe"

export const RepositoriesDI = () => {
    container.registerSingleton<IUnitOfWork>("SequelizeUnitOfWork", SequelizeUnitOfWork)
    container.registerSingleton<IStudentRepository>("StudentRepository", StudentRepository)

    container.registerSingleton<IAdministratorRepository>("AdministratorRepository", AdministratorRepository)
    container.registerSingleton<IProfessorRepository>("ProfessorRepository", ProfessorRepository)
    container.registerSingleton<ICoordinationRepository>("CoordinationRepository", CoordinationRepository)
    container.registerSingleton<ICoordinatorRepository>("CoordinatorRepository", CoordinatorRepository)
    container.registerSingleton<ILaboratoryRepository>("LaboratoryRepository", LaboratoryRepository)
    container.registerSingleton<IEquipmentCategoryRepository>("EquipmentCategoryRepository", EquipmentCategoryRepository)
    container.registerSingleton<IEquipmentRepository>("EquipmentRepository", EquipmentRepository)
    container.registerSingleton<IProjectCategoryRepository>("ProjectCategoryRepository", ProjectCategoryRepository)
    container.registerSingleton<IProjectRepository>("ProjectRepository", ProjectRepository)
    container.registerSingleton<IResearcherRepository>("ResearcherRepository", ResearcherRepository)
    container.registerSingleton<IBorrowRepository>("BorrowRepository", BorrowRepository)
}