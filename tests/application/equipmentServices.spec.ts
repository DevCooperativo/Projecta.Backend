import EquipmentServices from "@/application/services/EquipmentServices"
import { IUnitOfWork } from "@/application/unitOfWork/iUnitOfWork"
import { Transaction } from "@/application/unitOfWork/transaction"
import ApplicationException from "@/application/exceptions/applicationException"
import { describe, expect, it, vi } from "vitest"

const validEquipment = {
    id: 1,
    name: "Microscope",
    laboratoryId: 1,
    projectId: 1,
    equipmentCategoryId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    isVisible: true
}

const unitOfWork = {
    execute: async <T>(work: (trx: Transaction) => Promise<T>) => work({} as Transaction)
} as IUnitOfWork

const createSut = (overrides?: {
    equipments?: unknown[]
    borrows?: unknown[]
    laboratory?: unknown
    project?: unknown
    equipmentCategory?: unknown
    equipment?: unknown
}) => {
    const getOverride = <T>(key: keyof NonNullable<typeof overrides>, fallback: T) => {
        if (overrides && Object.prototype.hasOwnProperty.call(overrides, key))
            return overrides[key] as T
        return fallback
    }

    const equipmentRepository = {
        Find: vi.fn(async () => getOverride("equipments", [])),
        FindById: vi.fn(async () => getOverride("equipment", validEquipment)),
        Create: vi.fn(async data => ({ ...validEquipment, ...data })),
        Update: vi.fn(async (_id, data) => ({ ...validEquipment, ...data })),
        Delete: vi.fn(async () => true)
    }

    const laboratoryRepository = {
        FindById: vi.fn(async () => getOverride("laboratory", { id: 1 }))
    }

    const projectRepository = {
        FindById: vi.fn(async () => getOverride("project", { id: 1 }))
    }

    const equipmentCategoryRepository = {
        FindById: vi.fn(async () => getOverride("equipmentCategory", { id: 1 }))
    }

    const borrowRepository = {
        Find: vi.fn(async () => getOverride("borrows", []))
    }

    const service = new EquipmentServices(
        equipmentRepository as never,
        laboratoryRepository as never,
        projectRepository as never,
        equipmentCategoryRepository as never,
        borrowRepository as never,
        unitOfWork
    )

    return { service, equipmentRepository }
}

describe("EquipmentServices", () => {
    it("should create equipment when laboratory, project and category are valid", async () => {
        const { service, equipmentRepository } = createSut()

        const result = await service.CreateAsync(validEquipment)

        expect(result.name).toBe(validEquipment.name)
        expect(equipmentRepository.Create).toHaveBeenCalledOnce()
    })

    it("should not create equipment when laboratory already has 50 equipments", async () => {
        const equipments = Array.from({ length: 50 }, (_, index) => ({
            ...validEquipment,
            id: index + 1
        }))
        const { service } = createSut({ equipments })

        await expect(service.CreateAsync(validEquipment)).rejects.toBeInstanceOf(ApplicationException)
    })

    it("should update equipment in the same full laboratory without counting itself twice", async () => {
        const equipments = Array.from({ length: 50 }, (_, index) => ({
            ...validEquipment,
            id: index + 1
        }))
        const { service, equipmentRepository } = createSut({ equipments })

        await service.UpdateAsync(validEquipment.id, validEquipment)

        expect(equipmentRepository.Update).toHaveBeenCalledOnce()
    })

    it("should not delete equipment with active borrows", async () => {
        const { service } = createSut({
            borrows: [{ id: 1, equipmentId: validEquipment.id, isStillBorrowed: true }]
        })

        await expect(service.DeleteAsync(validEquipment.id)).rejects.toBeInstanceOf(ApplicationException)
    })

    it("should not create equipment with an invalid category", async () => {
        const { service } = createSut({ equipmentCategory: null })

        await expect(service.CreateAsync(validEquipment)).rejects.toBeInstanceOf(ApplicationException)
    })
})
