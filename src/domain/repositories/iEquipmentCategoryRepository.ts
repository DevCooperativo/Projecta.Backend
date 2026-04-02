import EquipmentCategory from "../models/equipmentCategory";

interface IEquipmentCategoryRepository {
    Find: () => Promise<EquipmentCategory[]>
    FindById: (id: number) => Promise<EquipmentCategory | null>
    Create: (data: EquipmentCategory) => Promise<EquipmentCategory | null>
    Update: (id: number, data: EquipmentCategory) => Promise<EquipmentCategory | null>
    Delete: (id: number) => Promise<boolean>
}
export default IEquipmentCategoryRepository