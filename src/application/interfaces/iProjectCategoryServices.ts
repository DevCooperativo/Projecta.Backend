import { ProjectCategoryDTO } from "application/dtos/projectCategoryDTO"

interface IProjectCategoryServices {
    GetAllAsync: () => Promise<ProjectCategoryDTO[]>
}
export default IProjectCategoryServices