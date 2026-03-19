import { CoordinationDTO } from "application/dtos/coordinationDTO"

interface ICoordinationServices {
    GetAllAsync: () => Promise<CoordinationDTO[]>
}
export default ICoordinationServices