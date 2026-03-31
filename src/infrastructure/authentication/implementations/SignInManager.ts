import { ISignInManager } from "../abstractions/iSignInManager";
import { AccountTypeType } from "../constants/accountType";

export class SignInManager implements ISignInManager{
    async SignInAsync(email: string, password: string, accountType?: AccountTypeType): Promise<string> {
        throw new Error("Method not implemented.");
    }
    async RegisterAsync(email: string, password: string, accountType: AccountTypeType): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async ChangeProfileAsync(email: string, accountType: AccountTypeType): Promise<void> {
        throw new Error("Method not implemented.");
    }
} 