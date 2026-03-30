import ProjectCategory from "domain/models/projectCategory";
import IProjectCategoryRepository from "domain/repositories/iProjectCategoryRepository";
import ProjectCategoryEntityMapping from "infrastructure/data/entityMapping/projectCategoryEntityMapping";
import { injectable } from "tsyringe";

@injectable()
class ProjectCategoryRepository implements IProjectCategoryRepository {
    
    async Find() {
        return await ProjectCategoryEntityMapping.findAll() as ProjectCategory[]
    }
    async FindById(id: number) {
        return await ProjectCategoryEntityMapping.findByPk(id) as ProjectCategory
    }
    async Create(data: ProjectCategory) {
        return await ProjectCategoryEntityMapping.create({ ...data }) as ProjectCategory
    }
    async Update(data: ProjectCategory) {
        await ProjectCategoryEntityMapping.update(data, { where: { id: data.id } })
        return (await ProjectCategoryEntityMapping.findByPk(data.id)) as ProjectCategory
    }
    async Delete(id: number) {
        const result = await ProjectCategoryEntityMapping.destroy({ where: { id: id } })
        return result !== 0
    }

}
export default ProjectCategoryRepository