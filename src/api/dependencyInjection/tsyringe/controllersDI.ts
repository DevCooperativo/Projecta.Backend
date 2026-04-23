import { SigninController } from "@/api/controllers/auth/signinController"
import BaseController from "@/api/controllers/baseController"
import CreateAdministratorController from "@/api/controllers/administrator/createAdministratorController"
import DeleteAdministratorController from "@/api/controllers/administrator/deleteAdministratorController"
import GetAllAdministratorsController from "@/api/controllers/administrator/getAllAdministratorsController"
import GetAdministratorByIdController from "@/api/controllers/administrator/getAdministratorByIdController"
import UpdateAdministratorController from "@/api/controllers/administrator/updateAdministratorController"
import { CreateBorrowController } from "@/api/controllers/borrow/createBorrowController"
import { DeleteBorrowController } from "@/api/controllers/borrow/deleteBorrowController"
import { GetAllBorrowsController } from "@/api/controllers/borrow/getAllBorrowsController"
import { GetBorrowByIdController } from "@/api/controllers/borrow/getBorrowByIdController"
import { UpdateBorrowController } from "@/api/controllers/borrow/updateBorrowController"
import CreateCoordinationController from "@/api/controllers/coordination/createCoordinationController"
import DeleteCoordinationController from "@/api/controllers/coordination/deleteCoordinationController"
import GetAllCoordinationsController from "@/api/controllers/coordination/getAllCoordinationsController"
import GetCoordinationByIdController from "@/api/controllers/coordination/getCoordinationByIdController"
import UpdateCoordinationController from "@/api/controllers/coordination/updateCoordinationController"
import CreateCoordinatorController from "@/api/controllers/coordinator/createCoordinatorController"
import DeleteCoordinatorController from "@/api/controllers/coordinator/deleteCoordinatorController"
import GetAllCoordinatorsController from "@/api/controllers/coordinator/getAllCoordinatorsController"
import GetCoordinatorByIdController from "@/api/controllers/coordinator/getCoordinatorByIdController"
import UpdateCoordinatorController from "@/api/controllers/coordinator/updateCoordinatorController"
import CreateEquipmentController from "@/api/controllers/equipment/createEquipmentController"
import DeleteEquipmentController from "@/api/controllers/equipment/deleteEquipmentController"
import GetAllEquipmentsController from "@/api/controllers/equipment/getAllEquipmentsController"
import GetEquipmentByIdController from "@/api/controllers/equipment/getEquipmentByIdController"
import UpdateEquipmentController from "@/api/controllers/equipment/updateEquipmentController"
import CreateEquipmentCategoryController from "@/api/controllers/equipmentCategory/createEquipmentCategoryController"
import DeleteEquipmentCategoryController from "@/api/controllers/equipmentCategory/deleteEquipmentCategoryController"
import GetAllEquipmentCategoriesController from "@/api/controllers/equipmentCategory/getAllEquipmentCategoriesController"
import GetEquipmentCategoryByIdController from "@/api/controllers/equipmentCategory/getEquipmentCategoryByIdController"
import UpdateEquipmentCategoryController from "@/api/controllers/equipmentCategory/updateEquipmentCategoryController"
import CreateLaboratoryController from "@/api/controllers/laboratory/createLaboratoryController"
import DeleteLaboratoryController from "@/api/controllers/laboratory/deleteLaboratoryController"
import GetAllLaboratoriesController from "@/api/controllers/laboratory/getAllLaboratoriesController"
import GetLaboratoryByIdController from "@/api/controllers/laboratory/getLaboratoryByIdController"
import UpdateLaboratoryController from "@/api/controllers/laboratory/updateLaboratoryController"
import CreateProfessorController from "@/api/controllers/professor/createProfessorController"
import DeleteProfessorController from "@/api/controllers/professor/deleteProfessorController"
import GetAllProfessorsController from "@/api/controllers/professor/getAllProfessorsController"
import GetProfessorByIdController from "@/api/controllers/professor/getProfessorByIdController"
import UpdateProfessorController from "@/api/controllers/professor/updateProfessorController"
import CreateProjectController from "@/api/controllers/project/createProjectController"
import DeleteProjectController from "@/api/controllers/project/deleteProjectController"
import GetAllProjectsController from "@/api/controllers/project/getAllProjectsController"
import GetProjectByIdController from "@/api/controllers/project/getProjectByIdController"
import UpdateProjectController from "@/api/controllers/project/updateProjectController"
import CreateProjectCategoryController from "@/api/controllers/projectCategory/createProjectCategoryController"
import DeleteProjectCategoryController from "@/api/controllers/projectCategory/deleteProjectCategoryController"
import GetAllProjectCategoriesController from "@/api/controllers/projectCategory/getAllProjectCategoriesController"
import GetProjectCategoryByIdController from "@/api/controllers/projectCategory/getProjectCategoryByIdController"
import UpdateProjectCategoryController from "@/api/controllers/projectCategory/updateProjectCategoryController"
import CreateResearcherController from "@/api/controllers/researcher/createResearcherController"
import DeleteResearcherController from "@/api/controllers/researcher/deleteResearcherController"
import GetAllResearchersController from "@/api/controllers/researcher/getAllResearchersController"
import GetResearcherByIdController from "@/api/controllers/researcher/getResearcherByIdController"
import UpdateResearcherController from "@/api/controllers/researcher/updateResearcherController"
import CreateStudentController from "@/api/controllers/student/createStudentController"
import DeleteStudentController from "@/api/controllers/student/deleteStudentController"
import GetAllStudentsController from "@/api/controllers/student/getAllStudentsController"
import GetStudentByIdController from "@/api/controllers/student/getStudentByIdController"
import UpdateStudentController from "@/api/controllers/student/updateStudentController"
import { container } from "tsyringe"
import UpdateProfessorCoordinationController from "@/api/controllers/professor/updateProfessorCoordinationController copy"

export const ControllersDI = () => {
    container.registerSingleton<BaseController>("SignInController", SigninController)

    // Controllers - Administrator
    container.registerSingleton<BaseController>("GetAllAdministratorsController", GetAllAdministratorsController)
    container.registerSingleton<BaseController>("GetAdministratorByIdController", GetAdministratorByIdController)
    container.registerSingleton<BaseController>("CreateAdministratorController", CreateAdministratorController)
    container.registerSingleton<BaseController>("UpdateAdministratorController", UpdateAdministratorController)
    container.registerSingleton<BaseController>("DeleteAdministratorController", DeleteAdministratorController)

    // Controllers - Borrow
    container.registerSingleton<BaseController>("GetAllBorrowsController", GetAllBorrowsController)
    container.registerSingleton<BaseController>("GetBorrowByIdController", GetBorrowByIdController)
    container.registerSingleton<BaseController>("CreateBorrowController", CreateBorrowController)
    container.registerSingleton<BaseController>("UpdateBorrowController", UpdateBorrowController)
    container.registerSingleton<BaseController>("DeleteBorrowController", DeleteBorrowController)

    // Controllers - Student
    container.registerSingleton<BaseController>("GetAllStudentsController", GetAllStudentsController)
    container.registerSingleton<BaseController>("GetStudentByIdController", GetStudentByIdController)
    container.registerSingleton<BaseController>("CreateStudentController", CreateStudentController)
    container.registerSingleton<BaseController>("UpdateStudentController", UpdateStudentController)
    container.registerSingleton<BaseController>("DeleteStudentController", DeleteStudentController)


    // Controllers - Coordination
    container.registerSingleton<BaseController>("GetAllCoordinationsController", GetAllCoordinationsController)
    container.registerSingleton<BaseController>("GetCoordinationByIdController", GetCoordinationByIdController)
    container.registerSingleton<BaseController>("CreateCoordinationController", CreateCoordinationController)
    container.registerSingleton<BaseController>("UpdateCoordinationController", UpdateCoordinationController)
    container.registerSingleton<BaseController>("DeleteCoordinationController", DeleteCoordinationController)

    // Controllers - Professor
    container.registerSingleton<BaseController>("GetAllProfessorsController", GetAllProfessorsController)
    container.registerSingleton<BaseController>("GetProfessorByIdController", GetProfessorByIdController)
    container.registerSingleton<BaseController>("CreateProfessorController", CreateProfessorController)
    container.registerSingleton<BaseController>("UpdateProfessorController", UpdateProfessorController)
    container.registerSingleton<BaseController>("UpdateProfessorCoordinationController", UpdateProfessorCoordinationController)
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

    // Controllers - Equipment
    container.registerSingleton<BaseController>("GetAllEquipmentsController", GetAllEquipmentsController)
    container.registerSingleton<BaseController>("GetEquipmentByIdController", GetEquipmentByIdController)
    container.registerSingleton<BaseController>("CreateEquipmentController", CreateEquipmentController)
    container.registerSingleton<BaseController>("UpdateEquipmentController", UpdateEquipmentController)
    container.registerSingleton<BaseController>("DeleteEquipmentController", DeleteEquipmentController)
}