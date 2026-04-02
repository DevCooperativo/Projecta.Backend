import Equipment from "domain/models/equipment";
import IEquipmentRepository from "domain/repositories/iEquipmentRepository";
import { injectable } from "tsyringe";
import EquipmentEntity from "../data/entityMapping/equipmentEntity";

@injectable()
class EquipmentRepository implements IEquipmentRepository {
    async Find() {
        const result = await EquipmentEntity.findAll()
        return result as Equipment[]
    }
    async FindById(id: number) {
        return await EquipmentEntity.findByPk(id) as Equipment
    }
    async Create(data: Equipment) {
        return await EquipmentEntity.create({ ...data }, { validate: true }) as Equipment
    }
    async Update(id: number, data: Equipment) {
        await EquipmentEntity.update(data, { where: { id }, validate: true })
        return (await EquipmentEntity.findByPk(id)) as Equipment
    }
    async Delete(id: number) {
        const result = await EquipmentEntity.destroy({ where: { id: id } })
        return result !== 0
    }
}
export default EquipmentRepository