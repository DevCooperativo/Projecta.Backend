import { AccountType } from "@/infrastructure/authentication/constants/accountType";

export class UpdateProfileReturnDTO {
    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly email: string,
        public readonly profileType: AccountType,
        public readonly registration?: string,
        public readonly telephone?: string,
        public readonly birthdate?: Date,
        public readonly term?: number,
        public readonly shift?: string,
        public readonly coordinationId?: number,
    ) { }
}
