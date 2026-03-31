import { ApplicationExceptionName } from "application/constants/applicationExceptionName";
import StudentDTO from "application/dtos/studentDTO";
import ApplicationException from "application/exceptions/applicationException";
import IStudentServices from "application/interfaces/iStudentServices";
import Student from "domain/models/student";
import IStudentRepository from "domain/repositories/iStudentRepository";
import { InfrastructureExceptionName } from "infrastructure/exceptions/constants/infrastructureExceptionName";
import InfrastructureException from "infrastructure/exceptions/infrastructureException";
import { inject, injectable } from "tsyringe";

@injectable()
class StudentServices implements IStudentServices {
    constructor(
        @inject("StudentRepository")
        private readonly studentRepository: IStudentRepository
    ) { }
    async GetAllAsync() {
        return (await this.studentRepository.Find()) as StudentDTO[]
    }
    async GetByIdAsync(id: number) {
        return (await this.studentRepository.FindById(id)) as StudentDTO
    }
    async CreateAsync(data: StudentDTO) {
        InfrastructureException.When((await this.studentRepository.FindByEmail(data.email) as Student | null) !== null, InfrastructureExceptionName.CONSTRAINT_ERROR, "Email already in use", 409)
        return (await this.studentRepository.Create(data)) as StudentDTO
    }
    async UpdateAsync(id: number, data: StudentDTO) {
        if (!(await this.GetByIdAsync(id) as Student))
            throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "No student was found with the provided id", 404)
        return (await this.studentRepository.Update(id, data)) as StudentDTO

    }
    async DeleteAsync(id: number) {
        return (await this.studentRepository.Delete(id))
    }
}
export default StudentServices