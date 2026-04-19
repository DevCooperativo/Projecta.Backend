import { inject, injectable } from "tsyringe";
import IResearcherServices from "../interfaces/iResearcherServices";
import ResearcherDTO from "../dtos/researcherDTO";
import IResearcherRepository from "@/domain/repositories/iResearcherRepository";
import Researcher from "@/domain/models/researcher";
import { ApplicationExceptionName } from "@/application/constants/applicationExceptionName";
import ApplicationException from "@/application/exceptions/applicationException";
import { IUnitOfWork } from "../unitOfWork/iUnitOfWork";

@injectable()
class ResearcherServices implements IResearcherServices {
    constructor(
        @inject("ResearcherRepository")
        private readonly researcherRepository: IResearcherRepository,
        @inject("SequelizeUnitOfWork")
        private readonly unitOfWork: IUnitOfWork
    ) { }
    async GetAllAsync() {
        return (await this.researcherRepository.Find()) as ResearcherDTO[]
    }
    async GetByIdAsync(id: number) {
        const result = await this.researcherRepository.FindById(id)
        if (!result)
            throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "No researcher was found with the provided id", 404)
        return result as ResearcherDTO
    }
    async CreateAsync(data: ResearcherDTO) {
        return await this.unitOfWork.execute(async (trx) => {
            return (await this.researcherRepository.Create(data, trx)) as ResearcherDTO
        })
    }
    async UpdateAsync(id: number, data: ResearcherDTO) {
        return await this.unitOfWork.execute(async (trx) => {
            if (!(await this.researcherRepository.FindById(id) as Researcher))
                throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "No researcher was found with the provided id", 404)
            return (await this.researcherRepository.Update({ ...data, id } as Researcher, trx)) as ResearcherDTO
        })
    }
    async DeleteAsync(id: number) {
        return await this.unitOfWork.execute(async (trx) => {
            return (await this.researcherRepository.Delete(id, trx))
        })
    }
}
export default ResearcherServices
