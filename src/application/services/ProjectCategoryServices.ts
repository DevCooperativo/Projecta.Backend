import { inject, injectable } from "tsyringe";
import IProjectCategoryServices from "@/application/interfaces/iProjectCategoryServices";
import { ProjectCategoryDTO } from "@/application/dtos/projectCategoryDTO";
import IProjectCategoryRepository from "@/domain/repositories/iProjectCategoryRepository";
import { ApplicationExceptionName } from "@/application/constants/applicationExceptionName";
import ApplicationException from "@/application/exceptions/applicationException";
import ProjectCategory from "@/domain/models/projectCategory";
import { IUnitOfWork } from "../unitOfWork/iUnitOfWork";

@injectable()
class ProjectCategoryServices implements IProjectCategoryServices {
    constructor(
        @inject("ProjectCategoryRepository")
        private readonly projectCategoryRepository: IProjectCategoryRepository,
        @inject("SequelizeUnitOfWork")
        private readonly unitOfWork: IUnitOfWork
    ) { }
    async GetAllAsync() {
        return (await this.projectCategoryRepository.Find()) as ProjectCategoryDTO[]
    }
    async GetByIdAsync(id: number) {
        const result = await this.projectCategoryRepository.FindById(id)
        if (!result)
            throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "No project category was found with the provided id", 404)
        return result as ProjectCategoryDTO
    }
    async CreateAsync(data: ProjectCategoryDTO) {
        return await this.unitOfWork.execute(async (trx) => {
            return (await this.projectCategoryRepository.Create(data, trx)) as ProjectCategoryDTO
        })
    }
    async UpdateAsync(id: number, data: ProjectCategoryDTO) {
        return await this.unitOfWork.execute(async (trx) => {
            if (!(await this.projectCategoryRepository.FindById(id) as ProjectCategory))
                throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "No project category was found with the provided id", 404)
            return (await this.projectCategoryRepository.Update(id, data, trx)) as ProjectCategoryDTO
        })
    }
    async DeleteAsync(id: number) {
        return await this.unitOfWork.execute(async (trx) => {
            return (await this.projectCategoryRepository.Delete(id, trx))
        })
    }
}
export default ProjectCategoryServices