import Administrator from "../models/administrator";

interface IAdministratorRepository {
    Find: () => Promise<Administrator[]>
    FindById: (id: number) => Promise<Administrator | null>
    FindByEmail: (email: string) => Promise<Administrator | null>
    Create: (data: Administrator) => Promise<Administrator | null>
    Update: (data: Administrator) => Promise<Administrator | null>
    Delete: (id: number) => Promise<boolean>
}
export default IAdministratorRepository