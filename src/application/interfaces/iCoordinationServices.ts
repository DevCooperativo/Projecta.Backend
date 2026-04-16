import { CoordinationDTO } from "application/dtos/coordinationDTO"

interface ICoordinationServices {
    GetAllAsync: () => Promise<CoordinationDTO[]>
    GetByIdAsync: (id: number) => Promise<CoordinationDTO | null>
    CreateAsync: (data: CoordinationDTO) => Promise<CoordinationDTO>
    UpdateAsync: (id: number, data: CoordinationDTO) => Promise<CoordinationDTO>
    DeleteAsync: (id: number) => Promise<boolean>
}
export default ICoordinationServices
