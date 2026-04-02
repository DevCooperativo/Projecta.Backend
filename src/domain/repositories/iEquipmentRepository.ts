import Equipment from "domain/models/equipment"

interface IEquipmentRepository {
    Find: () => Promise<Equipment[]>
    FindById: (id: number) => Promise<Equipment | null>
    Create: (data: Equipment) => Promise<Equipment | null>
    Update: (id: number, data: Equipment) => Promise<Equipment | null>
    Delete: (id: number) => Promise<boolean>
}
export default IEquipmentRepository