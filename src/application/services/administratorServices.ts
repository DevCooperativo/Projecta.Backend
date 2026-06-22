import { ApplicationExceptionName } from "@/application/constants/applicationExceptionName";
import { AdministratorDTO } from "@/application/dtos/administrator/administratorDTO";
import { CreateAdministratorInputDTO } from "@/application/dtos/administrator/createAdministratorInputDTO";
import { CreateAdministratorReturnDTO } from "@/application/dtos/administrator/createAdministratorReturnDTO";
import { UpdateAdministratorInputDTO } from "@/application/dtos/administrator/updateAdministratorInputDTO";
import { UpdateAdministratorReturnDTO } from "@/application/dtos/administrator/updateAdministratorReturnDTO";
import ApplicationException from "@/application/exceptions/applicationException";
import IAdministratorServices from "@/application/interfaces/iAdministratorServices";
import { Account } from "@/domain/models/account";
import Administrator from "@/domain/models/administrator";
import IAdministratorRepository from "@/domain/repositories/iAdministratorRepository";
import IAuthRepository from "@/domain/repositories/iAuthRepository";
import IProfessorRepository from "@/domain/repositories/iProfessorRepository";
import IStudentRepository from "@/domain/repositories/iStudentRepository";
import { InfrastructureExceptionName } from "@/infrastructure/exceptions/constants/infrastructureExceptionName";
import InfrastructureException from "@/infrastructure/exceptions/infrastructureException";
import { hashPassword } from "@/infrastructure/helpers/passwordHasher";
import { inject, injectable } from "tsyringe";
import { IUnitOfWork } from "../unitOfWork/iUnitOfWork";
import { DeleteAdministratorInputDTO } from "../dtos/administrator/deleteAdministratorInputDTO";
import { DeleteAdministratorReturnDTO } from "../dtos/administrator/deleteAdministratorReturnDTO";
import { AccountType } from "@/infrastructure/authentication/constants/accountType";

@injectable()
class AdministratorServices implements IAdministratorServices {
    constructor(
        @inject("AdministratorRepository")
        private readonly administratorRepository: IAdministratorRepository,
        @inject("AuthRepository")
        private readonly authRepository: IAuthRepository,
        @inject("StudentRepository")
        private readonly studentRepository: IStudentRepository,
        @inject("ProfessorRepository")
        private readonly professorRepository: IProfessorRepository,
        @inject("SequelizeUnitOfWork")
        private readonly unitOfWork: IUnitOfWork
    ) { }
    async GetByEmailAsync(email: string) {
        const result = await this.administratorRepository.FindByEmail(email)
        if (!result) return null
        return new AdministratorDTO(result.id, result.name, result.email, result.isVisible, result.createdAt, result.updatedAt)
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
            InfrastructureException.When((await this.authRepository.FindByEmail(data.email)) !== null, InfrastructureExceptionName.CONSTRAINT_ERROR, "Email already in use", 409)
            InfrastructureException.When((await this.studentRepository.FindByEmail(data.email)) !== null, InfrastructureExceptionName.CONSTRAINT_ERROR, "Email already in use", 409)
            InfrastructureException.When((await this.professorRepository.FindByEmail(data.email)) !== null, InfrastructureExceptionName.CONSTRAINT_ERROR, "Email already in use", 409)
            InfrastructureException.When((await this.administratorRepository.FindByEmail(data.email)) !== null, InfrastructureExceptionName.CONSTRAINT_ERROR, "Email already in use", 409)
            await this.authRepository.Create(Account.create(data.email, hashPassword(data.password)), trx)
            const administrator = await this.administratorRepository.Create(Administrator.create(data.name, data.email), trx)
            if (!administrator)
                throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "Failed to create administrator", 500)
            return new CreateAdministratorReturnDTO(administrator.id, administrator.email)
        })
    }
    async UpdateAsync(data: UpdateAdministratorInputDTO) {
        return await this.unitOfWork.execute(async (trx) => {
            if (data.accountType !== AccountType.administrator)
                throw new ApplicationException(ApplicationExceptionName.NOT_BELONGS_TO, "User is not acting as an administrator", 403)
            const adminByEmail = await this.administratorRepository.FindByEmail(data.userEmail)
            if (!adminByEmail)
                throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "No administrator profile found for this user", 404)
            if (adminByEmail.id !== data.adminId)
                throw new ApplicationException(ApplicationExceptionName.NOT_BELONGS_TO, "Administrator profile does not belong to the current user", 403)
            adminByEmail.update(data.name)
            const updatedAdministrator = await this.administratorRepository.Update(adminByEmail, trx)
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