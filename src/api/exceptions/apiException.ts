import { ApiExceptionNames, ApiExceptionNameType } from "@/api/constants/apiExceptionNames";

class ApiException implements Error {
    code: number;
    name: ApiExceptionNameType;
    message: string;
    stack?: string | undefined;
    cause?: unknown;
    validationInfo?: object

    constructor(name: ApiExceptionNameType, message: string, validationInfo?: object, stack?: string) {
        this.name = name
        this.code = this.GenerateApiCode(name)
        this.message = message
        this.validationInfo = validationInfo
        this.stack = stack
    }
    public static When(condition: boolean, name: ApiExceptionNameType, message: string) {
        if (condition)
            throw new ApiException(name, message, {})
    }
    BuildJsonContent() {
        return {
            name: (this.name),
            message: (this.message),
            validationInfo: (this.validationInfo)
        }
    }
    private GenerateApiCode(name: ApiExceptionNameType) {
        switch (name) {
            case ApiExceptionNames.BAD_REQUEST:
                return 400
            case ApiExceptionNames.UNAUTHORIZED:
                return 401
            case ApiExceptionNames.FORBIDDEN:
                return 403
            case ApiExceptionNames.NOT_FOUND:
                return 404
            case ApiExceptionNames.CONFLICT:
                return 409
            case ApiExceptionNames.TOO_MANY_REQUREST:
                return 429
            default:
                return 500
        }
    }
}
export default ApiException