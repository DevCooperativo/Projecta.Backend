import Coordination from "../models/coordination";

interface ICoordinationRepository {
    Find: () => Promise<Coordination[]>
    FindById: (id: number) => Promise<Coordination | null>
    Create: (data: Coordination) => Promise<Coordination | null>
    Update: (data: Coordination) => Promise<Coordination | null>
    Delete: (id: number) => Promise<boolean>
}
export default ICoordinationRepository