import { inject, injectable } from "tsyringe";
import ICoordinatorServices from "../interfaces/iCoordinatorServices";
import CoordinatorDTO from "../dtos/coordinatorDTO";
import ICoordinatorRepository from "domain/repositories/iCoordinatorRepository";

@injectable()
class CoordinatorServices implements ICoordinatorServices {
    constructor(
        @inject("CoordinatorRepository")
        private readonly coordinatorRepository: ICoordinatorRepository
    ) { }
    async GetAllAsync() {
        const result = await this.coordinatorRepository.Find() as CoordinatorDTO[]
        return result
    }

}
export default CoordinatorServices