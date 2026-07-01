import CoordinatorDTO from "../dtos/coordinatorDTO"

interface ICoordinatorServices {
    GetAllAsync: () => Promise<CoordinatorDTO[]>
    GetByIdAsync: (id: number) => Promise<CoordinatorDTO | null>
    CreateAsync: (data: CoordinatorDTO) => Promise<CoordinatorDTO>
    UpdateAsync: (id: number, data: CoordinatorDTO) => Promise<CoordinatorDTO>
    DeleteAsync: (id: number) => Promise<boolean>
}
export default ICoordinatorServices