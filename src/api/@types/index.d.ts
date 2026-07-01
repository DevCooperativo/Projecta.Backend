import { AccountType } from "@/infrastructure/authentication/constants/accountType"
import "express"
declare module "express" {
    export interface Request {
        user?: {
            email: string
            accontTypes: AccountType[],
            userType: AccountType
        }
    }
}