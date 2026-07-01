import { LaboratoryDTO } from "@/application/dtos/laboratoryDTO"

interface ILaboratoryServices {
    GetAllAsync: () => Promise<LaboratoryDTO[]>
    GetByIdAsync: (id: number) => Promise<LaboratoryDTO | null>
    CreateAsync: (data: LaboratoryDTO) => Promise<LaboratoryDTO>
    UpdateAsync: (id: number, data: LaboratoryDTO) => Promise<LaboratoryDTO>
    DeleteAsync: (id: number) => Promise<boolean>
}
export default ILaboratoryServices