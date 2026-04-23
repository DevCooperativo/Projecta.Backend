import { Guard } from "@/domain/validations/guard";
import BaseModel, { IBaseModel } from "../abstractions/BaseModel";

export interface IProfessor extends IBaseModel {
    name: string
    email: string
    telephone?: string
    registration: string
    coordinationId?: number
}

class Professor extends BaseModel implements IProfessor {
    name: string;
    email: string;
    telephone: string;
    registration: string;
    coordinationId: number;

    private constructor(name: string, email: string, registration: string, telephone: string, coordinationId: number) {
        super()
        this.name = name
        this.email = email
        this.telephone = telephone
        this.registration = registration
        this.coordinationId = coordinationId
    }

    static create(name: string, email: string, registration: string, telephone: string, coordinationId: number): Professor {
        const errors = [
            Guard.againstNullOrUndefined(name, "Name is required"),
            Guard.againstNullOrUndefined(email, "Email is required"),
            Guard.againstRegularExpression(email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"),
            Guard.againstNullOrUndefined(registration, "Registration is required"),
            Guard.againstNullOrUndefined(coordinationId, "Coordination ID is required"),
            Guard.against(coordinationId != null && coordinationId <= 0, "Coordination ID must be a positive integer"),
            Guard.againstNullOrUndefined(telephone, "Telephone is required"),
            Guard.againstRegularExpression(telephone, /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/, "Invalid telephone format. Must be in the format (XX) XXXXX-XXXX or (XX) XXXX-XXXX"),
        ].filter((e): e is string => e !== null)
        this.throwDomainException(errors)
        return new Professor(name, email, registration, telephone, coordinationId)
    }

    static rehydrate(id: number, name: string, email: string, registration: string, telephone: string, coordinationId: number, createdAt?: Date, updatedAt?: Date, isVisible?: boolean): Professor {
        const professor = new Professor(name, email, registration, telephone, coordinationId)
        professor.id = id
        professor.createdAt = createdAt ?? new Date()
        professor.updatedAt = updatedAt ?? new Date()
        professor.isVisible = isVisible ?? true
        return professor
    }

    update(name: string, registration: string, telephone: string = "") {
        const errors = [
            Guard.againstNullOrUndefined(this.id, "Id is required"),
            Guard.againstNullOrUndefined(name, "Name is required"),
            Guard.againstNullOrUndefined(registration, "Registration is required"),
            Guard.againstNullOrUndefined(telephone, "Telephone is required"),
            Guard.againstRegularExpression(telephone, /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/, "Invalid telephone format. Must be in the format (XX) XXXXX-XXXX or (XX) XXXX-XXXX"),
        ].filter((e): e is string => e !== null)
        this.throwDomainException(errors)

        this.name = name
        this.registration = registration
        this.telephone = telephone
    }

    changeCoordination(coordinationId: number) {
        const errors = [
            Guard.against(coordinationId === this.coordinationId, "Professor is already in this coordination")
        ].filter((e): e is string => e !== null)
        this.throwDomainException(errors)
        this.coordinationId = coordinationId
        this.updateTimestamps()
    }
}

export default Professor
