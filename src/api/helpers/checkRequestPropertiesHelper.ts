import { ApiExceptionNames } from "api/constants/apiExceptionNames"
import { RequestDataError, RequestDataErrorType } from "api/constants/requestDataError"
import ApiException from "api/exceptions/apiException"

const CheckRequired = (params: Record<string, unknown>) => {
    const values: Record<string, { type: RequestDataErrorType, error: string }> = {}
    Object.entries(params).forEach(([k, v]) => {
        if (v === null || v === undefined || v === "") {
            values[k] = { type: RequestDataError.MISSING_REQUIRED_FIELD, error: `The field ${k} is a required field` }
        }
    })
    if (Object.entries(values).length !== 0)
        throw new ApiException(ApiExceptionNames.BAD_REQUEST, "The following properties must be fixed on your request", 400, values)
}

const CheckData = (params: Record<string, { type: string, value: unknown, required: boolean }>) => {
    const values: Record<string, { type: RequestDataErrorType, error: string }> = {}
    Object.entries(params).forEach(([k, v]) => {
        if (v === null || v === undefined) {
            values[k] = { type: RequestDataError.MISSING_REQUIRED_FIELD, error: `The field ${k} is a required field` }
            return
        }
        if (v.required && (v.value === null || v.value === "" || v.value === undefined)) {
            values[k] = { type: RequestDataError.MISSING_REQUIRED_FIELD, error: `The field ${k} is a required field` }
            return
        }
        if (!v.required && (v.value === null || v.value === undefined))
            return
        switch (v.type) {
            case "string":
                if (typeof v.value !== "string") {
                    values[k] = { type: RequestDataError.INVALID_FIELD_TYPE, error: `The field ${k} must be of type ${v.type}` }
                    return
                }
                break
            case "number":
                if (typeof v.value !== "number") {
                    values[k] = { type: RequestDataError.INVALID_FIELD_TYPE, error: `The field ${k} must be of type ${v.type}` }
                    return
                }
                break
            case "boolean":
                if (typeof v.value !== "boolean") {
                    values[k] = { type: RequestDataError.INVALID_FIELD_TYPE, error: `The field ${k} must be of type ${v.type}` }
                    return
                }
                break
            case "object":
                if (typeof v.value !== "object") {
                    values[k] = { type: RequestDataError.INVALID_FIELD_TYPE, error: `The field ${k} must be of type ${v.type}` }
                    return
                }
                break
        }
    })
    if (Object.entries(values).length !== 0)
        throw new ApiException(ApiExceptionNames.BAD_REQUEST, `The following properties must be fixed on your request`, 400, values)
}

export { CheckData, CheckRequired }
export default { CheckData, CheckRequired }
