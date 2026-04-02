import { ProjectCategoryDTO } from "application/dtos/projectCategoryDTO"

interface IProjectCategoryServices {
    GetAllAsync: () => Promise<ProjectCategoryDTO[]>
    GetByIdAsync: (id: number) => Promise<ProjectCategoryDTO | null>
    CreateAsync: (data: ProjectCategoryDTO) => Promise<ProjectCategoryDTO>
    UpdateAsync: (id: number, data: ProjectCategoryDTO) => Promise<ProjectCategoryDTO>
    DeleteAsync: (id: number) => Promise<boolean>
}
export default IProjectCategoryServices