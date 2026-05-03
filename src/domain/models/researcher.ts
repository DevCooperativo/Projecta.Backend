import { Guard } from "@/domain/validations/guard";
import BaseModel, { IBaseModel } from "../abstractions/BaseModel";

export interface IResearcher extends IBaseModel {
    name: string
    functionName: string
    weeklyHours: number
    startDate: Date
    endDate?: Date
    projectId: number
    studentId?: number
    professorId?: number
}

class Researcher extends BaseModel implements IResearcher {
    name: string
    functionName: string
    weeklyHours: number
    startDate: Date
    endDate?: Date
    projectId: number
    studentId?: number
    professorId?: number

    private constructor(name: string, functionName: string, weeklyHours: number, startDate: Date, projectId: number, studentId?: number, professorId?: number, endDate?: Date) {
        super()
        this.name = name
        this.functionName = functionName
        this.weeklyHours = weeklyHours
        this.startDate = startDate
        this.projectId = projectId
        this.studentId = studentId
        this.professorId = professorId
        this.endDate = endDate
    }

    static create(name: string, functionName: string, weeklyHours: number, startDate: Date, projectId: number, studentId?: number, professorId?: number, endDate?: Date): Researcher {
        const errors = [
            Guard.againstNullOrUndefined(name, "Name is required"),
            Guard.againstRangeLenght(name, 3, 100, "Name must be between 3 and 100 characters"),
            Guard.againstNullOrUndefined(functionName, "Function name is required"),
            Guard.againstRangeLenght(functionName, 3, 100, "Function name must be between 3 and 100 characters"),
            Guard.againstNullOrUndefined(weeklyHours, "Weekly hours is required"),
            Guard.against(weeklyHours != null && (weeklyHours < 1 || weeklyHours > 44), "Weekly hours must be between 1 and 44"),
            Guard.againstNullOrUndefined(startDate, "Start date is required"),
            Guard.againstNullOrUndefined(projectId, "Project ID is required"),
            Guard.against(projectId != null && projectId <= 0, "Project ID must be a positive integer"),
            Guard.against(!studentId && !professorId, "Researcher must have a studentId or professorId"),
        ].filter((e): e is string => e !== null)
        this.throwDomainException(errors)
        return new Researcher(name, functionName, weeklyHours, startDate, projectId, studentId, professorId, endDate)
    }

    static rehydrate(id: number, name: string, functionName: string, weeklyHours: number, startDate: Date, projectId: number, studentId?: number, professorId?: number, endDate?: Date, createdAt?: Date, updatedAt?: Date, isVisible?: boolean): Researcher {
        const researcher = new Researcher(name, functionName, weeklyHours, startDate, projectId, studentId, professorId, endDate)
        researcher.id = id
        researcher.createdAt = createdAt ?? new Date()
        researcher.updatedAt = updatedAt ?? new Date()
        researcher.isVisible = isVisible ?? true
        return researcher
    }
}

export default Researcher
