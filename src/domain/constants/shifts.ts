export const Shifts = {
    MORNING: "MORNING",
    AFTERNOON: "AFTERNOON",
    NIGHT: "NIGHT"
} as const

export type ShiftsType = typeof Shifts[keyof typeof Shifts]