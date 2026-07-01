import { Transaction } from "@/application/unitOfWork/transaction";
import Student from "@/domain/models/student";
import IStudentRepository from "@/domain/repositories/iStudentRepository";
import { injectable } from "tsyringe";
import StudentEntity from "../data/entityMapping/studentEntityMapping";
import { SequelizeTransactionAdapter } from "../data/transactionAdapter";
import { throwNormalizedSequelizeError } from "../helpers/sequelizeErrorHandler";

@injectable()
class StudentRepository implements IStudentRepository {
    async FindByEmail(email: string) {
        const result = await StudentEntity.findOne({
            where: {
                email
            }
        })
        if (!result)
            return null
        return Student.rehydrate(result.id, result.name, result.email, result.registration, result.birthdate, result.term, result.shift, result.createdAt, result.updatedAt, result.isVisible) as Student
    }
    async Find() {
        const result = await StudentEntity.findAll()
        if (result.length === 0)
            return []
        return result.map(r => Student.rehydrate(r.id, r.name, r.email, r.registration, r.birthdate, r.term, r.shift, r.createdAt, r.updatedAt, r.isVisible)) as Student[]
    }
    async FindById(id: number) {
        const result = await StudentEntity.findByPk(id)
        if (!result)
            return null
        return Student.rehydrate(result.id, result.name, result.email, result.registration, result.birthdate, result.term, result.shift, result.createdAt, result.updatedAt, result.isVisible) as Student
    }
    async Create(data: Student, trx?: Transaction) {
        try {
            const transaction = (trx as SequelizeTransactionAdapter)?.trx
            const result = await StudentEntity.create({ ...data }, { validate: true, transaction })
            return Student.rehydrate(result.id, result.name, result.email, result.registration, result.birthdate, result.term, result.shift, result.createdAt, result.updatedAt, result.isVisible) as Student
        } catch (error) { throwNormalizedSequelizeError(error); throw error }
    }
    async Update(id: number, data: Student, trx?: Transaction) {
        try {
            const transaction = (trx as SequelizeTransactionAdapter)?.trx
            const { id: _, ...treatedData } = data
            await StudentEntity.update(treatedData, { where: { id }, validate: true, transaction })
            const result = await StudentEntity.findByPk(id, { transaction })
            if (!result)
                return null
            return Student.rehydrate(result.id, result.name, result.email, result.registration, result.birthdate, result.term, result.shift, result.createdAt, result.updatedAt, result.isVisible) as Student
        } catch (error) { throwNormalizedSequelizeError(error); throw error }
    }

    async Delete(id: number, trx?: Transaction) {
        try {
            const transaction = (trx as SequelizeTransactionAdapter)?.trx
            const result = await StudentEntity.destroy({ where: { id: id }, transaction })
            return result !== 0
        } catch (error) { throwNormalizedSequelizeError(error); throw error }
    }

}
export default StudentRepository