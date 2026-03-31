import ProjectDTO from "../dtos/projectDTO"

interface IProjectServices {
    GetAllAsync: () => Promise<ProjectDTO[]>
    GetByIdAsync: (id: number) => Promise<ProjectDTO | null>
    CreateAsync: (data: ProjectDTO) => Promise<ProjectDTO>
    UpdateAsync: (id: number, data: ProjectDTO) => Promise<ProjectDTO>
    DeleteAsync: (id: number) => Promise<boolean>
}

export default IProjectServices
