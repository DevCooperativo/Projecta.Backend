import { ApiExceptionNameType } from "api/constants/apiExceptionNames";

class ApiException implements Error {
    code: number;
    name: ApiExceptionNameType;
    message: string;
    stack?: string | undefined;
    cause?: unknown;
    validationInfo: object

    constructor(name: ApiExceptionNameType, message: string, code: number, validationInfo: object, stack?: string) {
        this.name = name
        this.code = code
        this.message = message
        this.validationInfo = validationInfo
        this.stack = stack
    }
    public static When(condition: boolean, name: ApiExceptionNameType, message: string, code: number) {
        if (condition)
            throw new ApiException(name, message, code, {})
    }
    BuildJsonContent() {
        return {
            name: (this.name),
            message: (this.message),
            validationInfo: (this.validationInfo)
        }
    }
}
export default ApiException