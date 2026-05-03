import { AccountType } from "@/infrastructure/authentication/constants/accountType";
import { UserContextDTO } from "../dtos/userContext/userContextDTO";

export interface IUserContextServices {
    GetUserContext: (userEmail: string, accountType: AccountType) => Promise<UserContextDTO>
}