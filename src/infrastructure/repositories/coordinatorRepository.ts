import Coordinator from "domain/models/coordinator";
import ICoordinatorRepository from "domain/repositories/iCoordinatorRepository";
import { injectable } from "tsyringe";
import CoordinatorEntityMapping from "../data/entityMapping/coordinatorEntityMapping";

@injectable()
class CoordinatorRepository implements ICoordinatorRepository {
    
    async Find() {
        return await CoordinatorEntityMapping.findAll() as Coordinator[]
    }
    async FindById(id: number) {
        return await CoordinatorEntityMapping.findByPk(id) as Coordinator
    }
    async Create(data: Coordinator) {
        return await CoordinatorEntityMapping.create({ ...data }) as Coordinator
    }
    async Update(data: Coordinator) {
        await CoordinatorEntityMapping.update(data, { where: { id: data.id } })
        return (await CoordinatorEntityMapping.findByPk(data.id)) as Coordinator
    }
    async Delete(id: number) {
        const result = await CoordinatorEntityMapping.destroy({ where: { id: id } })
        return result !== 0
    }

}
export default CoordinatorRepository