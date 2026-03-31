import { inject, injectable } from "tsyringe";
import IResearcherServices from "../interfaces/iResearcherServices";
import ResearcherDTO from "../dtos/researcherDTO";
import IResearcherRepository from "domain/repositories/iResearcherRepository";
import Researcher from "domain/models/researcher";
import { ApplicationExceptionName } from "application/constants/applicationExceptionName";
import ApplicationException from "application/exceptions/applicationException";

@injectable()
class ResearcherServices implements IResearcherServices {
    constructor(
        @inject("ResearcherRepository")
        private readonly researcherRepository: IResearcherRepository
    ) { }
    async GetAllAsync() {
        return (await this.researcherRepository.Find()) as ResearcherDTO[]
    }
    async GetByIdAsync(id: number) {
        return (await this.researcherRepository.FindById(id)) as ResearcherDTO
    }
    async CreateAsync(data: ResearcherDTO) {
        return (await this.researcherRepository.Create(data)) as ResearcherDTO
    }
    async UpdateAsync(id: number, data: ResearcherDTO) {
        if (!(await this.GetByIdAsync(id) as Researcher))
            throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "No researcher was found with the provided id", 404)
        return (await this.researcherRepository.Update({ ...data, id } as Researcher)) as ResearcherDTO
    }
    async DeleteAsync(id: number) {
        return (await this.researcherRepository.Delete(id))
    }
}
export default ResearcherServices
