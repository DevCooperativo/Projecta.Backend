import { Transaction } from "@/application/unitOfWork/transaction";
import { Account } from "@/domain/models/account";
import IAuthRepository from "@/domain/repositories/iAuthRepository";
import AccountEntityMapping from "@/infrastructure/data/entityMapping/accountEntityMapping";
import { injectable } from "tsyringe";
import { SequelizeTransactionAdapter } from "../data/transactionAdapter";
import { throwNormalizedSequelizeError } from "../helpers/sequelizeErrorHandler";

@injectable()
class AuthRepository implements IAuthRepository {
    async FindByEmail(email: string, trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        const result = await AccountEntityMapping.findOne({ where: { email }, transaction })
        if (!result) return null
        return Account.rehydrate(result.id, result.email, result.passwordHash, result.createdAt, result.updatedAt, result.isVisible)
    }

    async Create(data: Account, trx?: Transaction) {
        try {
            const transaction = (trx as SequelizeTransactionAdapter)?.trx
            const result = await AccountEntityMapping.create({ ...data }, { transaction })
            return Account.rehydrate(result.id, result.email, result.passwordHash, result.createdAt, result.updatedAt, result.isVisible)
        } catch (error) { throwNormalizedSequelizeError(error); throw error }
    }
}
export default AuthRepository
