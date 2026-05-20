import { Transaction } from "@/application/unitOfWork/transaction";
import { EquipmentAvailabilityByCategoryDTO } from "@/application/dtos/equipmentAvailabilityByCategoryDTO";
import { EquipmentAvailabilityByLaboratoryDTO } from "@/application/dtos/equipmentAvailabilityByLaboratoryDTO";
import Equipment from "@/domain/models/equipment"

interface IEquipmentRepository {
    Find: (trx?: Transaction) => Promise<Equipment[]>
    FindById: (id: number, trx?: Transaction) => Promise<Equipment | null>
    FindAvailabilityByCategory: (equipmentCategoryId?: number, trx?: Transaction) => Promise<EquipmentAvailabilityByCategoryDTO[]>
    FindAvailabilityByLaboratory: (laboratoryId?: number, trx?: Transaction) => Promise<EquipmentAvailabilityByLaboratoryDTO[]>
    Create: (data: Equipment, trx?: Transaction) => Promise<Equipment | null>
    Update: (id: number, data: Equipment, trx?: Transaction) => Promise<Equipment | null>
    Delete: (id: number, trx?: Transaction) => Promise<boolean>
    CountByEquipmentCategoryId: (equipmentCategoryId: number, trx?: Transaction) => Promise<number>
    DeleteByProjectId: (projectId: number, trx?: Transaction) => Promise<void>
    FindIdsByProjectId: (projectId: number, trx?: Transaction) => Promise<number[]>
}
export default IEquipmentRepository
