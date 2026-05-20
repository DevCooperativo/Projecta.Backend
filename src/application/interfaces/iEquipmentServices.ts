import EquipmentDTO from "@/application/dtos/equipmentDTO";
import { EquipmentAvailabilityByCategoryDTO } from "../dtos/equipmentAvailabilityByCategoryDTO";
import { EquipmentAvailabilityByLaboratoryDTO } from "../dtos/equipmentAvailabilityByLaboratoryDTO";

interface IEquipmentServices {
    GetAllAsync: () => Promise<EquipmentDTO[]>
    GetByIdAsync: (id: number) => Promise<EquipmentDTO | null>
    GetAvailabilityByCategoryAsync: (equipmentCategoryId?: number) => Promise<EquipmentAvailabilityByCategoryDTO[]>
    GetAvailabilityByLaboratoryAsync: (laboratoryId?: number) => Promise<EquipmentAvailabilityByLaboratoryDTO[]>
    CreateAsync: (data: EquipmentDTO) => Promise<EquipmentDTO>
    UpdateAsync: (id: number, data: EquipmentDTO) => Promise<EquipmentDTO>
    DeleteAsync: (id: number) => Promise<boolean>
}

export default IEquipmentServices
