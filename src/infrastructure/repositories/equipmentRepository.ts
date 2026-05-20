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
        const categoryFilter = equipmentCategoryId !== undefined ? 'AND e."equipmentCategoryId" = :equipmentCategoryId' : ''
        const result = await sequelize.query<EquipmentAvailabilityByCategoryDTO>(
            `SELECT
                ec."id" AS "categoryId",
                ec."description" AS "categoryDescription",
                ec."powerSource" AS "categoryPowerSource",
                e."name" AS "equipmentName",
                l."id" AS "laboratoryId",
                l."name" AS "laboratoryName",
                COUNT(DISTINCT e."id")::int AS "totalQuantity",
                COUNT(DISTINCT CASE WHEN b."id" IS NULL THEN e."id" END)::int AS "availableQuantity"
            FROM "equipments" e
            INNER JOIN "equipment_categories" ec ON ec."id" = e."equipmentCategoryId"
            INNER JOIN "laboratories" l ON l."id" = e."laboratoryId"
            LEFT JOIN "borrows" b ON b."equipmentId" = e."id" AND b."isStillBorrowed" = true
            WHERE e."isVisible" = true
              AND ec."isVisible" = true
              AND l."isVisible" = true
              ${categoryFilter}
            GROUP BY ec."id", ec."description", ec."powerSource", e."name", l."id", l."name"
            ORDER BY e."name", ec."description", l."name"`,
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
            Number(item.laboratoryId),
            item.laboratoryName,
            Number(item.totalQuantity),
            Number(item.availableQuantity)
        ))
    }
    async FindAvailabilityByLaboratory(laboratoryId?: number, trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        const laboratoryFilter = laboratoryId !== undefined ? 'AND e."laboratoryId" = :laboratoryId' : ''
        const result = await sequelize.query<EquipmentAvailabilityByLaboratoryDTO>(
            `SELECT
                l."id" AS "laboratoryId",
                l."name" AS "laboratoryName",
                e."name" AS "equipmentName",
                ec."id" AS "categoryId",
                ec."description" AS "categoryDescription",
                ec."powerSource" AS "categoryPowerSource",
                COUNT(DISTINCT e."id")::int AS "totalQuantity",
                COUNT(DISTINCT CASE WHEN b."id" IS NULL THEN e."id" END)::int AS "availableQuantity"
            FROM "equipments" e
            INNER JOIN "laboratories" l ON l."id" = e."laboratoryId"
            INNER JOIN "equipment_categories" ec ON ec."id" = e."equipmentCategoryId"
            LEFT JOIN "borrows" b ON b."equipmentId" = e."id" AND b."isStillBorrowed" = true
            WHERE e."isVisible" = true
              AND l."isVisible" = true
              AND ec."isVisible" = true
              ${laboratoryFilter}
            GROUP BY l."id", l."name", e."name", ec."id", ec."description", ec."powerSource"
            ORDER BY e."name", l."name", ec."description"`,
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
            Number(item.categoryId),
            item.categoryDescription,
            item.categoryPowerSource,
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
