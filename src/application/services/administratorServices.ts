import { ApplicationExceptionName } from "@/application/constants/applicationExceptionName";
import { AdministratorDTO } from "@/application/dtos/administratorDTO";
import { CreateAdministratorInputDTO } from "@/application/dtos/administrator/createAdministratorInputDTO";
import { CreateAdministratorReturnDTO } from "@/application/dtos/administrator/createAdministratorReturnDTO";
import { UpdateAdministratorInputDTO } from "@/application/dtos/administrator/updateAdministratorInputDTO";
import { UpdateAdministratorReturnDTO } from "@/application/dtos/administrator/updateAdministratorReturnDTO";
import ApplicationException from "@/application/exceptions/applicationException";
import IAdministratorServices from "@/application/interfaces/iAdministratorServices";
import Administrator from "@/domain/models/administrator";
import IAdministratorRepository from "@/domain/repositories/iAdministratorRepository";
import { InfrastructureExceptionName } from "@/infrastructure/exceptions/constants/infrastructureExceptionName";
import InfrastructureException from "@/infrastructure/exceptions/infrastructureException";
import { inject, injectable } from "tsyringe";
import { IUnitOfWork } from "../unitOfWork/iUnitOfWork";
import { DeleteAdministratorInputDTO } from "../dtos/administrator/deleteAdministratorInputDTO";
import { DeleteAdministratorReturnDTO } from "../dtos/administrator/deleteAdministratorReturnDTO";

@injectable()
class AdministratorServices implements IAdministratorServices {
    constructor(
        @inject("AdministratorRepository")
        private readonly administratorRepository: IAdministratorRepository,
        @inject("SequelizeUnitOfWork")
        private readonly unitOfWork: IUnitOfWork
    ) { }
    async FindByEmailAsync(email: string) {
        return (await this.administratorRepository.FindByEmail(email)) as AdministratorDTO | null
    }
    async GetAllAsync() {
        return (await this.administratorRepository.Find()) as AdministratorDTO[]
    }
    async GetByIdAsync(id: number) {
        const result = await this.administratorRepository.FindById(id)
        if (!result)
            throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "No administrator was found with the provided id", 404)
        return result as AdministratorDTO
    }
    async CreateAsync(data: CreateAdministratorInputDTO) {
        return await this.unitOfWork.execute(async (trx) => {
            InfrastructureException.When((await this.administratorRepository.FindByEmail(data.email) as Administrator | null) !== null, InfrastructureExceptionName.CONSTRAINT_ERROR, "Email already in use", 409)
            const administrator = await this.administratorRepository.Create(Administrator.create(data.name, data.email), trx)
            if (!administrator)
                throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "Failed to create administrator", 500)
            return new CreateAdministratorReturnDTO(administrator.id, administrator.email)
        })
    }
    async UpdateAsync(data: UpdateAdministratorInputDTO) {
        return await this.unitOfWork.execute(async (trx) => {
            const existingAdministrator = await this.administratorRepository.FindById(data.adminId)
            if (!existingAdministrator)
                throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "No administrator was found with the provided id", 404)
            existingAdministrator.update(data.name)
            const updatedAdministrator = await this.administratorRepository.Update(existingAdministrator, trx)
            if (!updatedAdministrator)
                throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "Failed to update administrator", 500)
            return new UpdateAdministratorReturnDTO(updatedAdministrator.id, updatedAdministrator.email)
        })
    }
    async DeleteAsync(data: DeleteAdministratorInputDTO) {
        return await this.unitOfWork.execute(async (trx) => {
            const result = await this.administratorRepository.Delete(data.adminId, trx)
            return new DeleteAdministratorReturnDTO(result)
        })
    }
}
export default AdministratorServices