export const AccounType = {
    STUDENT: "student",
    PROFESSOR: "professor",
    ADMINISTRATOR: "administrator"
} as const

export type AccountTypeType = keyof typeof AccounType