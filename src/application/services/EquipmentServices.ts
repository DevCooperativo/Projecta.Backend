import { ApplicationExceptionName } from "@/application/constants/applicationExceptionName";
import EquipmentDTO from "@/application/dtos/equipmentDTO";
import ApplicationException from "@/application/exceptions/applicationException";
import IEquipmentServices from "@/application/interfaces/iEquipmentServices";
import Equipment from "@/domain/models/equipment";
import IEquipmentRepository from "@/domain/repositories/iEquipmentRepository";
import { inject, injectable } from "tsyringe";
import { IUnitOfWork } from "../unitOfWork/iUnitOfWork";

@injectable()
class EquipmentServices implements IEquipmentServices {
    constructor(
        @inject("EquipmentRepository")
        private readonly equipmentRepository: IEquipmentRepository,
        @inject("SequelizeUnitOfWork")
        private readonly unitOfWork: IUnitOfWork
    ) { }
    async GetAllAsync() {
        return (await this.equipmentRepository.Find()) as EquipmentDTO[]
    }
    async GetByIdAsync(id: number) {
        const result = await this.equipmentRepository.FindById(id)
        if (!result)
            return null
        return result as EquipmentDTO
    }
    async CreateAsync(data: EquipmentDTO) {
        return await this.unitOfWork.execute(async (trx) => {
            return (await this.equipmentRepository.Create(data, trx)) as EquipmentDTO
        })
    }
    async UpdateAsync(id: number, data: EquipmentDTO) {
        return await this.unitOfWork.execute(async (trx) => {
            if (!(await this.equipmentRepository.FindById(id) as Equipment))
                throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "No equipment was found with the provided id", 404)
            return (await this.equipmentRepository.Update(id, data, trx)) as EquipmentDTO
        })
    }
    async DeleteAsync(id: number) {
        return await this.unitOfWork.execute(async (trx) => {
            return (await this.equipmentRepository.Delete(id, trx))
        })
    }
}
export default EquipmentServices