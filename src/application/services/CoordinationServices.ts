import { inject, injectable } from "tsyringe";
import ICoordinationServices from "application/interfaces/iCoordinationServices";
import { CoordinationDTO } from "application/dtos/coordinationDTO";
import Coordination from "domain/models/coordination";
import { ApplicationExceptionName } from "application/constants/applicationExceptionName";
import ApplicationException from "application/exceptions/applicationException";
import ICoordinationRepository from "domain/repositories/iCoordinationRepository";

@injectable()
class CoordinationServices implements ICoordinationServices {
    constructor(
        @inject("CoordinationRepository")
        private readonly coordinationRepository: ICoordinationRepository
    ) { }
    async GetAllAsync() {
        return (await this.coordinationRepository.Find()) as CoordinationDTO[]
    }
    async GetByIdAsync(id: number) {
        return (await this.coordinationRepository.FindById(id)) as CoordinationDTO
    }
    async CreateAsync(data: CoordinationDTO) {
        return (await this.coordinationRepository.Create(data)) as CoordinationDTO
    }
    async UpdateAsync(id: number, data: CoordinationDTO) {
        if (!(await this.GetByIdAsync(id) as Coordination))
            throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "No coordination was found with the provided id", 404)
        return (await this.coordinationRepository.Update({ ...data, id } as Coordination)) as CoordinationDTO
    }
    async DeleteAsync(id: number) {
        return (await this.coordinationRepository.Delete(id))
    }
}
export default CoordinationServices