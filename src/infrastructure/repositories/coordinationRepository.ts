import Coordination from "domain/models/coordination";
import ICoordinationRepository from "domain/repositories/iCoordinationRepository";
import CoordinationEntityMapping from "infrastructure/data/entityMapping/coordinationEntityMapping";
import { injectable } from "tsyringe";

@injectable()
class CoordinationRepository implements ICoordinationRepository {
    
    async Find() {
        return await CoordinationEntityMapping.findAll() as Coordination[]
    }
    async FindById(id: number) {
        return await CoordinationEntityMapping.findByPk(id) as Coordination
    }
    async Create(data: Coordination) {
        return await CoordinationEntityMapping.create({ ...data }) as Coordination
    }
    async Update(data: Coordination) {
        await CoordinationEntityMapping.update(data, { where: { id: data.id } })
        return (await CoordinationEntityMapping.findByPk(data.id)) as Coordination
    }
    async Delete(id: number) {
        const result = await CoordinationEntityMapping.destroy({ where: { id: id } })
        return result !== 0
    }

}
export default CoordinationRepository