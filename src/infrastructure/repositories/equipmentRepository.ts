import { QueryTypes } from "sequelize";
import { EquipmentAvailabilityByCategoryDTO } from "@/application/dtos/equipmentAvailabilityByCategoryDTO";
import { EquipmentAvailabilityByLaboratoryDTO } from "@/application/dtos/equipmentAvailabilityByLaboratoryDTO";
import { Transaction } from "@/application/unitOfWork/transaction";
import Equipment from "@/domain/models/equipment";
import IEquipmentRepository from "@/domain/repositories/iEquipmentRepository";
import { injectable } from "tsyringe";
import EquipmentEntity from "../data/entityMapping/equipmentEntity";
import sequelize from "../data/sequelize";
import { SequelizeTransactionAdapter } from "../data/transactionAdapter";

@injectable()
class EquipmentRepository implements IEquipmentRepository {
    async Find(trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        const result = await EquipmentEntity.findAll({ transaction })
        return result as unknown as Equipment[]
    }
    async FindById(id: number, trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        return await EquipmentEntity.findByPk(id, { transaction }) as unknown as Equipment
    }
    async FindAvailabilityByCategory(equipmentCategoryId?: number, trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        // Relatorio por categoria: aplica o filtro somente quando uma categoria for informada.
        const categoryFilter = equipmentCategoryId !== undefined ? 'AND e."equipmentCategoryId" = :equipmentCategoryId' : ''
        const result = await sequelize.query<EquipmentAvailabilityByCategoryDTO>(
            `SELECT
                ec."id" AS "categoryId",
                ec."description" AS "categoryDescription",
                ec."powerSource" AS "categoryPowerSource",
                e."name" AS "equipmentName",
                (COUNT(DISTINCT b."id") > 0) AS "isBorrowed",
                p."id" AS "projectId",
                p."name" AS "projectName",
                l."id" AS "laboratoryId",
                l."name" AS "laboratoryName",
                COUNT(DISTINCT e."id")::int AS "totalQuantity",
                COUNT(DISTINCT CASE WHEN b."id" IS NULL THEN e."id" END)::int AS "availableQuantity"
            FROM "equipments" e
            INNER JOIN "equipment_categories" ec ON ec."id" = e."equipmentCategoryId"
            INNER JOIN "projects" p ON p."id" = e."projectId"
            INNER JOIN "laboratories" l ON l."id" = e."laboratoryId"
            -- O LEFT JOIN traz emprestimos ativos; se nao existir registro em b, o equipamento esta disponivel.
            LEFT JOIN "borrows" b ON b."equipmentId" = e."id" AND b."isStillBorrowed" = true
            WHERE e."isVisible" = true
              AND ec."isVisible" = true
              AND p."isVisible" = true
              AND l."isVisible" = true
              ${categoryFilter}
            GROUP BY ec."id", ec."description", ec."powerSource", e."name", p."id", p."name", l."id", l."name"
            ORDER BY e."name", ec."description", p."name", l."name"`,
            {
                replacements: { equipmentCategoryId },
                type: QueryTypes.SELECT,
                transaction
            }
        )
        return result.map(item => new EquipmentAvailabilityByCategoryDTO(
            Number(item.categoryId),
            item.categoryDescription,
            item.categoryPowerSource,
            item.equipmentName,
            Boolean(item.isBorrowed),
            Number(item.projectId),
            item.projectName,
            Number(item.laboratoryId),
            item.laboratoryName,
            Number(item.totalQuantity),
            Number(item.availableQuantity)
        ))
    }
    async FindAvailabilityByLaboratory(laboratoryId?: number, trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        // Relatorio por laboratorio: aplica o filtro somente quando um laboratorio for informado.
        const laboratoryFilter = laboratoryId !== undefined ? 'AND e."laboratoryId" = :laboratoryId' : ''
        const result = await sequelize.query<EquipmentAvailabilityByLaboratoryDTO>(
            `SELECT
                l."id" AS "laboratoryId",
                l."name" AS "laboratoryName",
                e."name" AS "equipmentName",
                (COUNT(DISTINCT b."id") > 0) AS "isBorrowed",
                ec."id" AS "categoryId",
                ec."description" AS "categoryDescription",
                ec."powerSource" AS "categoryPowerSource",
                p."id" AS "projectId",
                p."name" AS "projectName",
                COUNT(DISTINCT e."id")::int AS "totalQuantity",
                COUNT(DISTINCT CASE WHEN b."id" IS NULL THEN e."id" END)::int AS "availableQuantity"
            FROM "equipments" e
            INNER JOIN "laboratories" l ON l."id" = e."laboratoryId"
            INNER JOIN "equipment_categories" ec ON ec."id" = e."equipmentCategoryId"
            INNER JOIN "projects" p ON p."id" = e."projectId"
            -- O LEFT JOIN traz emprestimos ativos; se nao existir registro em b, o equipamento esta disponivel.
            LEFT JOIN "borrows" b ON b."equipmentId" = e."id" AND b."isStillBorrowed" = true
            WHERE e."isVisible" = true
              AND l."isVisible" = true
              AND ec."isVisible" = true
              AND p."isVisible" = true
              ${laboratoryFilter}
            GROUP BY l."id", l."name", e."name", ec."id", ec."description", ec."powerSource", p."id", p."name"
            ORDER BY e."name", l."name", ec."description", p."name"`,
            {
                replacements: { laboratoryId },
                type: QueryTypes.SELECT,
                transaction
            }
        )
        return result.map(item => new EquipmentAvailabilityByLaboratoryDTO(
            Number(item.laboratoryId),
            item.laboratoryName,
            item.equipmentName,
            Boolean(item.isBorrowed),
            Number(item.categoryId),
            item.categoryDescription,
            item.categoryPowerSource,
            Number(item.projectId),
            item.projectName,
            Number(item.totalQuantity),
            Number(item.availableQuantity)
        ))
    }
    async Create(data: Equipment, trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        return await EquipmentEntity.create({ ...data }, { validate: true, transaction }) as unknown as Equipment
    }
    async Update(id: number, data: Equipment, trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        await EquipmentEntity.update(data, { where: { id }, validate: true, transaction })
        return (await EquipmentEntity.findByPk(id, { transaction })) as unknown as Equipment
    }
    async Delete(id: number, trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        const result = await EquipmentEntity.destroy({ where: { id: id }, transaction })
        return result !== 0
    }
    async CountByEquipmentCategoryId(equipmentCategoryId: number, trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        return await EquipmentEntity.count({ where: { equipmentCategoryId }, transaction })
    }
    async DeleteByProjectId(projectId: number, trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        await EquipmentEntity.destroy({ where: { projectId }, transaction })
    }
    async FindIdsByProjectId(projectId: number, trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        const results = await EquipmentEntity.findAll({ where: { projectId }, attributes: ['id'], transaction })
        return results.map(e => e.id)
    }
}
export default EquipmentRepository
