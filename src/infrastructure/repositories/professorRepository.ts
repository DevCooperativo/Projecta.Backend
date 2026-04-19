import { Transaction } from "@/application/unitOfWork/transaction";
import Professor from "@/domain/models/professor";
import IProfessorRepository from "@/domain/repositories/iProfessorRepository";
import { injectable } from "tsyringe";
import ProfessorEntity from "../data/entityMapping/professorEntityMapping";
import { SequelizeTransactionAdapter } from "../data/transactionAdapter";

@injectable()
class ProfessorRepository implements IProfessorRepository {
    async FindByEmail(email: string) {
        return await ProfessorEntity.findOne({
            where: {
                email
            }
        }) as Professor
    }
    async Find() {
        const result = await ProfessorEntity.findAll()
        return result as Professor[]
    }
    async FindById(id: number) {
        return await ProfessorEntity.findByPk(id) as Professor
    }
    async Create(data: Professor, trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        return await ProfessorEntity.create({ ...data }, { validate: true, transaction }) as Professor
    }
    async Update(id: number, data: Professor, trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        await ProfessorEntity.update(data, { where: { id }, validate: true, transaction })
        return (await ProfessorEntity.findByPk(id, { transaction })) as Professor
    }
    async Delete(id: number, trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        const result = await ProfessorEntity.destroy({ where: { id: id }, transaction })
        return result !== 0
    }

}
export default ProfessorRepository