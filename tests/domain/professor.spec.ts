import Professor, { IProfessor } from "@/domain/models/professor"
import { describe, expect, it } from "vitest"
describe("Professor Domain", () => {
    const createData = {
        name: "Fulado de tal",
        email: "fulano_de_tal@email.com",
        telephone: "(11) 99999-9999",
        registration: "123456",
        coordinationId: 1,
    }

    const hydratedData: IProfessor = {
        id: 1,
        name: "Fulado de tal",
        email: "fulano_de_tal@email.com",
        createdAt: new Date(),
        updatedAt: new Date(),
        isVisible: true,
        registration: "123456",
        coordinationId: 1,
    }

    it("should create entity with correct email", () => {
        const entity = Professor.create(createData.name, createData.email, createData.registration, createData.telephone, createData.coordinationId)
        expect(entity.email).toEqual("fulano_de_tal@email.com")
        expect(entity.name).toEqual("Fulado de tal")
        expect(entity.registration).toEqual("123456")
        expect(entity.coordinationId).toEqual(1)
    })
})