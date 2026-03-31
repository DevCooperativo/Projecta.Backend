import Professor from "domain/models/professor";
import IProfessorRepository from "domain/repositories/iProfessorRepository";
import { injectable } from "tsyringe";
import ProfessorEntity from "../data/entityMapping/professorEntityMapping";

@injectable()
class ProfessorRepository implements IProfessorRepository {
    async FindByEmail(email: string) {
        return await ProfessorEntity.findOne({
            where: {
                email
            }
        }) as Professor
    }
    async Find() {
        const result = await ProfessorEntity.findAll()
        return result as Professor[]
    }
    async FindById(id: number) {
        return await ProfessorEntity.findByPk(id) as Professor
    }
    async Create(data: Professor) {
        return await ProfessorEntity.create({ ...data }, { validate: true }) as Professor
    }
    async Update(id: number, data: Professor) {
        await ProfessorEntity.update(data, { where: { id }, validate: true })
        return (await ProfessorEntity.findByPk(id)) as Professor
    }
    async Delete(id: number) {
        const result = await ProfessorEntity.destroy({ where: { id: id } })
        return result !== 0
    }

}
export default ProfessorRepository