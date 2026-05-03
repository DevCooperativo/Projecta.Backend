import { Transaction } from "@/application/unitOfWork/transaction";
import Coordinator from "@/domain/models/coordinator";
import ICoordinatorRepository from "@/domain/repositories/iCoordinatorRepository";
import { injectable } from "tsyringe";
import CoordinatorEntityMapping from "../data/entityMapping/coordinatorEntityMapping";
import { SequelizeTransactionAdapter } from "../data/transactionAdapter";

@injectable()
class CoordinatorRepository implements ICoordinatorRepository {

    async Find() {
        return await CoordinatorEntityMapping.findAll() as unknown as Coordinator[]
    }

    async FindById(id: number) {
        return await CoordinatorEntityMapping.findByPk(id) as unknown as Coordinator
    }

    async FindByProjectId(projectId: number, trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        return await CoordinatorEntityMapping.findAll({ where: { projectId }, transaction }) as unknown as Coordinator[]
    }

    async Create(data: Coordinator, trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        return await CoordinatorEntityMapping.create({ ...data }, { transaction }) as unknown as Coordinator
    }

    async Update(data: Coordinator, trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        await CoordinatorEntityMapping.update(data, { where: { id: data.id }, transaction })
        return (await CoordinatorEntityMapping.findByPk(data.id, { transaction })) as unknown as Coordinator
    }

    async CountByProfessorId(professorId: number) {
        return await CoordinatorEntityMapping.count({ where: { professorId } })
    }

    async Delete(id: number, trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        const result = await CoordinatorEntityMapping.destroy({ where: { id: id }, transaction })
        return result !== 0
    }

    async DeleteByProjectId(projectId: number, trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        await CoordinatorEntityMapping.destroy({ where: { projectId }, transaction })
    }
}

export default CoordinatorRepository
