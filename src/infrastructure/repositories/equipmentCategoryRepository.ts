import { Transaction } from "@/application/unitOfWork/transaction";
import EquipmentCategory from "@/domain/models/equipmentCategory";
import IEquipmentCategoryRepository from "@/domain/repositories/iEquipmentCategoryRepository";
import EquipmentCategoryEntityMapping from "@/infrastructure/data/entityMapping/equipmentCategoryEntityMapping";
import { injectable } from "tsyringe";
import { SequelizeTransactionAdapter } from "../data/transactionAdapter";

@injectable()
class EquipmentCategoryRepository implements IEquipmentCategoryRepository {

    async Find(trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        return await EquipmentCategoryEntityMapping.findAll({ transaction }) as unknown as EquipmentCategory[]
    }
    async FindById(id: number, trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        return await EquipmentCategoryEntityMapping.findByPk(id, { transaction }) as unknown as EquipmentCategory
    }
    async Create(data: EquipmentCategory, trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        return await EquipmentCategoryEntityMapping.create({ ...data }, { transaction }) as unknown as EquipmentCategory
    }
    async Update(id: number, data: EquipmentCategory, trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        await EquipmentCategoryEntityMapping.update(data, { where: { id }, validate: true, transaction })
        return (await EquipmentCategoryEntityMapping.findByPk(id, { transaction })) as unknown as EquipmentCategory
    }
    async Delete(id: number, trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        const result = await EquipmentCategoryEntityMapping.destroy({ where: { id: id }, transaction })
        return result !== 0
    }

}
export default EquipmentCategoryRepository
