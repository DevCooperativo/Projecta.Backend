import { inject, injectable } from "tsyringe";
import IEquipmentCategoryServices from "application/interfaces/iEquipmentCategoryServices";
import { EquipmentCategoryDTO } from "application/dtos/equipmentCategoryDTO";
import IEquipmentCategoryRepository from "domain/repositories/iEquipmentCategoryRepository";
import { ApplicationExceptionName } from "application/constants/applicationExceptionName";
import ApplicationException from "application/exceptions/applicationException";
import EquipmentCategory from "domain/models/equipmentCategory";

@injectable()
class EquipmentCategoryServices implements IEquipmentCategoryServices {
    constructor(
        @inject("EquipmentCategoryRepository")
        private readonly equipmentCategoryRepository: IEquipmentCategoryRepository
    ) { }
    async GetAllAsync() {
        return (await this.equipmentCategoryRepository.Find()) as EquipmentCategoryDTO[]
    }
    async GetByIdAsync(id: number) {
        const result = await this.equipmentCategoryRepository.FindById(id)
        if (!result)
            throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "No equipment category was found with the provided id", 404)
        return result as EquipmentCategoryDTO
    }
    async CreateAsync(data: EquipmentCategoryDTO) {
        return (await this.equipmentCategoryRepository.Create(data)) as EquipmentCategoryDTO
    }
    async UpdateAsync(id: number, data: EquipmentCategoryDTO) {
        if (!(await this.GetByIdAsync(id) as EquipmentCategory))
            throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "No equipment category was found with the provided id", 404)
        return (await this.equipmentCategoryRepository.Update(id, data)) as EquipmentCategoryDTO

    }
    async DeleteAsync(id: number) {
        return (await this.equipmentCategoryRepository.Delete(id))
    }
}
export default EquipmentCategoryServices