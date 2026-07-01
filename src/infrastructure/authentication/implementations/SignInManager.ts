import { ISignInManager } from "../abstractions/iSignInManager";
import { AccountType } from "../constants/accountType";

export class SignInManager implements ISignInManager{
    async SignInAsync(email: string, password: string, accountType?: AccountType): Promise<string> {
        throw new Error("Method not implemented.");
    }
    async RegisterAsync(email: string, password: string, accountType: AccountType): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async ChangeProfileAsync(email: string, accountType: AccountType): Promise<void> {
        throw new Error("Method not implemented.");
    }
} 