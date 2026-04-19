import { inject, injectable } from "tsyringe";
import ICoordinationServices from "@/application/interfaces/iCoordinationServices";
import { CoordinationDTO } from "@/application/dtos/coordinationDTO";
import Coordination from "@/domain/models/coordination";
import { ApplicationExceptionName } from "@/application/constants/applicationExceptionName";
import ApplicationException from "@/application/exceptions/applicationException";
import ICoordinationRepository from "@/domain/repositories/iCoordinationRepository";
import { IUnitOfWork } from "../unitOfWork/iUnitOfWork";

@injectable()
class CoordinationServices implements ICoordinationServices {
    constructor(
        @inject("CoordinationRepository")
        private readonly coordinationRepository: ICoordinationRepository,
        @inject("SequelizeUnitOfWork")
        private readonly unitOfWork: IUnitOfWork
    ) { }
    async GetAllAsync() {
        return (await this.coordinationRepository.Find()) as CoordinationDTO[]
    }
    async GetByIdAsync(id: number) {
        const result = await this.coordinationRepository.FindById(id)
        if (!result)
            throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "No coordination was found with the provided id", 404)
        return result as CoordinationDTO
    }
    async CreateAsync(data: CoordinationDTO) {
        return await this.unitOfWork.execute(async (trx) => {
            return (await this.coordinationRepository.Create(data, trx)) as CoordinationDTO
        })
    }
    async UpdateAsync(id: number, data: CoordinationDTO) {
        return await this.unitOfWork.execute(async (trx) => {
            if (!(await this.coordinationRepository.FindById(id) as Coordination))
                throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "No coordination was found with the provided id", 404)
            return (await this.coordinationRepository.Update({ ...data, id } as Coordination, trx)) as CoordinationDTO
        })
    }
    async DeleteAsync(id: number) {
        return await this.unitOfWork.execute(async (trx) => {
            return (await this.coordinationRepository.Delete(id, trx))
        })
    }
}
export default CoordinationServices