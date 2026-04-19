import { Transaction } from "@/application/unitOfWork/transaction";
import Laboratory from "@/domain/models/laboratory";
import ILaboratoryRepository from "@/domain/repositories/iLaboratoryRepository";
import LaboratoryEntity from "@/infrastructure/data/entityMapping/laboratoryEntity";
import { injectable } from "tsyringe";
import { SequelizeTransactionAdapter } from "../data/transactionAdapter";

@injectable()
class LaboratoryRepository implements ILaboratoryRepository {

    async Find() {
        return await LaboratoryEntity.findAll() as Laboratory[]
    }
    async FindById(id: number) {
        return await LaboratoryEntity.findByPk(id) as Laboratory
    }
    async Create(data: Laboratory, trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        return await LaboratoryEntity.create({ ...data }, { transaction }) as Laboratory
    }
    async Update(id: number, data: Laboratory, trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        await LaboratoryEntity.update(data, { where: { id }, validate: true, transaction })
        return (await LaboratoryEntity.findByPk(id, { transaction })) as Laboratory
    }
    async Delete(id: number, trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        const result = await LaboratoryEntity.destroy({ where: { id: id }, transaction })
        return result !== 0
    }

}
export default LaboratoryRepository