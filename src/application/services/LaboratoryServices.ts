import { inject, injectable } from "tsyringe";
import ILaboratoryServices from "@/application/interfaces/iLaboratoryServices";
import { LaboratoryDTO } from "@/application/dtos/laboratoryDTO";
import ILaboratoryRepository from "@/domain/repositories/iLaboratoryRepository";
import { ApplicationExceptionName } from "@/application/constants/applicationExceptionName";
import ApplicationException from "@/application/exceptions/applicationException";
import Laboratory from "@/domain/models/laboratory";
import { IUnitOfWork } from "../unitOfWork/iUnitOfWork";

@injectable()
class LaboratoryServices implements ILaboratoryServices {
    constructor(
        @inject("LaboratoryRepository")
        private readonly laboratoryRepository: ILaboratoryRepository,
        @inject("SequelizeUnitOfWork")
        private readonly unitOfWork: IUnitOfWork
    ) { }
    async GetAllAsync() {
        return (await this.laboratoryRepository.Find()) as LaboratoryDTO[]
    }
    async GetByIdAsync(id: number) {
        const result = await this.laboratoryRepository.FindById(id)
        if (!result)
            throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "No laboratory was found with the provided id", 404)
        return result as LaboratoryDTO
    }
    async CreateAsync(data: LaboratoryDTO) {
        return await this.unitOfWork.execute(async (trx) => {
            return (await this.laboratoryRepository.Create(data, trx)) as LaboratoryDTO
        })
    }
    async UpdateAsync(id: number, data: LaboratoryDTO) {
        return await this.unitOfWork.execute(async (trx) => {
            if (!(await this.laboratoryRepository.FindById(id) as Laboratory))
                throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "No laboratory was found with the provided id", 404)
            return (await this.laboratoryRepository.Update(id, data, trx)) as LaboratoryDTO
        })
    }
    async DeleteAsync(id: number) {
        return await this.unitOfWork.execute(async (trx) => {
            return (await this.laboratoryRepository.Delete(id, trx))
        })
    }
}
export default LaboratoryServices