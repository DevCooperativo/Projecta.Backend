import Student from "domain/models/student"

interface IStudentRepository {
    Find: () => Promise<Student[]>
    FindById: (id: number) => Promise<Student | null>
    FindByEmail: (email: string) => Promise<Student | null>
    Create: (data: Student) => Promise<Student | null>
    Update: (id: number, data: Student) => Promise<Student | null>
    Delete: (id: number) => Promise<boolean>
}
export default IStudentRepository