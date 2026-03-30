import { inject, injectable } from "tsyringe";
import IProjectCategoryServices from "application/interfaces/iProjectCategoryServices";
import { ProjectCategoryDTO } from "application/dtos/projectCategoryDTO";
import IProjectCategoryRepository from "domain/repositories/iProjectCategoryRepository";

@injectable()
class ProjectCategoryServices implements IProjectCategoryServices {
    constructor(
        @inject("ProjectCategoryRepository")
        private readonly projectCategoryRepository: IProjectCategoryRepository
    ) { }
    async GetAllAsync() {
        const result = await this.projectCategoryRepository.Find() as ProjectCategoryDTO[]
        return result
    }

}
export default ProjectCategoryServices