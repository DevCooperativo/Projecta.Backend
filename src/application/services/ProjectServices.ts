import { inject, injectable } from "tsyringe";
import IProjectServices from "../interfaces/iProjectServices";
import ProjectDTO from "../dtos/projectDTO";
import IProjectRepository from "@/domain/repositories/iProjectRepository";
import Project from "@/domain/models/project";
import { ApplicationExceptionName } from "@/application/constants/applicationExceptionName";
import ApplicationException from "@/application/exceptions/applicationException";
import { IUnitOfWork } from "../unitOfWork/iUnitOfWork";

@injectable()
class ProjectServices implements IProjectServices {
    constructor(
        @inject("ProjectRepository")
        private readonly projectRepository: IProjectRepository,
        @inject("SequelizeUnitOfWork")
        private readonly unitOfWork: IUnitOfWork
    ) { }
    async GetAllAsync() {
        return (await this.projectRepository.Find()) as ProjectDTO[]
    }
    async GetByIdAsync(id: number) {
        const result = await this.projectRepository.FindById(id)
        if (!result)
            throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "No project was found with the provided id", 404)
        return result as ProjectDTO
    }
    async CreateAsync(data: ProjectDTO) {
        return await this.unitOfWork.execute(async (trx) => {
            return (await this.projectRepository.Create(data, trx)) as ProjectDTO
        })
    }
    async UpdateAsync(id: number, data: ProjectDTO) {
        return await this.unitOfWork.execute(async (trx) => {
            if (!(await this.projectRepository.FindById(id) as Project))
                throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "No project was found with the provided id", 404)
            return (await this.projectRepository.Update({ ...data, id } as Project, trx)) as ProjectDTO
        })
    }
    async DeleteAsync(id: number) {
        return await this.unitOfWork.execute(async (trx) => {
            return (await this.projectRepository.Delete(id, trx))
        })
    }
}
export default ProjectServices
