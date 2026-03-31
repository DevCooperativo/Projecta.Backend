import { ApplicationExceptionName } from "application/constants/applicationExceptionName";
import ProfessorDTO from "application/dtos/professorDTO";
import ApplicationException from "application/exceptions/applicationException";
import IProfessorServices from "application/interfaces/iProfessorServices";
import Professor from "domain/models/professor";
import IProfessorRepository from "domain/repositories/iProfessorRepository";
import { InfrastructureExceptionName } from "infrastructure/exceptions/constants/infrastructureExceptionName";
import InfrastructureException from "infrastructure/exceptions/infrastructureException";
import { inject, injectable } from "tsyringe";

@injectable()
class ProfessorServices implements IProfessorServices {
    constructor(
        @inject("ProfessorRepository")
        private readonly professorRepository: IProfessorRepository
    ) { }
    async GetAllAsync() {
        return (await this.professorRepository.Find()) as ProfessorDTO[]
    }
    async GetByIdAsync(id: number) {
        return (await this.professorRepository.FindById(id)) as ProfessorDTO
    }
    async CreateAsync(data: ProfessorDTO) {
        InfrastructureException.When((await this.professorRepository.FindByEmail(data.email) as Professor | null) !== null, InfrastructureExceptionName.CONSTRAINT_ERROR, "Email already in use", 409)
        return (await this.professorRepository.Create(data)) as ProfessorDTO
    }
    async UpdateAsync(id: number, data: ProfessorDTO) {
        if (!(await this.GetByIdAsync(id) as Professor))
            throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "No professor was found with the provided id", 404)
        return (await this.professorRepository.Update(id, data)) as ProfessorDTO

    }
    async DeleteAsync(id: number) {
        return (await this.professorRepository.Delete(id))
    }
}
export default ProfessorServices