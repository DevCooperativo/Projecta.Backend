import { Transaction } from "@/application/unitOfWork/transaction";
import EquipmentCategory from "../models/equipmentCategory";

interface IEquipmentCategoryRepository {
    Find: (trx?: Transaction) => Promise<EquipmentCategory[]>
    FindById: (id: number, trx?: Transaction) => Promise<EquipmentCategory | null>
    Create: (data: EquipmentCategory, trx?: Transaction) => Promise<EquipmentCategory | null>
    Update: (id: number, data: EquipmentCategory, trx?: Transaction) => Promise<EquipmentCategory | null>
    Delete: (id: number, trx?: Transaction) => Promise<boolean>
}
export default IEquipmentCategoryRepository