import ProjectCategory from "../models/projectCategory";

interface IProjectCategoryRepository {
    Find: () => Promise<ProjectCategory[]>
    FindById: (id: number) => Promise<ProjectCategory | null>
    Create: (data: ProjectCategory) => Promise<ProjectCategory | null>
    Update: (data: ProjectCategory) => Promise<ProjectCategory | null>
    Delete: (id: number) => Promise<boolean>
}
export default IProjectCategoryRepository