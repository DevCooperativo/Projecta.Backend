import { ApiExceptionNameType } from "@/api/constants/apiExceptionNames";

abstract class AppError extends Error {
    abstract readonly name: ApiExceptionNameType;
    abstract readonly message: string;
    abstract readonly validationInfo: object
    abstract readonly stack?: string | undefined;
    abstract readonly code: number
    BuildJsonContent() {
        return {
            name: (this.name),
            message: (this.message),
            validationInfo: (this.validationInfo)
        }
    }
}
export default AppError