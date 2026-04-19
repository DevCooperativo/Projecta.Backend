import { Transaction } from "@/application/unitOfWork/transaction";
import ProjectCategory from "../models/projectCategory";

interface IProjectCategoryRepository {
    Find: (trx?: Transaction) => Promise<ProjectCategory[]>
    FindById: (id: number, trx?: Transaction) => Promise<ProjectCategory | null>
    Create: (data: ProjectCategory, trx?: Transaction) => Promise<ProjectCategory | null>
    Update: (id: number, data: ProjectCategory, trx?: Transaction) => Promise<ProjectCategory | null>
    Delete: (id: number, trx?: Transaction) => Promise<boolean>
}
export default IProjectCategoryRepository