import { AccountType } from "@/infrastructure/authentication/constants/accountType";
import { AdministratorDTO } from "../administrator/administratorDTO";
import ProfessorDTO from "../professorDTO";
import { StudentDTO } from "../student/studentDTO";
import DomainException from "@/domain/exceptions/domainException";
import { DomainExceptionName } from "@/domain/constants/domainExceptionName";

export class UserContextDTO {
    readonly currentProfile: ProfessorDTO | StudentDTO | AdministratorDTO
    constructor(
        readonly professor: ProfessorDTO | null,
        readonly student: StudentDTO | null,
        readonly adminstrator: AdministratorDTO | null,
        readonly currentProfileType: AccountType,

    ) {
        switch (currentProfileType) {
            case AccountType.student:
                if (!this.student)
                    throw new DomainException(DomainExceptionName.INVALID_PROPERTY_VALUE, "User not found")
                this.currentProfile = this.student;
                break;
            case AccountType.professor:
                if (!this.professor)
                    throw new DomainException(DomainExceptionName.INVALID_PROPERTY_VALUE, "User not found")
                this.currentProfile = this.professor;
                break;
            case AccountType.administrator:
                if (!this.adminstrator)
                    throw new DomainException(DomainExceptionName.INVALID_PROPERTY_VALUE, "User not found")
                this.currentProfile = this.adminstrator;
                break;
            default:
                throw new DomainException(DomainExceptionName.INVALID_PROPERTY_VALUE, "User not found")
        }
    }
}