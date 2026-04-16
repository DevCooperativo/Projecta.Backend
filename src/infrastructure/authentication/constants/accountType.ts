export const AccountType = {
    student: "student",
    professor: "professor",
    administrator: "administrator"
} as const

export type AccountTypeType = keyof typeof AccountType