import { Transaction } from "@/application/unitOfWork/transaction";
import Coordinator from "../models/coordinator";

interface ICoordinatorRepository {
    Find: (trx?: Transaction) => Promise<Coordinator[]>
    FindById: (id: number, trx?: Transaction) => Promise<Coordinator | null>
    FindByProjectId: (projectId: number, trx?: Transaction) => Promise<Coordinator[]>
    Create: (data: Coordinator, trx?: Transaction) => Promise<Coordinator | null>
    Update: (data: Coordinator, trx?: Transaction) => Promise<Coordinator | null>
    Delete: (id: number, trx?: Transaction) => Promise<boolean>
}
export default ICoordinatorRepository