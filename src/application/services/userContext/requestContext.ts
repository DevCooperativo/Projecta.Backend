import { AsyncLocalStorage } from "async_hooks"
import { AccountType } from "@/infrastructure/authentication/constants/accountType"

export interface IUserContextTokenData {
    email: string
    accountTypes: AccountType[]
    userType: AccountType
}

export const requestContext = new AsyncLocalStorage<IUserContextTokenData>()
