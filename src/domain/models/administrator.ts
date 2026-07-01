import BaseModel from "../abstractions/BaseModel";
import { Guard } from "../validations/guard";

class Administrator extends BaseModel {
    name: string
    email: string

    private constructor(name: string, email: string) {
        super()
        this.name = name
        this.email = email
    }

    static create(name: string, email: string): Administrator {
        const errors = [
            Guard.againstNullOrUndefined(name, "Name is required"),
            Guard.againstNullOrUndefined(email, "Email is required"),
            Guard.againstRegularExpression(email, /^\S+@\S+\.\S+$/, "Email is not valid"),
        ].filter((e): e is string => e !== null)
        this.throwDomainException(errors);
        return new Administrator(name, email)
    }

    static rehydrate(id: number, name: string, email: string, createdAt: Date, updatedAt: Date, isVisible: boolean): Administrator {
        const administrator = new Administrator(name, email)
        administrator.id = id
        administrator.createdAt = createdAt
        administrator.updatedAt = updatedAt
        administrator.isVisible = isVisible
        return administrator
    }

    update(name: string): void {
        const errors = [
            Guard.againstNullOrUndefined(name, "Name is required"),
        ].filter((e): e is string => e !== null)
        this.throwDomainException(errors);
        this.name = name
        this.updateTimestamps()
    }
}

export default Administrator
