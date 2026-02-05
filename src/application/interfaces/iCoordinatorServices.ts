import CoordinatorDTO from "../dtos/coordinatorDTO"

interface ICoordinatorServices {
    getAll: () => Promise<CoordinatorDTO[]>
}
export default ICoordinatorServices