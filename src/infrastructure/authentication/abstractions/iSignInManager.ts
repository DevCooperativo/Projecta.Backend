import { AccountTypeType } from "../constants/accountType";

export interface ISignInManager {
    SignInAsync(email: string, password: string, accountType?: AccountTypeType): Promise<string>
    RegisterAsync(email: string, password: string, accountType: AccountTypeType): Promise<void>
    ChangeProfileAsync(email: string, accountType: AccountTypeType): Promise<void>
}