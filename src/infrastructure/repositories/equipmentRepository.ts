import { Op } from "sequelize";
import { Transaction } from "@/application/unitOfWork/transaction";
import Equipment from "@/domain/models/equipment";
import IEquipmentRepository from "@/domain/repositories/iEquipmentRepository";
import { injectable } from "tsyringe";
import EquipmentEntity from "../data/entityMapping/equipmentEntity";
import { SequelizeTransactionAdapter } from "../data/transactionAdapter";

@injectable()
class EquipmentRepository implements IEquipmentRepository {
    async Find() {
        const result = await EquipmentEntity.findAll()
        return result as Equipment[]
    }
    async FindById(id: number) {
        return await EquipmentEntity.findByPk(id) as Equipment
    }
    async Create(data: Equipment, trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        return await EquipmentEntity.create({ ...data }, { validate: true, transaction }) as Equipment
    }
    async Update(id: number, data: Equipment, trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        await EquipmentEntity.update(data, { where: { id }, validate: true, transaction })
        return (await EquipmentEntity.findByPk(id, { transaction })) as Equipment
    }
    async Delete(id: number, trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        const result = await EquipmentEntity.destroy({ where: { id: id }, transaction })
        return result !== 0
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