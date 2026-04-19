import BaseModel from "@/domain/abstractions/BaseModel";
import { Guard } from "@/domain/validations/guard";

export class Account extends BaseModel {
    private constructor(readonly email: string, readonly passwordHash: string) {
        super();
    }

    static create(email: string, passwordHash: string): Account {
        Guard.againstNullOrUndefined(email, "Email is required");
        Guard.againstRegularExpression(email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format");
        Guard.againstNullOrUndefined(passwordHash, "Password hash is required");
        return new Account(email, passwordHash);
    }

    static rehydrate(id: number, email: string, passwordHash: string, createdAt: Date, updatedAt: Date, isVisible: boolean): Account {
        const account = new Account(email, passwordHash);
        account.id = id;
        account.createdAt = createdAt;
        account.updatedAt = updatedAt;
        account.isVisible = isVisible;
        return account;
    }
}