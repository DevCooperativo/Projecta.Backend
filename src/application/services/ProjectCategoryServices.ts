import { inject, injectable } from "tsyringe";
import IProjectCategoryServices from "application/interfaces/iProjectCategoryServices";
import { ProjectCategoryDTO } from "application/dtos/projectCategoryDTO";
import IProjectCategoryRepository from "domain/repositories/iProjectCategoryRepository";
import { ApplicationExceptionName } from "application/constants/applicationExceptionName";
import ApplicationException from "application/exceptions/applicationException";
import ProjectCategory from "domain/models/projectCategory";

@injectable()
class ProjectCategoryServices implements IProjectCategoryServices {
    constructor(
        @inject("ProjectCategoryRepository")
        private readonly projectCategoryRepository: IProjectCategoryRepository
    ) { }
    async GetAllAsync() {
        return (await this.projectCategoryRepository.Find()) as ProjectCategoryDTO[]
    }
    async GetByIdAsync(id: number) {
        return (await this.projectCategoryRepository.FindById(id)) as ProjectCategoryDTO
    }
    async CreateAsync(data: ProjectCategoryDTO) {
        return (await this.projectCategoryRepository.Create(data)) as ProjectCategoryDTO
    }
    async UpdateAsync(id: number, data: ProjectCategoryDTO) {
        if (!(await this.GetByIdAsync(id) as ProjectCategory))
            throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "No project category was found with the provided id", 404)
        return (await this.projectCategoryRepository.Update(id, data)) as ProjectCategoryDTO

    }
    async DeleteAsync(id: number) {
        return (await this.projectCategoryRepository.Delete(id))
    }
}
export default ProjectCategoryServices