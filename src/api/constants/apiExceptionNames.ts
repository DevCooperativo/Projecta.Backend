export const ApiExceptionNames = {
    BAD_REQUEST: "BAD_REQUEST",
    UNAUTHORIZED: "UNAUTHORIZED",
    FORBIDDEN: "FORBIDDEN",
    NOT_FOUND: "NOT_FOUND",
    CONFLICT: "CONFLICT",
    TOO_MANY_REQUREST: "TOO_MANY_REQUREST",
    INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
} as const

export type ApiExceptionNameType = typeof ApiExceptionNames[keyof typeof ApiExceptionNames]