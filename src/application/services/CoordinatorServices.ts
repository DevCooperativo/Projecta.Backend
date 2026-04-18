import { inject, injectable } from "tsyringe";
import ICoordinatorServices from "../interfaces/iCoordinatorServices";
import CoordinatorDTO from "../dtos/coordinatorDTO";
import ICoordinatorRepository from "domain/repositories/iCoordinatorRepository";
import Coordinator from "domain/models/coordinator";
import { ApplicationExceptionName } from "application/constants/applicationExceptionName";
import ApplicationException from "application/exceptions/applicationException";

@injectable()
class CoordinatorServices implements ICoordinatorServices {
    constructor(
        @inject("CoordinatorRepository")
        private readonly coordinatorRepository: ICoordinatorRepository
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
        return (await this.coordinatorRepository.Create(data)) as CoordinatorDTO
    }
    async UpdateAsync(id: number, data: CoordinatorDTO) {
        if (!(await this.GetByIdAsync(id) as Coordinator))
            throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "No coordinator was found with the provided id", 404)
        return (await this.coordinatorRepository.Update({ ...data, id } as Coordinator)) as CoordinatorDTO
    }
    async DeleteAsync(id: number) {
        return (await this.coordinatorRepository.Delete(id))
    }
}
export default CoordinatorServices