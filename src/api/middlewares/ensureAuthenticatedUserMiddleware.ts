import ApiExceptionNameEnum from "@/api/enums/apiExceptionNameEnum";
import { ResponseBuilder } from "@/api/helpers/responseBuilder";
import { AccountType } from "@/infrastructure/authentication/constants/accountType";
import { requestContext } from "@/application/services/userContext/requestContext";
import { NextFunction, Request, Response } from "express";
import jsonwebtoken, { base64url, jwtDecrypt, JWTPayload } from "jose"

interface AppJwtPayload extends JWTPayload {
    email: string
    accountTypes: AccountType[]
}

const EnsureAuthenticatedUserMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cookie = req.cookies["auth_cookie"]
        if (!cookie) {
            res.status(401).json(
                ResponseBuilder.fail("You are not authenticated. Please sign in.", "info", ApiExceptionNameEnum.UNAUTHENTICATED_USER, 401)
            )
            return
        }

        const secretKey = process.env.JWT_SECRET_KEY;
        if (!secretKey) {
            res.status(500).json(
                ResponseBuilder.fail("An error occurred on our side. Please contact the support team.", "error", "INTERNAL_SERVER_ERROR", 500)
            )
            return;
        }

        const secret = base64url.decode(secretKey);

        const { payload } = await jwtDecrypt<AppJwtPayload>(cookie, secret, {
            issuer: "urn:projecta:issuer",
            audience: "urn:projecta:audience",
        });

        const userTypeCookie = req.cookies["user_scope"]
        let userType: AccountType;
        switch (userTypeCookie) {
            case "0":
                if (!payload.accountTypes.includes(AccountType.administrator)) {
                    res.status(403).json(
                        ResponseBuilder.fail("You do not have permission to assume this profile.", "info", ApiExceptionNameEnum.FORBIDDEN, 403)
                    )
                    return
                }
                userType = AccountType.administrator;
                break;
            case "1":
                if (!payload.accountTypes.includes(AccountType.professor)) {
                    res.status(403).json(
                        ResponseBuilder.fail("You do not have permission to assume this profile.", "info", ApiExceptionNameEnum.FORBIDDEN, 403)
                    )
                    return
                }
                userType = AccountType.professor;
                break;
            case "2":
                if (!payload.accountTypes.includes(AccountType.student)) {
                    res.status(403).json(
                        ResponseBuilder.fail("You do not have permission to assume this profile.", "info", ApiExceptionNameEnum.FORBIDDEN, 403)
                    )
                    return
                }
                userType = AccountType.student;
                break;
            default:
                userType = payload.accountTypes[0]
                break;
        }

        req.user = {
            accontTypes: payload.accountTypes,
            email: payload.email,
            userType: userType,
        }
        requestContext.run({ email: payload.email, accountTypes: payload.accountTypes, userType }, () => next())
    } catch (ex) {
        if (ex instanceof jsonwebtoken.errors.JWTExpired) {
            res.status(401).json(
                ResponseBuilder.fail("Your session has expired. Please sign in again.", "info", ApiExceptionNameEnum.EXPIRED_TOKEN, 401)
            )
            return
        }
        if (ex instanceof jsonwebtoken.errors.JOSEError) {
            res.status(401).json(
                ResponseBuilder.fail("The token provided is invalid or unrecognized.", "info", ApiExceptionNameEnum.UNAUTHENTICATED_USER, 401)
            )
            return
        }
        console.error(ex)
        res.status(500).json(
            ResponseBuilder.fail("An error occurred on our side. Please contact the support team.", "error", "INTERNAL_SERVER_ERROR", 500)
        )
    }
}

export default EnsureAuthenticatedUserMiddleware
