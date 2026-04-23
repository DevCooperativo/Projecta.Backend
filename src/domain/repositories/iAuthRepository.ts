import { Transaction } from "@/application/unitOfWork/transaction";
import { Account } from "@/domain/models/account";

interface IAuthRepository {
    FindByEmail: (email: string, trx?: Transaction) => Promise<Account | null>
    Create: (data: Account, trx?: Transaction) => Promise<Account | null>
}
export default IAuthRepository
