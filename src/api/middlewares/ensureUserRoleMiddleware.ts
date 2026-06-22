import ApiExceptionNameEnum from "@/api/enums/apiExceptionNameEnum";
import { ResponseBuilder } from "@/api/helpers/responseBuilder";
import { AccountType } from "@/infrastructure/authentication/constants/accountType";
import { NextFunction, Request, Response } from "express";

export const EnsureUserRoleMiddleware = (roles: AccountType[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (roles.length === 0) {
            next()
            return
        }

        const user = req.user
        if (!user) {
            res.status(401).json(
                ResponseBuilder.fail("You are not authenticated. Please sign in.", "info", ApiExceptionNameEnum.UNAUTHENTICATED_USER, 401)
            )
            return
        }

        if (!roles.includes(user.userType)) {
            res.status(403).json(
                ResponseBuilder.fail("You do not have permission to access this resource.", "info", ApiExceptionNameEnum.FORBIDDEN, 403)
            )
            return
        }

        next()
    }
}
