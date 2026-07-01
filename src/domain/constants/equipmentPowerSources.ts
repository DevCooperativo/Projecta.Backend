export const EquipmentPowerSources = {
    ELECTRIC_110_220V: "Energia elétrica (110V/220V)",
    BATTERY: "Bateria",
    USB: "USB",
    SOLAR: "Energia solar",
    MANUAL_NO_POWER: "Manual / não necessita energia"
} as const

export type EquipmentPowerSourcesType = typeof EquipmentPowerSources[keyof typeof EquipmentPowerSources]