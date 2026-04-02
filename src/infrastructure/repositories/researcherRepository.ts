import Researcher from "domain/models/researcher";
import IResearcherRepository from "domain/repositories/iResearcherRepository";
import ResearcherEntityMapping from "infrastructure/data/entityMapping/researcherEntityMappping";
import { injectable } from "tsyringe";

@injectable()
class ResearcherRepository implements IResearcherRepository {
    
    async Find() {
        return await ResearcherEntityMapping.findAll() as Researcher[]
    }
    async FindById(id: number) {
        return await ResearcherEntityMapping.findByPk(id) as Researcher
    }
    async Create(data: Researcher) {
        return await ResearcherEntityMapping.create({ ...data }) as Researcher
    }
    async Update(data: Researcher) {
        await ResearcherEntityMapping.update(data, { where: { id: data.id } })
        return (await ResearcherEntityMapping.findByPk(data.id)) as Researcher
    }
    async Delete(id: number) {
        const result = await ResearcherEntityMapping.destroy({ where: { id: id } })
        return result !== 0
    }

}
export default ResearcherRepository
