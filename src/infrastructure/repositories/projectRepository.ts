import Project from "domain/models/project";
import IProjectRepository from "domain/repositories/iProjectRepository";
import ProjectEntityMapping from "infrastructure/data/entityMapping/projectEntityMapping";
import { injectable } from "tsyringe";

@injectable()
class ProjectRepository implements IProjectRepository {
    
    async Find() {
        return await ProjectEntityMapping.findAll() as Project[]
    }
    async FindById(id: number) {
        return await ProjectEntityMapping.findByPk(id) as Project
    }
    async Create(data: Project) {
        return await ProjectEntityMapping.create({ ...data }) as Project
    }
    async Update(data: Project) {
        await ProjectEntityMapping.update(data, { where: { id: data.id } })
        return (await ProjectEntityMapping.findByPk(data.id)) as Project
    }
    async Delete(id: number) {
        const result = await ProjectEntityMapping.destroy({ where: { id: id } })
        return result !== 0
    }

}
export default ProjectRepository
