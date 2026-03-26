import { LaboratoryDTO } from "application/dtos/laboratoryDTO"

interface ILaboratoryServices {
    GetAllAsync: () => Promise<LaboratoryDTO[]>
}
export default ILaboratoryServices