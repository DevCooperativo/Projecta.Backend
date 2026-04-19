import { inject, injectable } from "tsyringe";
import ICoordinatorServices from "../interfaces/iCoordinatorServices";
import CoordinatorDTO from "../dtos/coordinatorDTO";
import ICoordinatorRepository from "@/domain/repositories/iCoordinatorRepository";
import Coordinator from "@/domain/models/coordinator";
import { ApplicationExceptionName } from "@/application/constants/applicationExceptionName";
import ApplicationException from "@/application/exceptions/applicationException";
import { IUnitOfWork } from "../unitOfWork/iUnitOfWork";

@injectable()
class CoordinatorServices implements ICoordinatorServices {
    constructor(
        @inject("CoordinatorRepository")
        private readonly coordinatorRepository: ICoordinatorRepository,
        @inject("SequelizeUnitOfWork")
        private readonly unitOfWork: IUnitOfWork
    ) { }
    async GetAllAsync() {
        return (await this.coordinatorRepository.Find()) as CoordinatorDTO[]
    }
    async GetByIdAsync(id: number) {
        const result = await this.coordinatorRepository.FindById(id)
        if (!result)
            throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "No coordinator was found with the provided id", 404)
        return result as CoordinatorDTO
    }
    async CreateAsync(data: CoordinatorDTO) {
        return await this.unitOfWork.execute(async (trx) => {
            return (await this.coordinatorRepository.Create(data, trx)) as CoordinatorDTO
        })
    }
    async UpdateAsync(id: number, data: CoordinatorDTO) {
        return await this.unitOfWork.execute(async (trx) => {
            if (!(await this.coordinatorRepository.FindById(id) as Coordinator))
                throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "No coordinator was found with the provided id", 404)
            return (await this.coordinatorRepository.Update({ ...data, id } as Coordinator, trx)) as CoordinatorDTO
        })
    }
    async DeleteAsync(id: number) {
        return await this.unitOfWork.execute(async (trx) => {
            return (await this.coordinatorRepository.Delete(id, trx))
        })
    }
}
export default CoordinatorServices