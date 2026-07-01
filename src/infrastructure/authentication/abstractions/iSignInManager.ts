import { AccountType } from "../constants/accountType";

export interface ISignInManager {
    SignInAsync(email: string, password: string, accountType?: AccountType): Promise<string>
    RegisterAsync(email: string, password: string, accountType: AccountType): Promise<void>
    ChangeProfileAsync(email: string, accountType: AccountType): Promise<void>
}