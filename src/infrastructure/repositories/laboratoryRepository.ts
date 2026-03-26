import Laboratory from "domain/models/laboratory";
import ILaboratoryRepository from "domain/repositories/iLaboratoryRepository";
import LaboratoryEntity from "infrastructure/data/entityMapping/laboratoryEntity";
import { injectable } from "tsyringe";

@injectable()
class LaboratoryRepository implements ILaboratoryRepository {

    async Find() {
        return await LaboratoryEntity.findAll() as Laboratory[]
    }
    async FindById(id: number) {
        return await LaboratoryEntity.findByPk(id) as Laboratory
    }
    async Create(data: Laboratory) {
        return await LaboratoryEntity.create({ ...data }) as Laboratory
    }
    async Update(data: Laboratory) {
        await LaboratoryEntity.update(data, { where: { id: data.id } })
        return (await LaboratoryEntity.findByPk(data.id)) as Laboratory
    }
    async Delete(id: number) {
        const result = await LaboratoryEntity.destroy({ where: { id: id } })
        return result !== 0
    }

}
export default LaboratoryRepository