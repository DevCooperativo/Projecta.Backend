import Administrator from "domain/models/administrator";
import IAdministratorRepository from "domain/repositories/iAdministratorRepository";
import AdministratorEntityMapping from "infrastructure/data/entityMapping/administratorEntityMapping";
import { injectable } from "tsyringe";

@injectable()
class AdministratorRepository implements IAdministratorRepository {
    async FindByEmail(email: string) {
        return await AdministratorEntityMapping.findOne({ where: { email: email } }) as Administrator | null
    }
    async Find() {
        return await AdministratorEntityMapping.findAll() as Administrator[]
    }
    async FindById(id: number) {
        return await AdministratorEntityMapping.findByPk(id) as Administrator
    }
    async Create(data: Administrator) {
        return await AdministratorEntityMapping.create({ ...data }) as Administrator
    }
    async Update(data: Administrator) {
        await AdministratorEntityMapping.update(data, { where: { id: data.id } })
        return (await AdministratorEntityMapping.findByPk(data.id)) as Administrator
    }
    async Delete(id: number) {
        const result = await AdministratorEntityMapping.destroy({ where: { id: id } })
        return result !== 0
    }

}
export default AdministratorRepository