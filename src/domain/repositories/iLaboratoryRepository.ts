import { Transaction } from "@/application/unitOfWork/transaction";
import Laboratory from "../models/laboratory";

interface ILaboratoryRepository {
    Find: (trx?: Transaction) => Promise<Laboratory[]>
    FindById: (id: number, trx?: Transaction) => Promise<Laboratory | null>
    Create: (data: Laboratory, trx?: Transaction) => Promise<Laboratory | null>
    Update: (id: number, data: Laboratory, trx?: Transaction) => Promise<Laboratory | null>
    Delete: (id: number, trx?: Transaction) => Promise<boolean>
}
export default ILaboratoryRepository