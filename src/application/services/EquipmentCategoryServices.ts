import { inject, injectable } from "tsyringe";
import IEquipmentCategoryServices from "application/interfaces/iEquipmentCategoryServices";
import { EquipmentCategoryDTO } from "application/dtos/equipmentCategoryDTO";
import IEquipmentCategoryRepository from "domain/repositories/iEquipmentCategoryRepository";

@injectable()
class EquipmentCategoryServices implements IEquipmentCategoryServices {
    constructor(
        @inject("EquipmentCategoryRepository")
        private readonly equipmentCategoryRepository: IEquipmentCategoryRepository
    ) { }
    async GetAllAsync() {
        const result = await this.equipmentCategoryRepository.Find() as EquipmentCategoryDTO[]
        return result
    }

}
export default EquipmentCategoryServices