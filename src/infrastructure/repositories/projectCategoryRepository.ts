import { Transaction } from "@/application/unitOfWork/transaction";
import ProjectCategory from "@/domain/models/projectCategory";
import IProjectCategoryRepository from "@/domain/repositories/iProjectCategoryRepository";
import ProjectCategoryEntityMapping from "@/infrastructure/data/entityMapping/projectCategoryEntityMapping";
import { injectable } from "tsyringe";
import { SequelizeTransactionAdapter } from "../data/transactionAdapter";

@injectable()
class ProjectCategoryRepository implements IProjectCategoryRepository {

    async Find() {
        return await ProjectCategoryEntityMapping.findAll() as ProjectCategory[]
    }
    async FindById(id: number) {
        return await ProjectCategoryEntityMapping.findByPk(id) as ProjectCategory
    }
    async Create(data: ProjectCategory, trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        return await ProjectCategoryEntityMapping.create({ ...data }, { transaction }) as ProjectCategory
    }
    async Update(id: number, data: ProjectCategory, trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        await ProjectCategoryEntityMapping.update(data, { where: { id }, validate: true, transaction })
        return (await ProjectCategoryEntityMapping.findByPk(id, { transaction })) as ProjectCategory
    }
    async Delete(id: number, trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        const result = await ProjectCategoryEntityMapping.destroy({ where: { id: id }, transaction })
        return result !== 0
    }

}
export default ProjectCategoryRepository