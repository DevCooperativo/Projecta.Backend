import Coordinator from "../models/coordinator";

interface ICoordinatorRepository {
    Find: () => Promise<Coordinator[]>
    FindById: (id: number) => Promise<Coordinator | null>
    Create: (data: Coordinator) => Promise<Coordinator | null>
    Update: (data: Coordinator) => Promise<Coordinator | null>
    Delete: (id: number) => Promise<boolean>
}
export default ICoordinatorRepository