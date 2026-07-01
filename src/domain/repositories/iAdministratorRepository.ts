import { Transaction } from "@/application/unitOfWork/transaction";
import Administrator from "../models/administrator";

interface IAdministratorRepository {
    Find: (trx?: Transaction) => Promise<Administrator[]>
    FindById: (id: number, trx?: Transaction) => Promise<Administrator | null>
    FindByEmail: (email: string, trx?: Transaction) => Promise<Administrator | null>
    Create: (data: Administrator, trx?: Transaction) => Promise<Administrator | null>
    Update: (data: Administrator, trx?: Transaction) => Promise<Administrator | null>
    Delete: (id: number, trx?: Transaction) => Promise<boolean>
}
export default IAdministratorRepository