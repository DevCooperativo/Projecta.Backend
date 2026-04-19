import { Transaction } from "@/application/unitOfWork/transaction";
import Project from "../models/project";

interface IProjectRepository {
    Find: (trx?: Transaction) => Promise<Project[]>
    FindById: (id: number, trx?: Transaction) => Promise<Project | null>
    Create: (data: Project, trx?: Transaction) => Promise<Project | null>
    Update: (data: Project, trx?: Transaction) => Promise<Project | null>
    Delete: (id: number, trx?: Transaction) => Promise<boolean>
}
export default IProjectRepository
