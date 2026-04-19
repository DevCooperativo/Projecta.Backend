import BaseModel from "../abstractions/BaseModel";
import { Guard } from "../validations/guard";

class Administrator extends BaseModel {
    email: string

    private constructor(email: string) {
        super()
        this.email = email
    }

    static create(email: string): Administrator {
        Guard.againstNullOrUndefined(email, "Email is required")
        Guard.againstRegularExpression(email, /^\S+@\S+\.\S+$/, "Email is not valid")
        return new Administrator(email)
    }
    static rehydrate(id: number, email: string, createdAt: Date, updatedAt: Date, isVisible: boolean): Administrator {
        const administrator = new Administrator(email)
        administrator.id = id
        administrator.createdAt = createdAt
        administrator.updatedAt = updatedAt
        administrator.isVisible = isVisible
        return administrator
    }

    update(email: string): void {
        Guard.againstNullOrUndefined(email, "Email is required")
        Guard.againstRegularExpression(email, /^\S+@\S+\.\S+$/, "Email is not valid")
        this.email = email
    }
}

export default Administrator