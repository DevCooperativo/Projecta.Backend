import Student from "domain/models/professor";
import IStudentRepository from "domain/repositories/iStudentRepository";
import { injectable } from "tsyringe";
import StudentEntity from "../data/entityMapping/professorEntityMapping";

@injectable()
class StudentRepository implements IStudentRepository {
    async FindByEmail(email: string) {
        return await StudentEntity.findOne({
            where: {
                email
            }
        }) as Student
    }
    async Find() {
        const result = await StudentEntity.findAll()
        return result as Student[]
    }
    async FindById(id: number) {
        return await StudentEntity.findByPk(id) as Student
    }
    async Create(data: Student) {
        return await StudentEntity.create({ ...data }, { validate: true }) as Student
    }
    async Update(id: number, data: Student) {
        await StudentEntity.update(data, { where: { id }, validate: true })
        return (await StudentEntity.findByPk(id)) as Student
    }
    async Delete(id: number) {
        const result = await StudentEntity.destroy({ where: { id: id } })
        return result !== 0
    }

}
export default StudentRepository