import ApiExceptionNameEnum from "@/api/enums/apiExceptionNameEnum";
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
        console.log(cookie)
        if (!cookie) {
            res.status(401).json({ name: ApiExceptionNameEnum.UNAUTHENTICATED_USER, message: "You are note authenticated on the api" })
            return
        }
        const secretKey = process.env.JWT_SECRET_KEY;
        if (!secretKey) {
            res.status(500).json({ message: "Internal server error" });
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
            case 0:
                if (!payload.accountTypes.includes(AccountType.administrator))
                    return res.status(403).json({ message: "You cannot assume this profile" })
                userType = AccountType.administrator;
                break;
            case 1:
                if (!payload.accountTypes.includes(AccountType.professor))
                    return res.status(403).json({ message: "You cannot assume this profile" })
                userType = AccountType.professor;
                break;
            case 2:
                if (!payload.accountTypes.includes(AccountType.student))
                    return res.status(403).json({ message: "You cannot assume this profile" })
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
        if (ex instanceof jsonwebtoken.errors.JOSEError) {
            res.status(400).json({ name: ex.name ?? "Invalid token used", message: ex.message ?? "The signature used doesn't match the one used on the application. " })
            return
        }
        console.log(ex)
        res.status(400).json({ message: "Invalid or expired token" })
    }
}

export default EnsureAuthenticatedUserMiddleware