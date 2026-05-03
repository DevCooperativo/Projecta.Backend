import { ApplicationExceptionName } from "@/application/constants/applicationExceptionName";
import ProfessorDTO from "@/application/dtos/professorDTO";
import { CreateProfessorInputDTO } from "@/application/dtos/professor/createProfessorInputDTO";
import { CreateProfessorReturnDTO } from "@/application/dtos/professor/createProfessorReturnDTO";
import { UpdateProfessorInputDTO } from "@/application/dtos/professor/updateProfessorInputDTO";
import { UpdateProfessorReturnDTO } from "@/application/dtos/professor/updateProfessorReturnDTO";
import ApplicationException from "@/application/exceptions/applicationException";
import IProfessorServices from "@/application/interfaces/iProfessorServices";
import Professor from "@/domain/models/professor";
import IProfessorRepository from "@/domain/repositories/iProfessorRepository";
import { InfrastructureExceptionName } from "@/infrastructure/exceptions/constants/infrastructureExceptionName";
import InfrastructureException from "@/infrastructure/exceptions/infrastructureException";
import { inject, injectable } from "tsyringe";
import { IUnitOfWork } from "../unitOfWork/iUnitOfWork";
import { ChangeProfessorCoordinationInputDTO } from "../dtos/professor/changeProfessorCoordinationInputDTO";
import { ChangeProfessorCoordinationReturnDTO } from "../dtos/professor/updateProfessorCoordinationReturnDTO";
import { AccountType } from "@/infrastructure/authentication/constants/accountType";

@injectable()
class ProfessorServices implements IProfessorServices {
    constructor(
        @inject("ProfessorRepository")
        private readonly professorRepository: IProfessorRepository,
        @inject("SequelizeUnitOfWork")
        private readonly unitOfWork: IUnitOfWork
    ) { }
    async GetByEmailAsync(email: string) {
        const result = await this.professorRepository.FindByEmail(email)
        if (!result) return null
        return new ProfessorDTO(result.id, result.name, result.email, result.registration, result.telephone, result.coordinationId, result.createdAt, result.updatedAt, result.isVisible,
        )
    }

    async GetAllAsync() {
        return (await this.professorRepository.Find()) as ProfessorDTO[]
    }
    async GetByIdAsync(id: number) {
        const result = await this.professorRepository.FindById(id)
        if (!result)
            throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "No professor was found with the provided id", 404)
        return result as ProfessorDTO
    }
    async CreateAsync(data: CreateProfessorInputDTO) {
        return await this.unitOfWork.execute(async (trx) => {
            InfrastructureException.When((await this.professorRepository.FindByEmail(data.email) as Professor | null) !== null, InfrastructureExceptionName.CONSTRAINT_ERROR, "Email already in use", 409)
            const professor = Professor.create(data.name, data.email, data.registration, data.telephone, data.coordinationId)
            return (await this.professorRepository.Create(professor, trx)) as CreateProfessorReturnDTO
        })
    }
    async UpdateAsync(data: UpdateProfessorInputDTO) {
        return await this.unitOfWork.execute(async (trx) => {
            if (data.accountType !== AccountType.professor)
                throw new ApplicationException(ApplicationExceptionName.NOT_BELONGS_TO, "User is not acting as a professor", 403)
            const professorByEmail = await this.professorRepository.FindByEmail(data.userEmail)
            if (!professorByEmail)
                throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "No professor profile found for this user", 404)
            professorByEmail.update(data.name, data.registration, data.telephone)
            await this.professorRepository.Update(professorByEmail.id, professorByEmail, trx)
            return new UpdateProfessorReturnDTO(professorByEmail.id, professorByEmail.name, professorByEmail.email, professorByEmail.registration, professorByEmail.telephone, professorByEmail.coordinationId)
        })
    }
    async ChangeProfessorCoordinationAsync(data: ChangeProfessorCoordinationInputDTO) {
        return await this.unitOfWork.execute(async (trx) => {
            const professorToUpdate = await this.professorRepository.FindByEmail(data.userEmail)
            if (!professorToUpdate)
                throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "No professor was found with the provided email", 404)
            professorToUpdate.changeCoordination(data.coordinationId)
            await this.professorRepository.Update(professorToUpdate.id, professorToUpdate, trx)
            return new ChangeProfessorCoordinationReturnDTO(professorToUpdate.id, professorToUpdate.name, professorToUpdate.email, professorToUpdate.registration, professorToUpdate.telephone, professorToUpdate.coordinationId)
        })
    }
    async DeleteAsync(id: number) {
        return await this.unitOfWork.execute(async (trx) => {
            return (await this.professorRepository.Delete(id, trx))
        })
    }
}
export default ProfessorServices