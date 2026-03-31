import Researcher from "../models/researcher";

interface IResearcherRepository {
    Find: () => Promise<Researcher[]>
    FindById: (id: number) => Promise<Researcher | null>
    Create: (data: Researcher) => Promise<Researcher | null>
    Update: (data: Researcher) => Promise<Researcher | null>
    Delete: (id: number) => Promise<boolean>
}
export default IResearcherRepository
