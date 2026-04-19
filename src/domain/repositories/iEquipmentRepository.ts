import { Transaction } from "@/application/unitOfWork/transaction";
import Equipment from "@/domain/models/equipment"

interface IEquipmentRepository {
    Find: (trx?: Transaction) => Promise<Equipment[]>
    FindById: (id: number, trx?: Transaction) => Promise<Equipment | null>
    Create: (data: Equipment, trx?: Transaction) => Promise<Equipment | null>
    Update: (id: number, data: Equipment, trx?: Transaction) => Promise<Equipment | null>
    Delete: (id: number, trx?: Transaction) => Promise<boolean>
}
export default IEquipmentRepository