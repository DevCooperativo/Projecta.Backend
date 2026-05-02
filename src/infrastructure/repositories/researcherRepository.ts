import { Transaction } from "@/application/unitOfWork/transaction";
import Researcher from "@/domain/models/researcher";
import IResearcherRepository from "@/domain/repositories/iResearcherRepository";
import ResearcherEntityMapping from "@/infrastructure/data/entityMapping/researcherEntityMappping";
import { injectable } from "tsyringe";
import { SequelizeTransactionAdapter } from "../data/transactionAdapter";

@injectable()
class ResearcherRepository implements IResearcherRepository {
    
    async Find() {
        return await ResearcherEntityMapping.findAll() as Researcher[]
    }
    async FindById(id: number) {
        return await ResearcherEntityMapping.findByPk(id) as Researcher
    }
    async Create(data: Researcher, trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        return await ResearcherEntityMapping.create({ ...data }, { transaction }) as Researcher
    }
    async Update(data: Researcher, trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        await ResearcherEntityMapping.update(data, { where: { id: data.id }, transaction })
        return (await ResearcherEntityMapping.findByPk(data.id, { transaction })) as Researcher
    }
    async Delete(id: number, trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        const result = await ResearcherEntityMapping.destroy({ where: { id: id }, transaction })
        return result !== 0
    }

    async DeleteByProjectId(projectId: number, trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        await ResearcherEntityMapping.destroy({ where: { projectId }, transaction })
    }
}
export default ResearcherRepository
