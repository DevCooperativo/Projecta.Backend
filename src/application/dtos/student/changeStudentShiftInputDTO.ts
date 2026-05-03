import { AccountType } from "@/infrastructure/authentication/constants/accountType";
import { ShiftsType } from "@/domain/constants/shifts";

export class ChangeStudentShiftInputDTO {
    constructor(
        readonly userEmail: string,
        readonly accountType: AccountType,
        readonly newShift: ShiftsType,
    ) { }
}
