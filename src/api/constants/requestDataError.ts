export const RequestDataError = {
    INVALID_FIELDS:"INVALID_FIELDS",
    MISSING_REQUIRED_FIELD: "MISSING_REQUIRED_FIELD",
    INVALID_FIELD_TYPE: "INVALID_FIELD_TYPE",
    CROSS_VALIDATION_FAILED: "CROSS_VALIDATION_FAILED",
} as const

export type RequestDataErrorType = typeof RequestDataError[keyof typeof RequestDataError]