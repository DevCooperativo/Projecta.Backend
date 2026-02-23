import ApiExceptionNameEnum from "api/enums/apiExceptionNameEnum";
import AppError from "shared/exceptions/appError";

class ApiException implements AppError {
    code: number;
    name: ApiExceptionNameEnum;
    message: string;
    stack?: string | undefined;
    cause?: unknown;

    constructor(name: ApiExceptionNameEnum, message: string, code: number, stack?: string) {
        this.name = name
        this.code = code
        this.message = message
        this.stack = stack
    }
    public static When(condition: boolean, name: ApiExceptionNameEnum, message: string, code: number) {
        if (condition)
            throw new ApiException(name, message, code)
    }
}
export default ApiException