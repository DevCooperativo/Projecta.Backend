export const RequestDataError = {
    MISSING_REQUIRED_FIELD: "MISSING_REQUIRED_FIELD",
    INVALID_FIELD_TYPE: "INVALID_FIELD_TYPE",
} as const

export type RequestDataErrorType = typeof RequestDataError[keyof typeof RequestDataError]