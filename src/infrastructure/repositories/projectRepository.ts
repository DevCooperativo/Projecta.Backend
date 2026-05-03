import { Transaction } from "@/application/unitOfWork/transaction";
import Project from "@/domain/models/project";
import IProjectRepository from "@/domain/repositories/iProjectRepository";
import ProjectEntityMapping from "@/infrastructure/data/entityMapping/projectEntityMapping";
import { injectable } from "tsyringe";
import { SequelizeTransactionAdapter } from "../data/transactionAdapter";

@injectable()
class ProjectRepository implements IProjectRepository {
    
    async Find(trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        return await ProjectEntityMapping.findAll({ transaction }) as unknown as Project[]
    }
    async FindById(id: number, trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        return await ProjectEntityMapping.findByPk(id, { transaction }) as unknown as Project
    }
    async Create(data: Project, trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        return await ProjectEntityMapping.create({ ...data }, { transaction }) as unknown as Project
    }
    async Update(data: Project, trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        await ProjectEntityMapping.update(data, { where: { id: data.id }, transaction })
        return (await ProjectEntityMapping.findByPk(data.id, { transaction })) as unknown as Project
    }
    async Delete(id: number, trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        const result = await ProjectEntityMapping.destroy({ where: { id: id }, transaction })
        return result !== 0
    }

}
export default ProjectRepository
