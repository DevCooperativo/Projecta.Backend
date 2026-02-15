import ApplicationExceptionNameEnum from "shared/enums/exceptions/applicationExceptionNameEnum";
import AppError from "shared/exceptions/appError";

class ApplicationException implements AppError {
    code: number;
    name: ApplicationExceptionNameEnum;
    message: string;
    stack?: string | undefined;
    cause?: unknown;
    constructor(name: ApplicationExceptionNameEnum, message: string, code: number, stack?: string) {
        this.name = name
        this.code = code
        this.message = message
        this.stack = stack
    }
}
export default ApplicationException