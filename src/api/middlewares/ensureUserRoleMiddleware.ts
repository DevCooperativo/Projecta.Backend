import { AccountType } from "@/infrastructure/authentication/constants/accountType";
import { NextFunction, Request, Response } from "express";
import ApiException from "../exceptions/apiException";
import { ApiExceptionNames } from "../constants/apiExceptionNames";

export const EnsureUserRoleMiddleware = (roles: AccountType[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (roles.length === 0)
            next()
        const user = req.user
        if (!user) {
            res.status(401).json(new ApiException(ApiExceptionNames.UNAUTHORIZED, "User not authenticated").BuildJsonContent())
            return
        }
        if (!roles.includes(user.userType)) {
            res.status(403).json(new ApiException(ApiExceptionNames.FORBIDDEN, "User doesn't have permission").BuildJsonContent())
            return
        }
        next()
    }
}