import { Transaction } from "@/application/unitOfWork/transaction";
import Coordination from "@/domain/models/coordination";
import ICoordinationRepository from "@/domain/repositories/iCoordinationRepository";
import CoordinationEntityMapping from "@/infrastructure/data/entityMapping/coordinationEntityMapping";
import { injectable } from "tsyringe";
import { SequelizeTransactionAdapter } from "../data/transactionAdapter";
import { throwNormalizedSequelizeError } from "../helpers/sequelizeErrorHandler";

@injectable()
class CoordinationRepository implements ICoordinationRepository {
    
    async Find() {
        return await CoordinationEntityMapping.findAll() as unknown as Coordination[]
    }
    async FindById(id: number) {
        return await CoordinationEntityMapping.findByPk(id) as unknown as Coordination
    }
    async Create(data: Coordination, trx?: Transaction) {
        try {
            console.log(data)
            const transaction = (trx as SequelizeTransactionAdapter)?.trx
            return await CoordinationEntityMapping.create({ ...data }, { transaction }) as unknown as Coordination
        } catch (error) { throwNormalizedSequelizeError(error); throw error }
    }
    async Update(data: Coordination, trx?: Transaction) {
        try {
            const transaction = (trx as SequelizeTransactionAdapter)?.trx
            await CoordinationEntityMapping.update(data, { where: { id: data.id }, transaction })
            return (await CoordinationEntityMapping.findByPk(data.id, { transaction })) as unknown as Coordination
        } catch (error) { throwNormalizedSequelizeError(error); throw error }
    }
    async Delete(id: number, trx?: Transaction) {
        try {
            const transaction = (trx as SequelizeTransactionAdapter)?.trx
            const result = await CoordinationEntityMapping.destroy({ where: { id: id }, transaction })
            return result !== 0
        } catch (error) { throwNormalizedSequelizeError(error); throw error }
    }

}
export default CoordinationRepository
