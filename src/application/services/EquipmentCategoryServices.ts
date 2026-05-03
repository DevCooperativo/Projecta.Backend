import { inject, injectable } from "tsyringe";
import IEquipmentCategoryServices from "@/application/interfaces/iEquipmentCategoryServices";
import { EquipmentCategoryDTO } from "@/application/dtos/equipmentCategoryDTO";
import IEquipmentCategoryRepository from "@/domain/repositories/iEquipmentCategoryRepository";
import IEquipmentRepository from "@/domain/repositories/iEquipmentRepository";
import { ApplicationExceptionName } from "@/application/constants/applicationExceptionName";
import ApplicationException from "@/application/exceptions/applicationException";
import EquipmentCategory from "@/domain/models/equipmentCategory";
import { IUnitOfWork } from "../unitOfWork/iUnitOfWork";

@injectable()
class EquipmentCategoryServices implements IEquipmentCategoryServices {
    constructor(
        @inject("EquipmentCategoryRepository")
        private readonly equipmentCategoryRepository: IEquipmentCategoryRepository,
        @inject("EquipmentRepository")
        private readonly equipmentRepository: IEquipmentRepository,
        @inject("SequelizeUnitOfWork")
        private readonly unitOfWork: IUnitOfWork
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
        return await this.unitOfWork.execute(async (trx) => {
            return (await this.equipmentCategoryRepository.Create(data as EquipmentCategory, trx)) as EquipmentCategoryDTO
        })
    }
    async UpdateAsync(id: number, data: EquipmentCategoryDTO) {
        return await this.unitOfWork.execute(async (trx) => {
            if (!(await this.equipmentCategoryRepository.FindById(id, trx) as EquipmentCategory))
                throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "No equipment category was found with the provided id", 404)
            return (await this.equipmentCategoryRepository.Update(id, data as EquipmentCategory, trx)) as EquipmentCategoryDTO
        })
    }
    async DeleteAsync(id: number) {
        return await this.unitOfWork.execute(async (trx) => {
            if (!(await this.equipmentCategoryRepository.FindById(id, trx) as EquipmentCategory))
                throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "No equipment category was found with the provided id", 404)

            const equipmentCount = await this.equipmentRepository.CountByEquipmentCategoryId(id, trx)
            if (equipmentCount > 0)
                throw new ApplicationException(ApplicationExceptionName.INVALID_OPERATION, "Equipment category is linked to equipments and cannot be deleted", 400)

            return (await this.equipmentCategoryRepository.Delete(id, trx))
        })
    }
}
export default EquipmentCategoryServices
