import { UserContextDTO } from "../dtos/userContext/userContextDTO"

export interface IUserContextServices {
    GetCurrentContext: () => UserContextDTO
}
