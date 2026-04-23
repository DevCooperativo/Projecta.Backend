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
        this.throwDomainException(errors);
    }
    throwDomainException(errors: string[]) {
        this.throwDomainException(errors);
    }

    protected updateTimestamps() {
        this.updatedAt = new Date()
    }

}

export default BaseModel