import { EquipmentCategoryDTO } from "@/application/dtos/equipmentCategoryDTO"

interface IEquipmentCategoryServices {
    GetAllAsync: () => Promise<EquipmentCategoryDTO[]>
    GetByIdAsync: (id: number) => Promise<EquipmentCategoryDTO | null>
    CreateAsync: (data: EquipmentCategoryDTO) => Promise<EquipmentCategoryDTO>
    UpdateAsync: (id: number, data: EquipmentCategoryDTO) => Promise<EquipmentCategoryDTO>
    DeleteAsync: (id: number) => Promise<boolean>
}
export default IEquipmentCategoryServices