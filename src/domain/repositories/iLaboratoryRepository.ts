import Laboratory from "../models/laboratory";

interface ILaboratoryRepository {
    Find: () => Promise<Laboratory[]>
    FindById: (id: number) => Promise<Laboratory | null>
    Create: (data: Laboratory) => Promise<Laboratory | null>
    Update: (id: number, data: Laboratory) => Promise<Laboratory | null>
    Delete: (id: number) => Promise<boolean>
}
export default ILaboratoryRepository