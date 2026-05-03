import { Transaction } from "@/application/unitOfWork/transaction";
import Borrow from "../models/borrow";

interface IBorrowRepository {
    Find: (trx?: Transaction) => Promise<Borrow[]>
    FindById: (id: number, trx?: Transaction) => Promise<Borrow | null>
    Create: (data: Borrow, trx?: Transaction) => Promise<Borrow | null>
    Update: (id: number, data: Borrow, trx?: Transaction) => Promise<Borrow | null>
    Delete: (id: number, trx?: Transaction) => Promise<boolean>
    CountByEquipmentId: (equipmentId: number, trx?: Transaction) => Promise<number>
    DeleteByEquipmentIds: (equipmentIds: number[], trx?: Transaction) => Promise<void>
}
export default IBorrowRepository
