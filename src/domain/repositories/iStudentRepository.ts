import { Transaction } from "@/application/unitOfWork/transaction";
import Student from "@/domain/models/student"

interface IStudentRepository {
    Find: (trx?: Transaction) => Promise<Student[]>
    FindById: (id: number, trx?: Transaction) => Promise<Student | null>
    FindByEmail: (email: string, trx?: Transaction) => Promise<Student | null>
    Create: (data: Student, trx?: Transaction) => Promise<Student | null>
    Update: (id: number, data: Student, trx?: Transaction) => Promise<Student | null>
    Delete: (id: number, trx?: Transaction) => Promise<boolean>
}
export default IStudentRepository