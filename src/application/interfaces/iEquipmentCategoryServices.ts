import { EquipmentCategoryDTO } from "application/dtos/equipmentCategoryDTO"

interface IEquipmentCategoryServices {
    GetAllAsync: () => Promise<EquipmentCategoryDTO[]>
}
export default IEquipmentCategoryServices