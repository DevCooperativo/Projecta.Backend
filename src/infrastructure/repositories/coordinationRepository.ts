import { Transaction } from "@/application/unitOfWork/transaction";
import Coordination from "@/domain/models/coordination";
import ICoordinationRepository from "@/domain/repositories/iCoordinationRepository";
import CoordinationEntityMapping from "@/infrastructure/data/entityMapping/coordinationEntityMapping";
import { injectable } from "tsyringe";
import { SequelizeTransactionAdapter } from "../data/transactionAdapter";

@injectable()
class CoordinationRepository implements ICoordinationRepository {
    
    async Find() {
        return await CoordinationEntityMapping.findAll() as Coordination[]
    }
    async FindById(id: number) {
        return await CoordinationEntityMapping.findByPk(id) as Coordination
    }
    async Create(data: Coordination, trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        return await CoordinationEntityMapping.create({ ...data }, { transaction }) as Coordination
    }
    async Update(data: Coordination, trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        await CoordinationEntityMapping.update(data, { where: { id: data.id }, transaction })
        return (await CoordinationEntityMapping.findByPk(data.id, { transaction })) as Coordination
    }
    async Delete(id: number, trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        const result = await CoordinationEntityMapping.destroy({ where: { id: id }, transaction })
        return result !== 0
    }

}
export default CoordinationRepository