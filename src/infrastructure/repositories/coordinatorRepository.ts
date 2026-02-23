import Coordinator from "domain/models/coordinator";
import ICoordinatorRepository from "domain/repositories/iCoordinatorRepository";
import { injectable } from "tsyringe";
import CoordinatorEntity from "../data/entityMapping/coordinatorEntity";

@injectable()
class CoordinatorRepository implements ICoordinatorRepository {
    
    async Find() {
        return await CoordinatorEntity.findAll() as Coordinator[]
    }
    async FindById(id: number) {
        return await CoordinatorEntity.findByPk(id) as Coordinator
    }
    async Create(data: Coordinator) {
        return await CoordinatorEntity.create({ ...data }) as Coordinator
    }
    async Update(data: Coordinator) {
        await CoordinatorEntity.update(data, { where: { id: data.id } })
        return (await CoordinatorEntity.findByPk(data.id)) as Coordinator
    }
    async Delete(id: number) {
        const result = await CoordinatorEntity.destroy({ where: { id: id } })
        return result !== 0
    }

}
export default CoordinatorRepository