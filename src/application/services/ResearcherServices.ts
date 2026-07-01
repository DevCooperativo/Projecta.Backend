import { inject, injectable } from "tsyringe";
import IResearcherServices from "../interfaces/iResearcherServices";
import ResearcherDTO from "../dtos/researcherDTO";
import IResearcherRepository from "@/domain/repositories/iResearcherRepository";
import IProjectRepository from "@/domain/repositories/iProjectRepository";
import IStudentRepository from "@/domain/repositories/iStudentRepository";
import IProfessorRepository from "@/domain/repositories/iProfessorRepository";
import Researcher from "@/domain/models/researcher";
import { ApplicationExceptionName } from "@/application/constants/applicationExceptionName";
import ApplicationException from "@/application/exceptions/applicationException";
import { IUnitOfWork } from "../unitOfWork/iUnitOfWork";

@injectable()
class ResearcherServices implements IResearcherServices {
    constructor(
        @inject("ResearcherRepository")
        private readonly researcherRepository: IResearcherRepository,
        @inject("ProjectRepository")
        private readonly projectRepository: IProjectRepository,
        @inject("StudentRepository")
        private readonly studentRepository: IStudentRepository,
        @inject("ProfessorRepository")
        private readonly professorRepository: IProfessorRepository,
        @inject("SequelizeUnitOfWork")
        private readonly unitOfWork: IUnitOfWork
    ) { }

    async GetAllAsync() {
        return (await this.researcherRepository.Find()) as ResearcherDTO[]
    }

    async GetByIdAsync(id: number) {
        const result = await this.researcherRepository.FindById(id)
        if (!result)
            throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "No researcher was found with the provided id", 404)
        return result as ResearcherDTO
    }

    async CreateAsync(data: ResearcherDTO) {
        return await this.unitOfWork.execute(async (trx) => {
            if (!await this.projectRepository.FindById(data.projectId))
                throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "No project was found with the provided id", 404)

            if (!data.studentId && !data.professorId)
                throw new ApplicationException("BAD_REQUEST", "Researcher must have a studentId or professorId", 400)

            if (data.studentId && !await this.studentRepository.FindById(data.studentId))
                throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "No student was found with the provided id", 404)

            if (data.professorId && !await this.professorRepository.FindById(data.professorId))
                throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "No professor was found with the provided id", 404)

            const researcher = Researcher.create(data.name, data.functionName, data.weeklyHours, new Date(data.startDate), data.projectId, data.studentId, data.professorId, data.endDate ? new Date(data.endDate) : undefined)
            return (await this.researcherRepository.Create(researcher, trx)) as ResearcherDTO
        })
    }

    async UpdateAsync(id: number, data: ResearcherDTO) {
        return await this.unitOfWork.execute(async (trx) => {
            if (!(await this.researcherRepository.FindById(id) as Researcher))
                throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "No researcher was found with the provided id", 404)
            return (await this.researcherRepository.Update({ ...data, id } as Researcher, trx)) as ResearcherDTO
        })
    }

    async DeleteAsync(id: number) {
        return await this.unitOfWork.execute(async (trx) => {
            return (await this.researcherRepository.Delete(id, trx))
        })
    }
}

export default ResearcherServices
