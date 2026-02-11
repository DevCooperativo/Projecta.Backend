import Professor from "domain/models/professor"

interface IProfessorRepository {
    Find: () => Promise<Professor[]>
    FindById: (id: number) => Promise<Professor | null>
    FindByEmail: (email: string) => Promise<Professor | null>
    Create: (data: Professor) => Promise<Professor | null>
    Update: (id: number, data: Professor) => Promise<Professor | null>
    Delete: (id: number) => Promise<boolean>
}
export default IProfessorRepository