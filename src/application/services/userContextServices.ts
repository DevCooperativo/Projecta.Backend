import { inject, injectable } from "tsyringe";
import IStudentServices from "../interfaces/iStudentServices";
import IProfessorServices from "../interfaces/iProfessorServices";
import IAdministratorServices from "../interfaces/iAdministratorServices";
import { IUserContextServices } from "../interfaces/iUserContextServices";
import { UserContextDTO } from "../dtos/userContext/userContextDTO";
import { AccountType } from "@/infrastructure/authentication/constants/accountType";

@injectable()
export class UserContextServices implements IUserContextServices {
    constructor(
        @inject("StudentServices")
        private readonly studentServices: IStudentServices,
        @inject("ProfessorServices")
        private readonly professorServices: IProfessorServices,
        @inject("AdministratorServices")
        private readonly administratorServices: IAdministratorServices
    ) {

    }
    async GetUserContext(userEmail: string, accountType: AccountType) {
        console.log(userEmail, accountType)
        const student = await this.studentServices.GetByEmailAsync(userEmail);
        const administrator = await this.administratorServices.GetByEmailAsync(userEmail);
        const professor = await this.professorServices.GetByEmailAsync(userEmail)
        return new UserContextDTO(professor, student, administrator, accountType)
    }
}