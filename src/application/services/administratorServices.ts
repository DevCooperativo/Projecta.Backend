import { ApplicationExceptionName } from "application/constants/applicationExceptionName";
import AdministratorDTO from "application/dtos/professorDTO";
import ApplicationException from "application/exceptions/applicationException";
import IAdministratorServices from "application/interfaces/iAdministratorServices";
import Administrator from "domain/models/professor";
import IAdministratorRepository from "domain/repositories/iAdministratorRepository";
import { InfrastructureExceptionName } from "infrastructure/exceptions/constants/infrastructureExceptionName";
import InfrastructureException from "infrastructure/exceptions/infrastructureException";
import { inject, injectable } from "tsyringe";

@injectable()
class AdministratorServices implements IAdministratorServices {
    constructor(
        @inject("AdministratorRepository")
        private readonly administratorRepository: IAdministratorRepository
    ) { }
    async GetAllAsync() {
        return (await this.administratorRepository.Find()) as AdministratorDTO[]
    }
    async GetByIdAsync(id: number) {
        return (await this.administratorRepository.FindById(id)) as AdministratorDTO
    }
    async CreateAsync(data: AdministratorDTO) {
        InfrastructureException.When((await this.administratorRepository.FindByEmail(data.email) as Administrator | null) !== null, InfrastructureExceptionName.CONSTRAINT_ERROR, "Email already in use", 409)
        return (await this.administratorRepository.Create(data)) as AdministratorDTO
    }
    async UpdateAsync(id: number, data: AdministratorDTO) {
        if (!(await this.GetByIdAsync(id) as Administrator))
            throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "No administrator was found with the provided id", 404)
        return (await this.administratorRepository.Update(id, data)) as AdministratorDTO

    }
    async DeleteAsync(id: number) {
        return (await this.administratorRepository.Delete(id))
    }
}
export default AdministratorServices