import { Op, WhereOptions } from "sequelize";
import { Transaction } from "@/application/unitOfWork/transaction";
import Borrow from "@/domain/models/borrow";
import IBorrowRepository from "@/domain/repositories/iBorrowRepository";
import { BorrowFilterSpec } from "@/domain/repositories/borrowFilterSpec";
import BorrowEntityMapping from "@/infrastructure/data/entityMapping/borrowEntityMapping";
import EquipmentEntity from "@/infrastructure/data/entityMapping/equipmentEntity";
import { injectable } from "tsyringe";
import { SequelizeTransactionAdapter } from "../data/transactionAdapter";

@injectable()
class BorrowRepository implements IBorrowRepository {

    async Find(spec?: BorrowFilterSpec) {
        const where: WhereOptions = {}
        const include = []

        if (spec?.q) {
            include.push({
                model: EquipmentEntity,
                as: 'Equipments',
                where: { name: { [Op.iLike]: `%${spec.q}%` } },
                required: true,
                attributes: []
            })
        }

        if (spec?.borrowerId && spec?.borrowerType) {
            if (spec.borrowerType === 'professor') (where as Record<string, unknown>).professorId = spec.borrowerId
            else (where as Record<string, unknown>).studentId = spec.borrowerId
        }

        if (spec?.startPeriod || spec?.endPeriod) {
            const dateFilter: Record<symbol, Date> = {}
            if (spec.startPeriod) dateFilter[Op.gte] = spec.startPeriod
            if (spec.endPeriod) dateFilter[Op.lte] = spec.endPeriod
            ;(where as Record<string, unknown>).borrowDate = dateFilter
        }

        const result = await BorrowEntityMapping.findAll({ where, include })
        return result.map(result => Borrow.rehydrate(result.id, result.equipmentId, result.borrowDate, result.studentId, result.professorId, result.isStillBorrowed, result.returnDate, result.createdAt, result.updatedAt, result.isVisible))
    }
    async FindById(id: number, trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        const result = await BorrowEntityMapping.findByPk(id, { transaction })
        if (!result) return null
        return Borrow.rehydrate(result.id, result.equipmentId, result.borrowDate, result.studentId, result.professorId, result.isStillBorrowed, result.returnDate, result.createdAt, result.updatedAt, result.isVisible)
    }
    async Create(data: Borrow, trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        const result = await BorrowEntityMapping.create({ ...data }, { transaction })
        return Borrow.rehydrate(result.id, result.equipmentId, result.borrowDate, result.studentId, result.professorId, result.isStillBorrowed, result.returnDate, result.createdAt, result.updatedAt, result.isVisible)
    }
    async Update(id: number, data: Borrow, trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        const { id: _, ...treatedData } = data
        await BorrowEntityMapping.update({ ...treatedData }, { where: { id }, transaction })
        const result = await BorrowEntityMapping.findByPk(id, { transaction })
        if (!result) return null
        return Borrow.rehydrate(result.id, result.equipmentId, result.borrowDate, result.studentId, result.professorId, result.isStillBorrowed, result.returnDate, result.createdAt, result.updatedAt, result.isVisible)
    }
    async Delete(id: number, trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        const result = await BorrowEntityMapping.destroy({ where: { id }, transaction })
        return result !== 0
    }
    async CountActiveByEquipmentId(equipmentId: number, trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        return await BorrowEntityMapping.count({ where: { equipmentId, isStillBorrowed: true }, transaction })
    }
    async DeleteByEquipmentIds(equipmentIds: number[], trx?: Transaction) {
        if (equipmentIds.length === 0) return
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        await BorrowEntityMapping.destroy({ where: { equipmentId: { [Op.in]: equipmentIds } }, transaction })
    }
}
export default BorrowRepository
