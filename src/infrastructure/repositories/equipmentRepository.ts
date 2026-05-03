import { Op } from "sequelize";
import { Transaction } from "@/application/unitOfWork/transaction";
import Equipment from "@/domain/models/equipment";
import IEquipmentRepository from "@/domain/repositories/iEquipmentRepository";
import { injectable } from "tsyringe";
import EquipmentEntity from "../data/entityMapping/equipmentEntity";
import { SequelizeTransactionAdapter } from "../data/transactionAdapter";

@injectable()
class EquipmentRepository implements IEquipmentRepository {
    async Find(trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        const result = await EquipmentEntity.findAll({ transaction })
        return result as unknown as Equipment[]
    }
    async FindById(id: number, trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        return await EquipmentEntity.findByPk(id, { transaction }) as unknown as Equipment
    }
    async Create(data: Equipment, trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        return await EquipmentEntity.create({ ...data }, { validate: true, transaction }) as unknown as Equipment
    }
    async Update(id: number, data: Equipment, trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        await EquipmentEntity.update(data, { where: { id }, validate: true, transaction })
        return (await EquipmentEntity.findByPk(id, { transaction })) as unknown as Equipment
    }
    async Delete(id: number, trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        const result = await EquipmentEntity.destroy({ where: { id: id }, transaction })
        return result !== 0
    }
    async CountByEquipmentCategoryId(equipmentCategoryId: number, trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        return await EquipmentEntity.count({ where: { equipmentCategoryId }, transaction })
    }
    async DeleteByProjectId(projectId: number, trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        await EquipmentEntity.destroy({ where: { projectId }, transaction })
    }
    async FindIdsByProjectId(projectId: number, trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        const results = await EquipmentEntity.findAll({ where: { projectId }, attributes: ['id'], transaction })
        return results.map(e => e.id)
    }
}
export default EquipmentRepository
