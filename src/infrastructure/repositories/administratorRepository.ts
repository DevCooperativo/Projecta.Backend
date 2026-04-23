import { Transaction } from "@/application/unitOfWork/transaction";
import Administrator from "@/domain/models/administrator";
import IAdministratorRepository from "@/domain/repositories/iAdministratorRepository";
import AdministratorEntityMapping from "@/infrastructure/data/entityMapping/administratorEntityMapping";
import { injectable } from "tsyringe";
import { SequelizeTransactionAdapter } from "../data/transactionAdapter";

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

        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        const result = await AdministratorEntityMapping.create({ ...data }, { transaction })
        return Administrator.rehydrate(result.id, result.name, result.email, result.createdAt, result.updatedAt, result.isVisible) as Administrator
    }
    async Update(data: Administrator, trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        await AdministratorEntityMapping.update(data, { where: { id: data.id }, transaction })
        const result = await AdministratorEntityMapping.findByPk(data.id, { transaction })
        if (!result) return null
        return Administrator.rehydrate(result.id, result.name, result.email, result.createdAt, result.updatedAt, result.isVisible) as Administrator
    }
    async Delete(id: number, trx?: Transaction) {
        const transaction = (trx as SequelizeTransactionAdapter)?.trx
        const result = await AdministratorEntityMapping.destroy({ where: { id: id }, transaction })
        return result !== 0
    }

}
export default AdministratorRepository