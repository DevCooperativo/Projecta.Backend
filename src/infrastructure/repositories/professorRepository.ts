import { Transaction } from "@/application/unitOfWork/transaction";
import Professor from "@/domain/models/professor";
import IProfessorRepository from "@/domain/repositories/iProfessorRepository";
import { injectable } from "tsyringe";
import ProfessorEntity from "../data/entityMapping/professorEntityMapping";
import { SequelizeTransactionAdapter } from "../data/transactionAdapter";

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
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        const result = await ProfessorEntity.create({ ...data }, { validate: true, transaction })
        return Professor.rehydrate(result.id, result.name, result.email, result.registration, result.telephone!, result.coordinationId, result.createdAt, result.updatedAt, result.isVisible)
    }
    async Update(id: number, data: Professor, trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        const result = await ProfessorEntity.findByPk(id)
        
        //@ts-expect-error: known problem to delete required field
        delete data.id
        await result?.update({ ...data }, { validate: true, transaction })
        if (!result)
            return null
        return Professor.rehydrate(result.id, result.name, result.email, result.registration, result.telephone!, result.coordinationId, result.createdAt, result.updatedAt, result.isVisible)
    }
    async Delete(id: number, trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        const result = await ProfessorEntity.destroy({ where: { id: id }, transaction })
        return result !== 0
    }

}
export default ProfessorRepository