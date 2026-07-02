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
        FindAvailabilityByCategory: vi.fn(async () => []),
        FindAvailabilityByLaboratory: vi.fn(async () => []),
        Create: vi.fn(async data => ({ ...validEquipment, ...data })),
        Update: vi.fn(async (_id, data) => ({ ...validEquipment, ...data })),
        Delete: vi.fn(async () => true)
    }

    const laboratoryRepository = {
        FindById: vi.fn(async () => getOverride("laboratory", { id: 1, storageSpace: true }))
    }

    const projectRepository = {
        FindById: vi.fn(async () => getOverride("project", { id: 1 }))
    }

    const equipmentCategoryRepository = {
        FindById: vi.fn(async () => getOverride("equipmentCategory", { id: 1 }))
    }

    const borrowRepository = {
        Find: vi.fn(async () => getOverride("borrows", [])),
        CountActiveByEquipmentId: vi.fn(async () =>
            (getOverride("borrows", []) as { isStillBorrowed: boolean }[])
                .filter(borrow => borrow.isStillBorrowed)
                .length
        )
    }

    const service = new EquipmentServices(
        equipmentRepository as never,
        laboratoryRepository as never,
        projectRepository as never,
        equipmentCategoryRepository as never,
        borrowRepository as never,
        unitOfWork
    )

    return { service, equipmentRepository, equipmentCategoryRepository }
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

    it("should not create equipment when laboratory does not have storage space", async () => {
        const { service } = createSut({ laboratory: { id: 1, storageSpace: false } })

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

    it("should delete equipment when its borrows are not active", async () => {
        const { service, equipmentRepository } = createSut({
            borrows: [{ id: 1, equipmentId: validEquipment.id, isStillBorrowed: false }]
        })

        await service.DeleteAsync(validEquipment.id)

        expect(equipmentRepository.Delete).toHaveBeenCalledOnce()
    })

    it("should not create equipment with an invalid category", async () => {
        const { service } = createSut({ equipmentCategory: null })

        await expect(service.CreateAsync(validEquipment)).rejects.toBeInstanceOf(ApplicationException)
    })

    it("should get equipment availability by category", async () => {
        const { service, equipmentRepository } = createSut()

        await service.GetAvailabilityByCategoryAsync(validEquipment.equipmentCategoryId)

        expect(equipmentRepository.FindAvailabilityByCategory).toHaveBeenCalledWith(validEquipment.equipmentCategoryId)
    })

    it("should not get equipment availability for an invalid category", async () => {
        const { service } = createSut({ equipmentCategory: null })

        await expect(service.GetAvailabilityByCategoryAsync(validEquipment.equipmentCategoryId)).rejects.toBeInstanceOf(ApplicationException)
    })

    it("should not get equipment availability for an invalid category id", async () => {
        const { service } = createSut()

        await expect(service.GetAvailabilityByCategoryAsync(0)).rejects.toBeInstanceOf(ApplicationException)
    })

    it("should get equipment availability by laboratory", async () => {
        const { service, equipmentRepository } = createSut()

        await service.GetAvailabilityByLaboratoryAsync(validEquipment.laboratoryId)

        expect(equipmentRepository.FindAvailabilityByLaboratory).toHaveBeenCalledWith(validEquipment.laboratoryId)
    })

    it("should not get equipment availability for an invalid laboratory", async () => {
        const { service } = createSut({ laboratory: null })

        await expect(service.GetAvailabilityByLaboratoryAsync(validEquipment.laboratoryId)).rejects.toBeInstanceOf(ApplicationException)
    })

    it("should not get equipment availability for an invalid laboratory id", async () => {
        const { service } = createSut()

        await expect(service.GetAvailabilityByLaboratoryAsync(0)).rejects.toBeInstanceOf(ApplicationException)
    })
})
