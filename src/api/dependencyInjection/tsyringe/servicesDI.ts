import IAdministratorServices from "@/application/interfaces/iAdministratorServices"
import { IAuthServices } from "@/application/interfaces/iAuthServices"
import { IBorrowServices } from "@/application/interfaces/iBorrowServices"
import ICoordinationServices from "@/application/interfaces/iCoordinationServices"
import ICoordinatorServices from "@/application/interfaces/iCoordinatorServices"
import IEquipmentCategoryServices from "@/application/interfaces/iEquipmentCategoryServices"
import IEquipmentServices from "@/application/interfaces/iEquipmentServices"
import ILaboratoryServices from "@/application/interfaces/iLaboratoryServices"
import IProfessorServices from "@/application/interfaces/iProfessorServices"
import IProjectCategoryServices from "@/application/interfaces/iProjectCategoryServices"
import IProjectServices from "@/application/interfaces/iProjectServices"
import IResearcherServices from "@/application/interfaces/iResearcherServices"
import IStudentServices from "@/application/interfaces/iStudentServices"
import AdministratorServices from "@/application/services/administratorServices"
import { AuthServices } from "@/application/services/authServices"
import { BorrowServices } from "@/application/services/borrowServices"
import CoordinationServices from "@/application/services/CoordinationServices"
import CoordinatorServices from "@/application/services/CoordinatorServices"
import EquipmentCategoryServices from "@/application/services/EquipmentCategoryServices"
import EquipmentServices from "@/application/services/EquipmentServices"
import LaboratoryServices from "@/application/services/LaboratoryServices"
import ProfessorServices from "@/application/services/professorServices"
import ProjectCategoryServices from "@/application/services/ProjectCategoryServices"
import ProjectServices from "@/application/services/ProjectServices"
import ResearcherServices from "@/application/services/ResearcherServices"
import StudentServices from "@/application/services/studentServices"
import { container } from "tsyringe"

export const ServicesDI = () => {
    container.registerSingleton<IAuthServices>("AuthServices", AuthServices)
    container.registerSingleton<IStudentServices>("StudentServices", StudentServices)

    container.registerSingleton<IAdministratorServices>("AdministratorServices", AdministratorServices)


    container.registerSingleton<IProfessorServices>("ProfessorServices", ProfessorServices)
    container.registerSingleton<ICoordinationServices>("CoordinationServices", CoordinationServices)
    container.registerSingleton<ICoordinatorServices>("CoordinatorServices", CoordinatorServices)
    container.registerSingleton<ILaboratoryServices>("LaboratoryServices", LaboratoryServices)
    container.registerSingleton<IEquipmentCategoryServices>("EquipmentCategoryServices", EquipmentCategoryServices)
    container.registerSingleton<IEquipmentServices>("EquipmentServices", EquipmentServices)
    container.registerSingleton<IProjectCategoryServices>("ProjectCategoryServices", ProjectCategoryServices)
    container.registerSingleton<IProjectServices>("ProjectServices", ProjectServices)
    container.registerSingleton<IResearcherServices>("ResearcherServices", ResearcherServices)
    container.registerSingleton<IBorrowServices>("BorrowServices", BorrowServices)


}