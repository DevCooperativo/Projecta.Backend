import DomainException from "../exceptions/domainException"

export interface IBaseModel {
    id: number
    createdAt: Date
    updatedAt: Date
    isVisible: boolean
}
abstract class BaseModel {
    id: number
    createdAt: Date
    updatedAt: Date
    isVisible: boolean
    constructor() {
    }

    static throwDomainException(errors: string[]) {
        if (errors.length > 0) throw new DomainException("DOMAIN_EXCEPTION", errors.join("; "))
    }
    throwDomainException(errors: string[]) {
        if (errors.length > 0) throw new DomainException("DOMAIN_EXCEPTION", errors.join("; "))
    }

    protected updateTimestamps() {
        this.updatedAt = new Date()
    }

}

export default BaseModel