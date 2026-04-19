import { Transaction } from "@/application/unitOfWork/transaction";
import Professor from "@/domain/models/professor"

interface IProfessorRepository {
    Find: (trx?: Transaction) => Promise<Professor[]>
    FindById: (id: number, trx?: Transaction) => Promise<Professor | null>
    FindByEmail: (email: string, trx?: Transaction) => Promise<Professor | null>
    Create: (data: Professor, trx?: Transaction) => Promise<Professor | null>
    Update: (id: number, data: Professor, trx?: Transaction) => Promise<Professor | null>
    Delete: (id: number, trx?: Transaction) => Promise<boolean>
}
export default IProfessorRepository