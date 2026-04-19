import { Transaction } from "@/application/unitOfWork/transaction";
import Researcher from "../models/researcher";

interface IResearcherRepository {
    Find: (trx?: Transaction) => Promise<Researcher[]>
    FindById: (id: number, trx?: Transaction) => Promise<Researcher | null>
    Create: (data: Researcher, trx?: Transaction) => Promise<Researcher | null>
    Update: (data: Researcher, trx?: Transaction) => Promise<Researcher | null>
    Delete: (id: number, trx?: Transaction) => Promise<boolean>
}
export default IResearcherRepository
