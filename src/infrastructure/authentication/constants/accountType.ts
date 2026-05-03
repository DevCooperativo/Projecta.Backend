export const AccountType = {
    student: "student",
    professor: "professor",
    administrator: "administrator"
} as const

export type AccountType = typeof AccountType[keyof typeof AccountType]