import { Transaction } from "@/application/unitOfWork/transaction";
import Professor from "@/domain/models/professor";
import IProfessorRepository from "@/domain/repositories/iProfessorRepository";
import { injectable } from "tsyringe";
import ProfessorEntity from "../data/entityMapping/professorEntityMapping";
import { SequelizeTransactionAdapter } from "../data/transactionAdapter";
import { throwNormalizedSequelizeError } from "../helpers/sequelizeErrorHandler";

@injectable()
class ProfessorRepository implements IProfessorRepository {
    async FindByEmail(email: string) {
        const result = await ProfessorEntity.findOne({
            where: {
                email
            }
        })
        if (!result)
            return null
        return Professor.rehydrate(result.id, result.name, result.email, result.registration, result.telephone, result.coordinationId, result.createdAt, result.updatedAt)
    }
    async Find() {
        const result = await ProfessorEntity.findAll()
        return result.map(r => Professor.rehydrate(r.id, r.name, r.email, r.registration, r.telephone, r.coordinationId, r.createdAt, r.updatedAt, r.isVisible))
    }
    async FindById(id: number) {
        const result = await ProfessorEntity.findByPk(id)
        if (!result)
            return null
        return Professor.rehydrate(result.id, result.name, result.email, result.registration, result.telephone!, result.coordinationId, result.createdAt, result.updatedAt, result.isVisible)
    }
    async Create(data: Professor, trx?: Transaction) {
        try {
            const transaction = (trx as SequelizeTransactionAdapter)?.trx
            const result = await ProfessorEntity.create({ ...data }, { validate: true, transaction })
            return Professor.rehydrate(result.id, result.name, result.email, result.registration, result.telephone!, result.coordinationId, result.createdAt, result.updatedAt, result.isVisible)
        } catch (error) { throwNormalizedSequelizeError(error); throw error }
    }
    async Update(id: number, data: Professor, trx?: Transaction) {
        try {
            const transaction = (trx as SequelizeTransactionAdapter)?.trx
            const result = await ProfessorEntity.findByPk(id)
            if (!result)
                return null
            const { id: _, ...treatedData } = data
            await result.update({ ...treatedData }, { validate: true, transaction })
            return Professor.rehydrate(result.id, result.name, result.email, result.registration, result.telephone!, result.coordinationId, result.createdAt, result.updatedAt, result.isVisible)
        } catch (error) { throwNormalizedSequelizeError(error); throw error }
    }
    async Delete(id: number, trx?: Transaction) {
        try {
            const transaction = (trx as SequelizeTransactionAdapter)?.trx
            const result = await ProfessorEntity.destroy({ where: { id: id }, transaction })
            return result !== 0
        } catch (error) { throwNormalizedSequelizeError(error); throw error }
    }
    async CountByCoordinationId(coordinationId: number) {
        return await ProfessorEntity.count({ where: { coordinationId } })
    }
}
export default ProfessorRepository