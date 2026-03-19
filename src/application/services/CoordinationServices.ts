import { inject, injectable } from "tsyringe";
import ICoordinationServices from "application/interfaces/iCoordinationServices";
import { CoordinationDTO } from "application/dtos/coordinationDTO";
import ICoordinationRepository from "domain/repositories/iCoordinationRepository";

@injectable()
class CoordinationServices implements ICoordinationServices {
    constructor(
        @inject("CoordinationRepository")
        private readonly coordinationRepository: ICoordinationRepository
    ) { }
    async GetAllAsync() {
        const result = await this.coordinationRepository.Find() as CoordinationDTO[]
        return result
    }

}
export default CoordinationServices