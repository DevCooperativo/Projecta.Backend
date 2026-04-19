import { Transaction } from "@/application/unitOfWork/transaction";
import Coordination from "../models/coordination";

interface ICoordinationRepository {
    Find: (trx?: Transaction) => Promise<Coordination[]>
    FindById: (id: number, trx?: Transaction) => Promise<Coordination | null>
    Create: (data: Coordination, trx?: Transaction) => Promise<Coordination | null>
    Update: (data: Coordination, trx?: Transaction) => Promise<Coordination | null>
    Delete: (id: number, trx?: Transaction) => Promise<boolean>
}
export default ICoordinationRepository