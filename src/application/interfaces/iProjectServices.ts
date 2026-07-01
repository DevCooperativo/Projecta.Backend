import ProjectDTO from "../dtos/projectDTO"
import CreateProjectInputDTO from "../dtos/project/createProjectInputDTO"
import CreateProjectReturnDTO from "../dtos/project/createProjectReturnDTO"
import UpdateProjectInputDTO from "../dtos/project/updateProjectInputDTO"
import UpdateProjectReturnDTO from "../dtos/project/updateProjectReturnDTO"

interface IProjectServices {
    GetAllAsync: (filters?: { categoryId?: number; laboratoryId?: number; name?: string }) => Promise<ProjectDTO[]>
    GetByIdAsync: (id: number) => Promise<ProjectDTO | null>
    CreateAsync: (data: CreateProjectInputDTO) => Promise<CreateProjectReturnDTO>
    UpdateAsync: (data: UpdateProjectInputDTO) => Promise<UpdateProjectReturnDTO>
    DeleteAsync: (id: number) => Promise<boolean>
}

export default IProjectServices
