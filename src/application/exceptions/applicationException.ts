import AppError from "domain/constants/appError";

class ApplicationException implements AppError {
    code: number;
    name: string;
    message: string;
    stack?: string | undefined;
    cause?: unknown;
    constructor(name: string, message: string, code: number, stack?: string) {
        this.name = name
        this.code = code
        this.message = message
        this.stack = stack
    }
}
export default ApplicationException