import { ApplicationExceptionName } from "@/application/constants/applicationExceptionName";
import { CreateStudentInputDTO } from "@/application/dtos/student/createStudentInputDTO";
import { CreateStudentReturnDTO } from "@/application/dtos/student/createStudentReturnDTO";
import { UpdateStudentInputDTO } from "@/application/dtos/student/updateStudentInputDTO";
import { UpdateStudentReturnDTO } from "@/application/dtos/student/updateStudentReturnDTO";
import ApplicationException from "@/application/exceptions/applicationException";
import IStudentServices from "@/application/interfaces/iStudentServices";
import Student from "@/domain/models/student";
import IStudentRepository from "@/domain/repositories/iStudentRepository";
import { InfrastructureExceptionName } from "@/infrastructure/exceptions/constants/infrastructureExceptionName";
import InfrastructureException from "@/infrastructure/exceptions/infrastructureException";
import { inject, injectable } from "tsyringe";
import { GetAllStudentsResultDTO } from "../dtos/student/getAllStudentsResultDTO";
import { GetStudentByIdResultDTO } from "../dtos/student/getStudentByIdResultDTO";
import { IUnitOfWork } from "../unitOfWork/iUnitOfWork";
import { StudentDTO } from "../dtos/student/studentDTO";
import { AccountType } from "@/infrastructure/authentication/constants/accountType";
import { ChangeStudentTermInputDTO } from "../dtos/student/changeStudentTermInputDTO";
import { ChangeStudentShiftInputDTO } from "../dtos/student/changeStudentShiftInputDTO";

@injectable()
class StudentServices implements IStudentServices {
    constructor(
        @inject("StudentRepository")
        private readonly studentRepository: IStudentRepository,
        @inject("SequelizeUnitOfWork")
        private readonly unitOfWork: IUnitOfWork
    ) { }

    async GetByEmailAsync(email: string) {
        const result = await this.studentRepository.FindByEmail(email)
        if (!result) return null
        return new StudentDTO(result.id, result.name, result.email, result.registration, result.birthdate, result.term, result.shift, result.createdAt, result.updatedAt, result.isVisible)
    }
    async GetAllAsync() {
        const result = await this.studentRepository.Find()
        return result.map(x => new GetAllStudentsResultDTO(x.id, x.name, x.email, x.registration, x.birthdate, x.term, x.shift, x.createdAt, x.updatedAt, x.isVisible))
    }
    async GetByIdAsync(id: number) {
        const result = await this.studentRepository.FindById(id)
        if (!result)
            throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "No student was found with the provided id", 404)
        return new GetStudentByIdResultDTO(result.id, result.name, result.email, result.registration, result.birthdate, result.term, result.shift, result.createdAt, result.updatedAt, result.isVisible)
    }
    async CreateAsync(data: CreateStudentInputDTO) {
        return await this.unitOfWork.execute(async (trx) => {
            InfrastructureException.When((await this.studentRepository.FindByEmail(data.email) as Student | null) !== null, InfrastructureExceptionName.CONSTRAINT_ERROR, "Email already in use", 409)
            const newStudent = Student.create(data.name, data.email, data.registration, data.birthdate, data.term, data.shift)
            return (await this.studentRepository.Create(newStudent, trx)) as CreateStudentReturnDTO
        })
    }
    async UpdateAsync(data: UpdateStudentInputDTO) {
        return await this.unitOfWork.execute(async (trx) => {
            if (data.accountType !== AccountType.student)
                throw new ApplicationException(ApplicationExceptionName.NOT_BELONGS_TO, "User is not acting as a student", 403)
            const student = await this.studentRepository.FindByEmail(data.userEmail)
            if (!student)
                throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "No student profile found for this user", 404)
            student.updatePersonalData(data.name, data.birthdate)
            return (await this.studentRepository.Update(student.id, student, trx)) as UpdateStudentReturnDTO
        })
    }
    async ChangeTermAsync(data: ChangeStudentTermInputDTO) {
        return await this.unitOfWork.execute(async (trx) => {
            if (data.accountType !== AccountType.student)
                throw new ApplicationException(ApplicationExceptionName.NOT_BELONGS_TO, "User is not acting as a student", 403)
            const student = await this.studentRepository.FindByEmail(data.userEmail)
            if (!student)
                throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "Student not found", 404)
            student.changeTerms(data.newTerm)
            await this.studentRepository.Update(student.id, student, trx)
            return new StudentDTO(student.id, student.name, student.email, student.registration, student.birthdate, student.term, student.shift, student.createdAt, student.updatedAt, student.isVisible)
        })
    }
    async ChangeShiftAsync(data: ChangeStudentShiftInputDTO) {
        return await this.unitOfWork.execute(async (trx) => {
            if (data.accountType !== AccountType.student)
                throw new ApplicationException(ApplicationExceptionName.NOT_BELONGS_TO, "User is not acting as a student", 403)
            const student = await this.studentRepository.FindByEmail(data.userEmail)
            if (!student)
                throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "Student not found", 404)
            student.changeShift(data.newShift)
            await this.studentRepository.Update(student.id, student, trx)
            return new StudentDTO(student.id, student.name, student.email, student.registration, student.birthdate, student.term, student.shift, student.createdAt, student.updatedAt, student.isVisible)
        })
    }
    async DeleteAsync(id: number) {
        return await this.unitOfWork.execute(async (trx) => {
            return (await this.studentRepository.Delete(id, trx))
        })
    }
}
export default StudentServices
