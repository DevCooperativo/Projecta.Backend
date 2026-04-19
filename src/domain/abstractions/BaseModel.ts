export interface IBaseModel{
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
}

export default BaseModel