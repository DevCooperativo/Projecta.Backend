import { Transaction } from "@/application/unitOfWork/transaction";
import Laboratory from "@/domain/models/laboratory";
import ILaboratoryRepository from "@/domain/repositories/iLaboratoryRepository";
import LaboratoryEntity from "@/infrastructure/data/entityMapping/laboratoryEntity";
import { injectable } from "tsyringe";
import { SequelizeTransactionAdapter } from "../data/transactionAdapter";
import { throwNormalizedSequelizeError } from "../helpers/sequelizeErrorHandler";

@injectable()
class LaboratoryRepository implements ILaboratoryRepository {

    async Find(trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        return await LaboratoryEntity.findAll({ transaction }) as unknown as Laboratory[]
    }
    async FindById(id: number, trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        return await LaboratoryEntity.findByPk(id, { transaction }) as unknown as Laboratory
    }
    async Create(data: Laboratory, trx?: Transaction) {
        try {
            const transaction = (trx as SequelizeTransactionAdapter)?.trx
            return await LaboratoryEntity.create({ ...data }, { transaction }) as unknown as Laboratory
        } catch (error) { throwNormalizedSequelizeError(error); throw error }
    }
    async Update(id: number, data: Laboratory, trx?: Transaction) {
        try {
            const transaction = (trx as SequelizeTransactionAdapter)?.trx
            await LaboratoryEntity.update(data, { where: { id }, validate: true, transaction })
            return (await LaboratoryEntity.findByPk(id, { transaction })) as unknown as Laboratory
        } catch (error) { throwNormalizedSequelizeError(error); throw error }
    }
    async Delete(id: number, trx?: Transaction) {
        try {
            const transaction = (trx as SequelizeTransactionAdapter)?.trx
            const result = await LaboratoryEntity.destroy({ where: { id: id }, transaction })
            return result !== 0
        } catch (error) { throwNormalizedSequelizeError(error); throw error }
    }

}
export default LaboratoryRepository
