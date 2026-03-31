import Project from "../models/project";

interface IProjectRepository {
    Find: () => Promise<Project[]>
    FindById: (id: number) => Promise<Project | null>
    Create: (data: Project) => Promise<Project | null>
    Update: (data: Project) => Promise<Project | null>
    Delete: (id: number) => Promise<boolean>
}
export default IProjectRepository
