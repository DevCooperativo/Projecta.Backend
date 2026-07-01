import { Transaction } from "@/application/unitOfWork/transaction";
import Researcher from "@/domain/models/researcher";
import IResearcherRepository from "@/domain/repositories/iResearcherRepository";
import ResearcherEntityMapping from "@/infrastructure/data/entityMapping/researcherEntityMappping";
import { injectable } from "tsyringe";
import { SequelizeTransactionAdapter } from "../data/transactionAdapter";
import { throwNormalizedSequelizeError } from "../helpers/sequelizeErrorHandler";

@injectable()
class ResearcherRepository implements IResearcherRepository {
    
    async Find() {
        return await ResearcherEntityMapping.findAll() as unknown as Researcher[]
    }
    async FindById(id: number) {
        return await ResearcherEntityMapping.findByPk(id) as unknown as Researcher
    }
    async Create(data: Researcher, trx?: Transaction) {
        try {
            const transaction = (trx as SequelizeTransactionAdapter)?.trx
            return await ResearcherEntityMapping.create({ ...data }, { transaction }) as unknown as Researcher
        } catch (error) { throwNormalizedSequelizeError(error); throw error }
    }
    async Update(data: Researcher, trx?: Transaction) {
        try {
            const transaction = (trx as SequelizeTransactionAdapter)?.trx
            await ResearcherEntityMapping.update(data, { where: { id: data.id }, transaction })
            return (await ResearcherEntityMapping.findByPk(data.id, { transaction })) as unknown as Researcher
        } catch (error) { throwNormalizedSequelizeError(error); throw error }
    }
    async Delete(id: number, trx?: Transaction) {
        try {
            const transaction = (trx as SequelizeTransactionAdapter)?.trx
            const result = await ResearcherEntityMapping.destroy({ where: { id: id }, transaction })
            return result !== 0
        } catch (error) { throwNormalizedSequelizeError(error); throw error }
    }

    async DeleteByProjectId(projectId: number, trx?: Transaction) {
        try {
            const transaction = (trx as SequelizeTransactionAdapter)?.trx
            await ResearcherEntityMapping.destroy({ where: { projectId }, transaction })
        } catch (error) { throwNormalizedSequelizeError(error); throw error }
    }
}
export default ResearcherRepository
