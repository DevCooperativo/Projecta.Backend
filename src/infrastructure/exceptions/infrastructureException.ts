import InfrastructureExceptionNameEnum from "@shared/enums/exceptions/infrastructureExceptionNameEnum";
import { ValidationError } from "sequelize";
import AppError from "shared/exceptions/appError";

class InfrastructureException implements AppError {
    name: InfrastructureExceptionNameEnum;
    message: string;
    stack?: string | undefined;
    cause?: unknown;
    code: number;
    constructor(name: InfrastructureExceptionNameEnum, message: string, code: number, stack?: string | undefined, cause?: unknown) {
        this.name = name
        this.message = message
        this.code = code
        this.stack = stack
        this.cause = cause
    }
    public static When(condition: boolean, name: InfrastructureExceptionNameEnum, message: string, code: number) {
        if (condition)
            throw new InfrastructureException(name, message, code)
    }
}
export default InfrastructureException