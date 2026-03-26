import { inject, injectable } from "tsyringe";
import ILaboratoryServices from "application/interfaces/iLaboratoryServices";
import { LaboratoryDTO } from "application/dtos/laboratoryDTO";
import ILaboratoryRepository from "domain/repositories/iLaboratoryRepository";

@injectable()
class LaboratoryServices implements ILaboratoryServices {
    constructor(
        @inject("LaboratoryRepository")
        private readonly laboratoryRepository: ILaboratoryRepository
    ) { }
    async GetAllAsync() {
        const result = await this.laboratoryRepository.Find() as LaboratoryDTO[]
        return result
    }

}
export default LaboratoryServices