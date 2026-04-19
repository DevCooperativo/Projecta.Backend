import ApiExceptionNameEnum from "@/api/enums/apiExceptionNameEnum";
import { NextFunction, Request, Response } from "express";
import jsonwebtoken, { base64url, jwtDecrypt, JWTPayload, JWTVerifyResult } from "jose"
interface AppJwtPayload extends JWTPayload {
    id: number
    email: string
    accountType: "student" | "professor"
}
const EnsureAuthenticatedUserMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // const cookie = req.cookies["auth_cookie"]
        // if (!cookie) {
        //     res.status(401).json({ name: ApiExceptionNameEnum.UNAUTHENTICATED_USER, message: "You are note authenticated on the api" })
        //     return
        // }
        // const secretKey = process.env.JWT_SECRET_KEY
        // const secret = base64url.decode(secretKey ?? "")
        // if (!secretKey) {
        //     res.status(500).json({ message: "Internal server error" })
        //     process.exit(1)
        // }
        // const decoded: JWTVerifyResult<AppJwtPayload> = await jwtDecrypt<AppJwtPayload>(cookie, secret, {
        //     issuer: "urn:projecta:issuer",
        //     audience: "urn:projecta:audience",
        // })
        // if (decoded.payload.exp && (decoded?.payload.exp < Math.floor(Date.now() / 1000))) {
        //     res.status(401).json({ name: ApiExceptionNameEnum.EXPIRED_TOKEN, message: "Expired token" })
        //     return
        // }
        // req.user = {
        //     accontType: decoded.payload.accountType,
        //     id: decoded.payload.id,
        //     email: decoded.payload.email
        // }
        next()
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