import { ApplicationExceptionName } from "@/application/constants/applicationExceptionName";
import EquipmentDTO from "@/application/dtos/equipmentDTO";
import ApplicationException from "@/application/exceptions/applicationException";
import IEquipmentServices from "@/application/interfaces/iEquipmentServices";
import Equipment from "@/domain/models/equipment";
import IBorrowRepository from "@/domain/repositories/iBorrowRepository";
import IEquipmentCategoryRepository from "@/domain/repositories/iEquipmentCategoryRepository";
import IEquipmentRepository from "@/domain/repositories/iEquipmentRepository";
import ILaboratoryRepository from "@/domain/repositories/iLaboratoryRepository";
import IProjectRepository from "@/domain/repositories/iProjectRepository";
import { inject, injectable } from "tsyringe";
import { IUnitOfWork } from "../unitOfWork/iUnitOfWork";
import { Transaction } from "../unitOfWork/transaction";

@injectable()
class EquipmentServices implements IEquipmentServices {
    private static readonly MAX_EQUIPMENTS_PER_LABORATORY = 50

    constructor(
        @inject("EquipmentRepository")
        private readonly equipmentRepository: IEquipmentRepository,
        @inject("LaboratoryRepository")
        private readonly laboratoryRepository: ILaboratoryRepository,
        @inject("ProjectRepository")
        private readonly projectRepository: IProjectRepository,
        @inject("EquipmentCategoryRepository")
        private readonly equipmentCategoryRepository: IEquipmentCategoryRepository,
        @inject("BorrowRepository")
        private readonly borrowRepository: IBorrowRepository,
        @inject("SequelizeUnitOfWork")
        private readonly unitOfWork: IUnitOfWork
    ) { }
    async GetAllAsync() {
        return (await this.equipmentRepository.Find()) as EquipmentDTO[]
    }
    async GetByIdAsync(id: number) {
        const result = await this.equipmentRepository.FindById(id)
        if (!result)
            return null
        return result as EquipmentDTO
    }
    async CreateAsync(data: EquipmentDTO) {
        return await this.unitOfWork.execute(async (trx) => {
            // RN1: equipamento deve estar vinculado a laboratorio, projeto e categoria existentes.
            await this.EnsureValidEquipmentLinks(data, trx)
            // RN2: laboratorio nao pode ter mais de 50 equipamentos cadastrados.
            await this.EnsureLaboratoryCapacity(data.laboratoryId, undefined, trx)
            return (await this.equipmentRepository.Create(data as Equipment, trx)) as EquipmentDTO
        })
    }
    async UpdateAsync(id: number, data: EquipmentDTO) {
        return await this.unitOfWork.execute(async (trx) => {
            if (!(await this.equipmentRepository.FindById(id, trx) as Equipment))
                throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "No equipment was found with the provided id", 404)
            // RN1 e RN2: ao alterar equipamento, os vinculos e o limite do laboratorio sao revalidados.
            await this.EnsureValidEquipmentLinks(data, trx)
            await this.EnsureLaboratoryCapacity(data.laboratoryId, id, trx)
            return (await this.equipmentRepository.Update(id, data as Equipment, trx)) as EquipmentDTO
        })
    }
    async DeleteAsync(id: number) {
        return await this.unitOfWork.execute(async (trx) => {
            if (!(await this.equipmentRepository.FindById(id, trx) as Equipment))
                throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "No equipment was found with the provided id", 404)
            // RN3: equipamento com emprestimo ativo nao pode ser removido.
            await this.EnsureEquipmentHasNoActiveBorrows(id, trx)
            return (await this.equipmentRepository.Delete(id, trx))
        })
    }

    // RN1: equipamento deve estar vinculado a registros validos no banco.
    private async EnsureValidEquipmentLinks(data: EquipmentDTO, trx?: Transaction) {
        const laboratory = await this.laboratoryRepository.FindById(data.laboratoryId, trx)
        if (!laboratory)
            throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "No laboratory was found with the provided id", 404)

        const project = await this.projectRepository.FindById(data.projectId, trx)
        if (!project)
            throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "No project was found with the provided id", 404)

        const equipmentCategory = await this.equipmentCategoryRepository.FindById(data.equipmentCategoryId, trx)
        if (!equipmentCategory)
            throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "No equipment category was found with the provided id", 404)
    }

    // RN2: cada laboratorio comporta no maximo 50 equipamentos.
    private async EnsureLaboratoryCapacity(laboratoryId: number, currentEquipmentId?: number, trx?: Transaction) {
        const equipments = await this.equipmentRepository.Find(trx)
        const laboratoryEquipmentsCount = equipments.filter(equipment =>
            equipment.laboratoryId === laboratoryId && equipment.id !== currentEquipmentId
        ).length

        if (laboratoryEquipmentsCount >= EquipmentServices.MAX_EQUIPMENTS_PER_LABORATORY)
            throw new ApplicationException(ApplicationExceptionName.INVALID_OPERATION, "Laboratory cannot have more than 50 equipments", 400)
    }

    // RN3: equipamento com emprestimos ativos fica protegido contra exclusao.
    private async EnsureEquipmentHasNoActiveBorrows(equipmentId: number, trx?: Transaction) {
        const borrowCount = await this.borrowRepository.CountActiveByEquipmentId(equipmentId, trx)

        if (borrowCount > 0)
            throw new ApplicationException(ApplicationExceptionName.INVALID_OPERATION, "Equipment has active borrows and cannot be deleted", 400)
    }
}
export default EquipmentServices
