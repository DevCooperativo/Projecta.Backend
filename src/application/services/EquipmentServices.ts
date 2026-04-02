import { ApplicationExceptionName } from "application/constants/applicationExceptionName";
import EquipmentDTO from "application/dtos/equipmentDTO";
import ApplicationException from "application/exceptions/applicationException";
import IEquipmentServices from "application/interfaces/iEquipmentServices";
import Equipment from "domain/models/equipment";
import IEquipmentRepository from "domain/repositories/iEquipmentRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class EquipmentServices implements IEquipmentServices {
    constructor(
        @inject("EquipmentRepository")
        private readonly equipmentRepository: IEquipmentRepository
    ) { }
    async GetAllAsync() {
        return (await this.equipmentRepository.Find()) as EquipmentDTO[]
    }
    async GetByIdAsync(id: number) {
        return (await this.equipmentRepository.FindById(id)) as EquipmentDTO
    }
    async CreateAsync(data: EquipmentDTO) {
        return (await this.equipmentRepository.Create(data)) as EquipmentDTO
    }
    async UpdateAsync(id: number, data: EquipmentDTO) {
        if (!(await this.GetByIdAsync(id) as Equipment))
            throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "No equipment was found with the provided id", 404)
        return (await this.equipmentRepository.Update(id, data)) as EquipmentDTO
    }
    async DeleteAsync(id: number) {
        return (await this.equipmentRepository.Delete(id))
    }
}
export default EquipmentServices