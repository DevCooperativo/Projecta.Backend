import { inject, injectable } from "tsyringe";
import IProjectServices from "../interfaces/iProjectServices";
import ProjectDTO from "../dtos/projectDTO";
import IProjectRepository from "domain/repositories/iProjectRepository";
import Project from "domain/models/project";
import { ApplicationExceptionName } from "application/constants/applicationExceptionName";
import ApplicationException from "application/exceptions/applicationException";

@injectable()
class ProjectServices implements IProjectServices {
    constructor(
        @inject("ProjectRepository")
        private readonly projectRepository: IProjectRepository
    ) { }
    async GetAllAsync() {
        return (await this.projectRepository.Find()) as ProjectDTO[]
    }
    async GetByIdAsync(id: number) {
        return (await this.projectRepository.FindById(id)) as ProjectDTO
    }
    async CreateAsync(data: ProjectDTO) {
        return (await this.projectRepository.Create(data)) as ProjectDTO
    }
    async UpdateAsync(id: number, data: ProjectDTO) {
        if (!(await this.GetByIdAsync(id) as Project))
            throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "No project was found with the provided id", 404)
        return (await this.projectRepository.Update({ ...data, id } as Project)) as ProjectDTO
    }
    async DeleteAsync(id: number) {
        return (await this.projectRepository.Delete(id))
    }
}
export default ProjectServices
