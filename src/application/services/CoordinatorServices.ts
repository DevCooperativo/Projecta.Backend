import { inject, injectable } from "tsyringe";
import ICoordinatorServices from "../interfaces/iCoordinatorServices";
import CoordinatorDTO from "../dtos/coordinatorDTO";
import ICoordinatorRepository from "@/domain/repositories/iCoordinatorRepository";
import IProjectRepository from "@/domain/repositories/iProjectRepository";
import IProfessorRepository from "@/domain/repositories/iProfessorRepository";
import Coordinator from "@/domain/models/coordinator";
import { ApplicationExceptionName } from "@/application/constants/applicationExceptionName";
import ApplicationException from "@/application/exceptions/applicationException";
import { IUnitOfWork } from "../unitOfWork/iUnitOfWork";

@injectable()
class CoordinatorServices implements ICoordinatorServices {
    constructor(
        @inject("CoordinatorRepository")
        private readonly coordinatorRepository: ICoordinatorRepository,
        @inject("ProjectRepository")
        private readonly projectRepository: IProjectRepository,
        @inject("ProfessorRepository")
        private readonly professorRepository: IProfessorRepository,
        @inject("SequelizeUnitOfWork")
        private readonly unitOfWork: IUnitOfWork
    ) { }

    async GetAllAsync() {
        return (await this.coordinatorRepository.Find()) as CoordinatorDTO[]
    }

    async GetByIdAsync(id: number) {
        const result = await this.coordinatorRepository.FindById(id)
        if (!result)
            throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "No coordinator was found with the provided id", 404)
        return result as CoordinatorDTO
    }

    async CreateAsync(data: CoordinatorDTO) {
        return await this.unitOfWork.execute(async (trx) => {
            if (!await this.projectRepository.FindById(data.projectId))
                throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "No project was found with the provided id", 404)

            if (!await this.professorRepository.FindById(data.professorId))
                throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "No professor was found with the provided id", 404)

            const coordinator = Coordinator.create(data.area, new Date(data.startDate), data.professorId, data.projectId, data.endDate ? new Date(data.endDate) : undefined)
            return (await this.coordinatorRepository.Create(coordinator, trx)) as CoordinatorDTO
        })
    }

    async UpdateAsync(id: number, data: CoordinatorDTO) {
        return await this.unitOfWork.execute(async (trx) => {
            if (!(await this.coordinatorRepository.FindById(id) as Coordinator))
                throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "No coordinator was found with the provided id", 404)
            return (await this.coordinatorRepository.Update({ ...data, id } as Coordinator, trx)) as CoordinatorDTO
        })
    }

    async DeleteAsync(id: number) {
        return await this.unitOfWork.execute(async (trx) => {
            const coordinator = await this.coordinatorRepository.FindById(id)
            if (!coordinator)
                throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "No coordinator was found with the provided id", 404)

            const projectCoordinators = await this.coordinatorRepository.FindByProjectId(coordinator.projectId, trx)
            if (projectCoordinators.length <= 1)
                throw new ApplicationException("CONSTRAINT_ERROR", "Cannot delete the last coordinator of a project", 409)

            return (await this.coordinatorRepository.Delete(id, trx))
        })
    }
}

export default CoordinatorServices
