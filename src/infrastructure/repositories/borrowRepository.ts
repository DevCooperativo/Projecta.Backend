import { Op, WhereOptions } from "sequelize";
import { Transaction } from "@/application/unitOfWork/transaction";
import Borrow from "@/domain/models/borrow";
import IBorrowRepository from "@/domain/repositories/iBorrowRepository";
import { BorrowFilterSpec } from "@/domain/repositories/borrowFilterSpec";
import BorrowEntityMapping from "@/infrastructure/data/entityMapping/borrowEntityMapping";
import EquipmentEntity from "@/infrastructure/data/entityMapping/equipmentEntity";
import StudentEntityMapping from "@/infrastructure/data/entityMapping/studentEntityMapping";
import ProfessorEntityMapping from "@/infrastructure/data/entityMapping/professorEntityMapping";
import { injectable } from "tsyringe";
import { SequelizeTransactionAdapter } from "../data/transactionAdapter";
import { throwNormalizedSequelizeError } from "../helpers/sequelizeErrorHandler";

@injectable()
class BorrowRepository implements IBorrowRepository {

    async Find(spec?: BorrowFilterSpec) {
        const where: WhereOptions = {}
        const include: object[] = [
            { model: StudentEntityMapping, as: 'Students', required: false, attributes: ['id', 'name'] },
            { model: ProfessorEntityMapping, as: 'Professors', required: false, attributes: ['id', 'name'] },
        ]

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
        return result.map(row => {
            const borrow = Borrow.rehydrate(row.id, row.equipmentId, row.borrowDate, row.studentId, row.professorId, row.isStillBorrowed, row.returnDate, row.createdAt, row.updatedAt, row.isVisible)
            borrow.studentName = row.Students?.name
            borrow.professorName = row.Professors?.name
            return borrow
        })
    }
    async FindById(id: number, trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        const borrowerIncludes = [
            { model: StudentEntityMapping, as: 'Students', required: false, attributes: ['id', 'name'] },
            { model: ProfessorEntityMapping, as: 'Professors', required: false, attributes: ['id', 'name'] },
        ]
        const result = await BorrowEntityMapping.findByPk(id, { transaction, include: borrowerIncludes })
        if (!result) return null
        const borrow = Borrow.rehydrate(result.id, result.equipmentId, result.borrowDate, result.studentId, result.professorId, result.isStillBorrowed, result.returnDate, result.createdAt, result.updatedAt, result.isVisible)
        borrow.studentName = result.Students?.name
        borrow.professorName = result.Professors?.name
        return borrow
    }
    async Create(data: Borrow, trx?: Transaction) {
        try {
            const transaction = (trx as SequelizeTransactionAdapter)?.trx
            const borrowerIncludes = [
                { model: StudentEntityMapping, as: 'Students', required: false, attributes: ['id', 'name'] },
                { model: ProfessorEntityMapping, as: 'Professors', required: false, attributes: ['id', 'name'] },
            ]
            const created = await BorrowEntityMapping.create({ ...data }, { transaction })
            const result = await BorrowEntityMapping.findByPk(created.id, { transaction, include: borrowerIncludes })
            if (!result) return null
            const borrow = Borrow.rehydrate(result.id, result.equipmentId, result.borrowDate, result.studentId, result.professorId, result.isStillBorrowed, result.returnDate, result.createdAt, result.updatedAt, result.isVisible)
            borrow.studentName = result.Students?.name
            borrow.professorName = result.Professors?.name
            return borrow
        } catch (error) { throwNormalizedSequelizeError(error); throw error }
    }
    async Update(id: number, data: Borrow, trx?: Transaction) {
        try {
            const transaction = (trx as SequelizeTransactionAdapter)?.trx
            const borrowerIncludes = [
                { model: StudentEntityMapping, as: 'Students', required: false, attributes: ['id', 'name'] },
                { model: ProfessorEntityMapping, as: 'Professors', required: false, attributes: ['id', 'name'] },
            ]
            const { id: _, ...treatedData } = data
            await BorrowEntityMapping.update({ ...treatedData }, { where: { id }, transaction })
            const result = await BorrowEntityMapping.findByPk(id, { transaction, include: borrowerIncludes })
            if (!result) return null
            const borrow = Borrow.rehydrate(result.id, result.equipmentId, result.borrowDate, result.studentId, result.professorId, result.isStillBorrowed, result.returnDate, result.createdAt, result.updatedAt, result.isVisible)
            borrow.studentName = result.Students?.name
            borrow.professorName = result.Professors?.name
            return borrow
        } catch (error) { throwNormalizedSequelizeError(error); throw error }
    }
    async Delete(id: number, trx?: Transaction) {
        try {
            const transaction = (trx as SequelizeTransactionAdapter)?.trx
            const result = await BorrowEntityMapping.destroy({ where: { id }, transaction })
            return result !== 0
        } catch (error) { throwNormalizedSequelizeError(error); throw error }
    }
    async CountActiveByEquipmentId(equipmentId: number, trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        return await BorrowEntityMapping.count({ where: { equipmentId, isStillBorrowed: true }, transaction })
    }
    async DeleteByEquipmentIds(equipmentIds: number[], trx?: Transaction) {
        if (equipmentIds.length === 0) return
        try {
            const transaction = (trx as SequelizeTransactionAdapter)?.trx
            await BorrowEntityMapping.destroy({ where: { equipmentId: { [Op.in]: equipmentIds } }, transaction })
        } catch (error) { throwNormalizedSequelizeError(error); throw error }
    }
}
export default BorrowRepository
