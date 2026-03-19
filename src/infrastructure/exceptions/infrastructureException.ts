import AppError from "domain/constants/appError";

class InfrastructureException implements AppError {
    name: string;
    message: string;
    stack?: string | undefined;
    cause?: unknown;
    code: number;
    constructor(name: string, message: string, code: number, stack?: string | undefined, cause?: unknown) {
        this.name = name
        this.message = message
        this.code = code
        this.stack = stack
        this.cause = cause
    }
    public static When(condition: boolean, name: string, message: string, code: number) {
        if (condition)
            throw new InfrastructureException(name, message, code)
    }
}
export default InfrastructureException