import { Transaction } from "@/application/unitOfWork/transaction";
import Administrator from "@/domain/models/administrator";
import IAdministratorRepository from "@/domain/repositories/iAdministratorRepository";
import AdministratorEntityMapping from "@/infrastructure/data/entityMapping/administratorEntityMapping";
import { injectable } from "tsyringe";
import { SequelizeTransactionAdapter } from "../data/transactionAdapter";
import { throwNormalizedSequelizeError } from "../helpers/sequelizeErrorHandler";

@injectable()
class AdministratorRepository implements IAdministratorRepository {
    constructor(
    ) { }
    async FindByEmail(email: string) {
        const result = await AdministratorEntityMapping.findOne({ where: { email: email } })
        if (!result) return null
        return Administrator.rehydrate(result.id, result.name, result.email, result.createdAt, result.updatedAt, result.isVisible) as Administrator
    }
    async Find() {
        const results = await AdministratorEntityMapping.findAll()
        return results.map(result => Administrator.rehydrate(result.id, result.name, result.email, result.createdAt, result.updatedAt, result.isVisible)) as Administrator[]
    }
    async FindById(id: number) {
        const result = await AdministratorEntityMapping.findByPk(id)
        if (!result) return null
        return Administrator.rehydrate(result.id, result.name, result.email, result.createdAt, result.updatedAt, result.isVisible) as Administrator
    }
    async Create(data: Administrator, trx?: Transaction) {
        try {
            const transaction = (trx as SequelizeTransactionAdapter)?.trx
            const result = await AdministratorEntityMapping.create({ ...data }, { transaction })
            return Administrator.rehydrate(result.id, result.name, result.email, result.createdAt, result.updatedAt, result.isVisible) as Administrator
        } catch (error) { throwNormalizedSequelizeError(error); throw error }
    }
    async Update(data: Administrator, trx?: Transaction) {
        try {
            const transaction = (trx as SequelizeTransactionAdapter)?.trx
            const { id, ...treatedData } = data
            await AdministratorEntityMapping.update(treatedData, { where: { id }, transaction })
            const result = await AdministratorEntityMapping.findByPk(data.id, { transaction })
            if (!result) return null
            return Administrator.rehydrate(result.id, result.name, result.email, result.createdAt, result.updatedAt, result.isVisible) as Administrator
        } catch (error) { throwNormalizedSequelizeError(error); throw error }
    }
    async Delete(id: number, trx?: Transaction) {
        try {
            const transaction = (trx as SequelizeTransactionAdapter)?.trx
            const result = await AdministratorEntityMapping.destroy({ where: { id: id }, transaction })
            return result !== 0
        } catch (error) { throwNormalizedSequelizeError(error); throw error }
    }

}
export default AdministratorRepository