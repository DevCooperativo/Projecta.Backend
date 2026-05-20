import { injectable } from "tsyringe"
import { IUserContextServices } from "../interfaces/iUserContextServices"
import { UserContextDTO } from "../dtos/userContext/userContextDTO"
import { requestContext } from "./userContext/requestContext"
import ApplicationException from "../exceptions/applicationException"
import { ApplicationExceptionName } from "../constants/applicationExceptionName"

@injectable()
export class UserContextServices implements IUserContextServices {
    GetCurrentContext(): UserContextDTO {
        const ctx = requestContext.getStore()
        if (!ctx)
            throw new ApplicationException(ApplicationExceptionName.INVALID_OPERATION, "No request context available", 401)
        return new UserContextDTO(ctx.email, ctx.accountTypes, ctx.userType)
    }
}
