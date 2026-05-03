import { Transaction } from "@/application/unitOfWork/transaction";
import Borrow from "@/domain/models/borrow";
import IBorrowRepository from "@/domain/repositories/iBorrowRepository";
import BorrowEntityMapping from "@/infrastructure/data/entityMapping/borrowEntityMapping";
import { injectable } from "tsyringe";
import { SequelizeTransactionAdapter } from "../data/transactionAdapter";

@injectable()
class BorrowRepository implements IBorrowRepository {

    async Find() {
        const result = await BorrowEntityMapping.findAll()
        return result.map(result => Borrow.rehydrate(result.id, result.equipmentId, result.borrowDate, result.studentId, result.professorId, result.isStillBorrowed, result.returnDate, result.createdAt, result.updatedAt, result.isVisible))
    }
    async FindById(id: number) {
        const result = await BorrowEntityMapping.findByPk(id)
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
}
export default BorrowRepository
