import { Op } from "sequelize";
import { Transaction } from "@/application/unitOfWork/transaction";
import Project from "@/domain/models/project";
import IProjectRepository from "@/domain/repositories/iProjectRepository";
import ProjectEntityMapping from "@/infrastructure/data/entityMapping/projectEntityMapping";
import { injectable } from "tsyringe";
import { SequelizeTransactionAdapter } from "../data/transactionAdapter";
import LaboratoryEntity from "../data/entityMapping/laboratoryEntity";
import ProjectCategoryEntityMapping from "../data/entityMapping/projectCategoryEntityMapping";
import CoordinatorEntityMapping from "../data/entityMapping/coordinatorEntityMapping";
import ResearcherEntityMapping from "../data/entityMapping/researcherEntityMappping";

@injectable()
class ProjectRepository implements IProjectRepository {

    async Find(filters?: { categoryId?: number; laboratoryId?: number; name?: string }, trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        const where: Record<string, unknown> = {}
        if (filters?.categoryId) where.projectCategoryId = filters.categoryId
        if (filters?.laboratoryId) where.laboratoryId = filters.laboratoryId
        if (filters?.name) where.name = { [Op.iLike]: `%${filters.name}%` }
        return await ProjectEntityMapping.findAll({
            where,
            include: [
                { model: LaboratoryEntity, attributes: ['id', 'name'], as: 'Laboratories' },
                { model: ProjectCategoryEntityMapping, attributes: ['id', 'name'], as: 'ProjectCategories' },
                { model: CoordinatorEntityMapping, attributes: ['id'], as: 'Coordinators' },
                { model: ResearcherEntityMapping, attributes: ['id'], as: 'Researchers' },
            ],
            order: [['name', 'ASC']],
            transaction
        }) as unknown as Project[]
    }

    async FindById(id: number, trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        return await ProjectEntityMapping.findByPk(id, { transaction }) as unknown as Project
    }

    async CountByLaboratoryId(laboratoryId: number) {
        return await ProjectEntityMapping.count({ where: { laboratoryId } })
    }

    async CountByProjectCategoryId(projectCategoryId: number, trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        return await ProjectEntityMapping.count({ where: { projectCategoryId }, transaction })
    }

    async Create(data: Project, trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        return await ProjectEntityMapping.create({ ...data }, { transaction }) as unknown as Project
    }

    async Update(data: Project, trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        await ProjectEntityMapping.update(
            { name: data.name, description: data.description, startDate: data.startDate, endDate: data.endDate, status: data.status, laboratoryId: data.laboratoryId, projectCategoryId: data.projectCategoryId },
            { where: { id: data.id }, transaction }
        )
        return (await ProjectEntityMapping.findByPk(data.id, { transaction })) as unknown as Project
    }

    async Delete(id: number, trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        const result = await ProjectEntityMapping.destroy({ where: { id: id }, transaction })
        return result !== 0
    }
}

export default ProjectRepository
