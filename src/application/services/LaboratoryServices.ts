import { inject, injectable } from "tsyringe";
import ILaboratoryServices from "application/interfaces/iLaboratoryServices";
import { LaboratoryDTO } from "application/dtos/laboratoryDTO";
import ILaboratoryRepository from "domain/repositories/iLaboratoryRepository";
import { ApplicationExceptionName } from "application/constants/applicationExceptionName";
import ApplicationException from "application/exceptions/applicationException";
import Laboratory from "domain/models/laboratory";

@injectable()
class LaboratoryServices implements ILaboratoryServices {
    constructor(
        @inject("LaboratoryRepository")
        private readonly laboratoryRepository: ILaboratoryRepository
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
        return (await this.laboratoryRepository.Create(data)) as LaboratoryDTO
    }
    async UpdateAsync(id: number, data: LaboratoryDTO) {
        if (!(await this.GetByIdAsync(id) as Laboratory))
            throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "No laboratory was found with the provided id", 404)
        return (await this.laboratoryRepository.Update(id, data)) as LaboratoryDTO

    }
    async DeleteAsync(id: number) {
        return (await this.laboratoryRepository.Delete(id))
    }
}
export default LaboratoryServices