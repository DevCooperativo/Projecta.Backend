import Borrow, { IBorrow } from "@/domain/models/borrow"
import { describe, expect, it } from "vitest"

describe("Borrow Domain", () => {
    const createData = {
        borrowDate: new Date(),
        equipmentId: 1,
        isStillBorrowed: true,
        studentId: 1,

    }

    const hydratedData: IBorrow = {
        id: 1,
        borrowDate: new Date(),
        equipmentId: 1,
        isStillBorrowed: true,
        studentId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        isVisible: true
    }

    it("should create entity with correct borrow date", () => {
        const entity = Borrow.create(createData.equipmentId, createData.borrowDate, createData.studentId)
        expect(entity.borrowDate).toEqual(createData.borrowDate)
        expect(entity.equipmentId).toEqual(createData.equipmentId)
        expect(entity.isStillBorrowed).toEqual(createData.isStillBorrowed)
        expect(entity.studentId).toEqual(createData.studentId)
    })
})
