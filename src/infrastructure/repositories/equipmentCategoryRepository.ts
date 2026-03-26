import EquipmentCategory from "domain/models/equipmentCategory";
import IEquipmentCategoryRepository from "domain/repositories/iEquipmentCategoryRepository";
import EquipmentCategoryEntityMapping from "infrastructure/data/entityMapping/equipmentCategoryEntityMapping";
import { injectable } from "tsyringe";

@injectable()
class EquipmentCategoryRepository implements IEquipmentCategoryRepository {
    
    async Find() {
        return await EquipmentCategoryEntityMapping.findAll() as EquipmentCategory[]
    }
    async FindById(id: number) {
        return await EquipmentCategoryEntityMapping.findByPk(id) as EquipmentCategory
    }
    async Create(data: EquipmentCategory) {
        return await EquipmentCategoryEntityMapping.create({ ...data }) as EquipmentCategory
    }
    async Update(data: EquipmentCategory) {
        await EquipmentCategoryEntityMapping.update(data, { where: { id: data.id } })
        return (await EquipmentCategoryEntityMapping.findByPk(data.id)) as EquipmentCategory
    }
    async Delete(id: number) {
        const result = await EquipmentCategoryEntityMapping.destroy({ where: { id: id } })
        return result !== 0
    }

}
export default EquipmentCategoryRepository