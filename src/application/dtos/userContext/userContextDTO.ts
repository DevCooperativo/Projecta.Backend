import { AccountType } from "@/infrastructure/authentication/constants/accountType";
import { AdministratorDTO } from "../administrator/administratorDTO";
import ProfessorDTO from "../professorDTO";
import { StudentDTO } from "../student/studentDTO";

export class UserContextDTO {
    readonly currentProfile
    constructor(
        readonly professor: ProfessorDTO | null,
        readonly student: StudentDTO | null,
        readonly adminstrator: AdministratorDTO | null,
        readonly currentProfileType: AccountType,

    ) {
        switch (currentProfileType) {
            case AccountType.student:
                this.currentProfile = this.student;
                break;
            case AccountType.professor:
                this.currentProfile = this.professor;
                break;
            case AccountType.administrator:
                this.currentProfile = this.adminstrator;
                break;
            default:
                this.currentProfile = null;
                break;
        }
    }
}