import { inject, injectable } from "tsyringe";
import IProjectServices from "../interfaces/iProjectServices";
import ProjectDTO from "../dtos/projectDTO";
import CreateProjectInputDTO from "../dtos/project/createProjectInputDTO";
import CreateProjectReturnDTO from "../dtos/project/createProjectReturnDTO";
import UpdateProjectInputDTO from "../dtos/project/updateProjectInputDTO";
import UpdateProjectReturnDTO from "../dtos/project/updateProjectReturnDTO";
import IProjectRepository from "@/domain/repositories/iProjectRepository";
import ICoordinatorRepository from "@/domain/repositories/iCoordinatorRepository";
import IResearcherRepository from "@/domain/repositories/iResearcherRepository";
import ILaboratoryRepository from "@/domain/repositories/iLaboratoryRepository";
import IProjectCategoryRepository from "@/domain/repositories/iProjectCategoryRepository";
import IProfessorRepository from "@/domain/repositories/iProfessorRepository";
import IStudentRepository from "@/domain/repositories/iStudentRepository";
import Project from "@/domain/models/project";
import Coordinator from "@/domain/models/coordinator";
import Researcher from "@/domain/models/researcher";
import { ApplicationExceptionName } from "@/application/constants/applicationExceptionName";
import ApplicationException from "@/application/exceptions/applicationException";
import { IUnitOfWork } from "../unitOfWork/iUnitOfWork";

@injectable()
class ProjectServices implements IProjectServices {
    constructor(
        @inject("ProjectRepository")
        private readonly projectRepository: IProjectRepository,
        @inject("CoordinatorRepository")
        private readonly coordinatorRepository: ICoordinatorRepository,
        @inject("ResearcherRepository")
        private readonly researcherRepository: IResearcherRepository,
        @inject("LaboratoryRepository")
        private readonly laboratoryRepository: ILaboratoryRepository,
        @inject("ProjectCategoryRepository")
        private readonly projectCategoryRepository: IProjectCategoryRepository,
        @inject("ProfessorRepository")
        private readonly professorRepository: IProfessorRepository,
        @inject("StudentRepository")
        private readonly studentRepository: IStudentRepository,
        @inject("SequelizeUnitOfWork")
        private readonly unitOfWork: IUnitOfWork
    ) { }

    async GetAllAsync(filters?: { categoryId?: number; laboratoryId?: number; name?: string }) {
        const projects = await this.projectRepository.Find(filters)
        return projects.map((p: any) => ({
            ...p.dataValues,
            participantCount: (p.dataValues.Coordinators?.length ?? 0) + (p.dataValues.Researchers?.length ?? 0)
        })) as ProjectDTO[]
    }

    async GetByIdAsync(id: number) {
        const result = await this.projectRepository.FindById(id)
        if (!result)
            throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "No project was found with the provided id", 404)
        return result as ProjectDTO
    }

    async CreateAsync(data: CreateProjectInputDTO) {
        // RN1: laboratório não pode ter mais de 10 projetos
        const projectCountInLab = await this.projectRepository.CountByLaboratoryId(data.laboratoryId)
        if (projectCountInLab >= 10)
            throw new ApplicationException(ApplicationExceptionName.BUSINESS_RULE_VIOLATION, "The laboratory has already reached the maximum limit of 10 active projects", 422)

        // RN2: professor não pode coordenar mais de 5 projetos
        for (const coord of data.coordinators ?? []) {
            const coordinationCount = await this.coordinatorRepository.CountByProfessorId(coord.professorId)
            if (coordinationCount >= 5)
                throw new ApplicationException(ApplicationExceptionName.BUSINESS_RULE_VIOLATION, `Professor with id ${coord.professorId} has already reached the maximum limit of 5 coordinations`, 422)
        }

        return await this.unitOfWork.execute(async (trx) => {
            if (!await this.laboratoryRepository.FindById(data.laboratoryId))
                throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "No laboratory was found with the provided id", 404)

            if (!await this.projectCategoryRepository.FindById(data.projectCategoryId))
                throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "No project category was found with the provided id", 404)

            if (!data.coordinators || data.coordinators.length === 0)
                throw new ApplicationException("BAD_REQUEST", "A project must have at least one coordinator", 400)

            for (const coord of data.coordinators) {
                if (!await this.professorRepository.FindById(coord.professorId))
                    throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, `No professor was found with the provided id: ${coord.professorId}`, 404)
            }

            if (data.researchers) {
                for (const researcher of data.researchers) {
                    if (!researcher.studentId && !researcher.professorId)
                        throw new ApplicationException("BAD_REQUEST", "Each researcher must have a studentId or professorId", 400)
                    if (researcher.studentId && !await this.studentRepository.FindById(researcher.studentId))
                        throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, `No student was found with the provided id: ${researcher.studentId}`, 404)
                    if (researcher.professorId && !await this.professorRepository.FindById(researcher.professorId))
                        throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, `No professor was found with the provided id: ${researcher.professorId}`, 404)
                }
            }

            const project = Project.create(data.name, data.description, new Date(data.startDate), data.status, data.laboratoryId, data.projectCategoryId, data.endDate ? new Date(data.endDate) : undefined)
            const createdProject = (await this.projectRepository.Create(project, trx)) as Project

            for (const coord of data.coordinators) {
                const coordinator = Coordinator.create(coord.area, new Date(coord.startDate), coord.professorId, createdProject.id, coord.endDate ? new Date(coord.endDate) : undefined)
                await this.coordinatorRepository.Create(coordinator, trx)
            }

            if (data.researchers) {
                for (const res of data.researchers) {
                    const researcher = Researcher.create(res.name, res.functionName, res.weeklyHours, new Date(res.startDate), createdProject.id, res.studentId, res.professorId, res.endDate ? new Date(res.endDate) : undefined)
                    await this.researcherRepository.Create(researcher, trx)
                }
            }

            return createdProject as unknown as CreateProjectReturnDTO
        })
    }

    async UpdateAsync(data: UpdateProjectInputDTO) {
        return await this.unitOfWork.execute(async (trx) => {
            const existing = await this.projectRepository.FindById(data.id)
            if (!existing)
                throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "No project was found with the provided id", 404)

            if (!await this.laboratoryRepository.FindById(data.laboratoryId))
                throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "No laboratory was found with the provided id", 404)

            if (!await this.projectCategoryRepository.FindById(data.projectCategoryId))
                throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "No project category was found with the provided id", 404)

            if (data.coordinators) {
                for (const coord of data.coordinators) {
                    if (!await this.professorRepository.FindById(coord.professorId))
                        throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, `No professor was found with the provided id: ${coord.professorId}`, 404)
                }
            }

            if (data.researchers) {
                for (const researcher of data.researchers) {
                    if (!researcher.studentId && !researcher.professorId)
                        throw new ApplicationException("BAD_REQUEST", "Each researcher must have a studentId or professorId", 400)
                    if (researcher.studentId && !await this.studentRepository.FindById(researcher.studentId))
                        throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, `No student was found with the provided id: ${researcher.studentId}`, 404)
                    if (researcher.professorId && !await this.professorRepository.FindById(researcher.professorId))
                        throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, `No professor was found with the provided id: ${researcher.professorId}`, 404)
                }
            }

            existing.update(data.name, data.description, new Date(data.startDate), data.status, data.laboratoryId, data.projectCategoryId, data.endDate ? new Date(data.endDate) : undefined)
            const updatedProject = (await this.projectRepository.Update(existing as Project, trx)) as Project

            if (data.coordinators) {
                await this.coordinatorRepository.DeleteByProjectId(data.id, trx)
                for (const coord of data.coordinators) {
                    const coordinator = Coordinator.create(coord.area, new Date(coord.startDate), coord.professorId, data.id, coord.endDate ? new Date(coord.endDate) : undefined)
                    await this.coordinatorRepository.Create(coordinator, trx)
                }
            }

            if (data.researchers) {
                await this.researcherRepository.DeleteByProjectId(data.id, trx)
                for (const res of data.researchers) {
                    const researcher = Researcher.create(res.name, res.functionName, res.weeklyHours, new Date(res.startDate), data.id, res.studentId, res.professorId, res.endDate ? new Date(res.endDate) : undefined)
                    await this.researcherRepository.Create(researcher, trx)
                }
            }

            return updatedProject as unknown as UpdateProjectReturnDTO
        })
    }

    async DeleteAsync(id: number) {
        return await this.unitOfWork.execute(async (trx) => {
            return (await this.projectRepository.Delete(id, trx))
        })
    }
}

export default ProjectServices
