import CoordinatorDTO from "../dtos/coordinatorDTO"

interface ICoordinatorServices {
    GetAllAsync: () => Promise<CoordinatorDTO[]>
}
export default ICoordinatorServices